const {GetObjectCommand, S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const fs = require("node:fs/promises");
const ffmpeg = require("fluent-ffmpeg");
const { createReadStream, existsSync, mkdirSync } = require("node:fs");
const path = require("node:path");
// config env file
require("dotenv").config();
console.log(process.env.AWS_REGION);

// Set variables
const originalFilePath = 'original-video.mp4';
const outputBasePath = 'transcoded-videos';
const segmentTime = 10;
const codecVideo = 'libx264';
const codecAudio = 'aac';

const resolutions = [
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
  { width: 854, height: 480 },
  { width: 640, height: 360 }
];

// Function to generate HLS for each resolution
const generateHLS = (input, outputDir, width, height) => {
    return new Promise((resolve, reject) => {
        // Ensure directory exists
        if (!existsSync(outputDir)){
            mkdirSync(outputDir, { recursive: true });
        }

        const segmentFilePath = path.resolve(outputDir, 'segment_%03d.ts');
        const playlistPath = path.resolve(outputDir, 'playlist.m3u8');

        // Run ffmpeg command
        ffmpeg(input)
        .videoCodec(codecVideo)
        .audioCodec(codecAudio)
        .size(`${width}x${height}`)
        .outputOptions([
            `-hls_time ${segmentTime}`,
            `-hls_playlist_type vod`,
            `-hls_segment_filename ${segmentFilePath}`,
            `-start_number 0`
        ])
        .on('end', () => {
            console.log(`HLS generated for ${width}x${height}`);
            resolve(playlistPath);
        })
        .on('error', (err) => {
            console.error(`Error processing ${width}x${height}: ${err.message}`);
            reject(err);
        })
        .save(playlistPath);
    });
    };


// get files of directory
const getFiles = async (dir) => {
    const dirents = await fs.readdir(dir, {withFileTypes: true});

    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.join(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }))

    return Array.prototype.concat(...files);
}


const uploadDir = async (client, dir) => {
    const files = await getFiles(dir);
    const UPLOAD_BUCKET_NAME = process.env.UPLOAD_BUCKET_NAME;

    const uploads = files.map(async (filePath) => {
        const bodyData = createReadStream(path.resolve(filePath));
        client.send(new PutObjectCommand({
            Bucket: UPLOAD_BUCKET_NAME,
            Key: filePath,
            Body: bodyData,
        }));    
    })

    console.log("uploded successfully");
    
    return Promise.all(uploads);

}


// download the video
async function init(){
    try {
        const client = new S3Client({
            region: process.env.AWS_REGION,
            credentials:{
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });
        
        const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
        const KEY = process.env.KEY;

        const videoFile = await client.send(new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: KEY,
        }))


        await fs.writeFile(originalFilePath, videoFile.Body);
        console.log("file downloaded successfully", originalFilePath);
        
        // transcode video
        const promises = [];    
        const outputDirs = [];
        for (const { width, height } of resolutions) {
            const outputDir = path.resolve(outputBasePath, `${width}x${height}`);
            promises.push(generateHLS(originalFilePath, outputDir, width, height));
            outputDirs.push(outputDir);
        }

        const videoFiles = await Promise.all(promises);
        console.log("transcode video files", videoFiles);

        // upload the video
        const uploadResults = [];
        for(const dir of outputDirs) {
           uploadResults.push(uploadDir(client, dir));
        }
        const uplaodResult = await Promise.all(uploadResults);
        console.log("Upload results", uplaodResult);
    }
    catch(error) {
        console.log("error", error);
    }
}








init();