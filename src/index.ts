import { SQSClient, ReceiveMessageCommand, Message } from "@aws-sdk/client-sqs";
import * as dotenv from "dotenv";
import type {S3Event} from "aws-lambda";

dotenv.config();

const client = new SQSClient({
    region:process.env.AWS_REGION,
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
                
                const {MessageId, Body } = message;
                
                // validate event
                if(!Body) continue;
                
                const event = JSON.parse(Body) as S3Event;
                
                if("Service" in event && "Event" in event) {
                    // ignore the test event
                    if(event.Event === 's3:TestEvent') return true;
                }
                

                for(const record of event.Records) {
                    const {s3} = record;
                    const { bucket , object: { key }} = s3;
                    
                    // Spin container
                    
                }


                // TODO: Delete message from queue
            }
        }
        catch(e){

        }

        
    }   
}
init();