import {S3Client} from '@aws-sdk/client-s3'


export let s3: any = undefined;
export const connectS3 = async () => {
    s3 = new S3Client({
        endpoint: process.env.MINIO_ENDPOINT as string,
        region: process.env.MINIO_REGION as string,
        credentials: {
            accessKeyId: process.env.MINIO_ROOT_USERNAME as string,
            secretAccessKey: process.env.MINIO_ROOT_PASSWORD as string,
        },
        forcePathStyle: true,
        requestChecksumCalculation: "WHEN_REQUIRED",
    })
    return s3
}
