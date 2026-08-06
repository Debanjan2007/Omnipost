import {HeadBucketCommand} from '@aws-sdk/client-s3'
import { s3 } from "../connect.s3"

export const bucketExists = async (bucketName: string): Promise<boolean> => {
    try {
        await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
        return true;
    } catch (error: any) {
        if (error.$metadata?.httpStatusCode === 404) {
            console.error(`Bucket "${bucketName}" does not exist.`);
        } else if (error.$metadata?.httpStatusCode === 403) {
            console.error(`Bucket "${bucketName}" exists, but you do not have permission to access it.`);
        } else {
            console.error("An unexpected error occurred:", error.message);
        }
        return false;
    }
}