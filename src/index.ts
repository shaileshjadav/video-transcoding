import { SQSClient, ReceiveMessageCommand, Message, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import * as dotenv from "dotenv";
import type {S3Event} from "aws-lambda";
import {ECSClient, RunTaskCommand}  from "@aws-sdk/client-ecs";

dotenv.config();

const client = new SQSClient({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const ecsClient = new ECSClient({
    region:"us-east-1",
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

async function init () {
    
    const command = new ReceiveMessageCommand({
        QueueUrl: process.env.AWS_SQS_URL,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds:20,

    })
    
    while(true){
        const {Messages} = await client.send(command);
        
        if(!Messages){
            console.log("no message found");
            continue;
        }
        try {
            
            for(const message of Messages){
                
                console.log(message);
                const {MessageId, Body } = message;
                // validate event
                if(!Body) continue;
                
                const event = JSON.parse(Body) as S3Event;
                
                if("Service" in event && "Event" in event) {
                    // ignore the test event
                    if(event.Event === 's3:TestEvent') {
                         // Delete message from queue
                        await client.send(new DeleteMessageCommand({
                            QueueUrl: process.env.AWS_SQS_URL,
                            ReceiptHandle: message.ReceiptHandle,
                        }))
                        continue;
                    };
                }
                

                for(const record of event.Records) {
                    const {s3} = record;
                    const { bucket , object: { key }} = s3;
                    
                    // Spin container


                    const runTaskCommand = new RunTaskCommand({
                        taskDefinition: "arn:aws:ecs:us-east-1:767626660395:task-definition/video-transcoder:2",
                        cluster: "arn:aws:ecs:us-east-1:767626660395:cluster/shailesh-dev",
                        launchType:"FARGATE",
                        networkConfiguration:{
                            awsvpcConfiguration: {
                                securityGroups: ["sg-04296ab8fe68b0f90"],
                                subnets: ["subnet-0169723635670a774", "subnet-09fd8fa06656e6506","subnet-0d2383e327b656927", "subnet-097c43dbadc32fa5f"],
                                assignPublicIp:"ENABLED",
                            },
                        },
                
                        overrides:{
                            containerOverrides: 
                           [
                            {
                                name:"video-transcoder",
                                environment: [
                                    { // KeyValuePair
                                        name: "UPLOAD_BUCKET_NAME",
                                        value: "shailesh.dev-learn",
                                    },
                                    { // KeyValuePair
                                        name: "AWS_BUCKET_NAME",
                                        value: "shailesh-dev-private",
                                    },

                                    { // KeyValuePair
                                        name: "KEY",
                                        value: key,
                                    },
                                ],
                                
                            }
                           ]
                    }
                  });

                    await ecsClient.send(runTaskCommand);

                    // Delete message from queue
                    await client.send(new DeleteMessageCommand({
                        QueueUrl: process.env.AWS_SQS_URL,
                        ReceiptHandle: message.ReceiptHandle,
                    }))
                }


            }
        }
        catch(e){
            console.log(e);
        }   

        
    }   
}
init();