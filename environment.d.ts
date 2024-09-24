declare global {
    namespace NodeJS {
      interface ProcessEnv {
        AWS_SQS_QUEUE_NAME: string;
        AWS_SQS_URL: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_REGION: string;
        ECS_TASK_ARN: string,
        ECS_CLUSTER_ID: string,
        ECS_SECURITY_GROUP: string,
        AWS_UPLOAD_BUCKET_NAME: string,
        AWS_BUCKET_NAME: string,
      }
    }
  }
  
  export {};