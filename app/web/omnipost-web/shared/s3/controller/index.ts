import { s3 } from './connect.s3'
import { CreateBucketCommand , PutObjectCommand , GetObjectCommand , DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { bucketExists } from './utils/Bucketexists.utils.s3'

export const createBucket = async (bucketName: string) => {
    const bucket = await bucketExists(bucketName)
    if(bucket){
        console.log('Bucket already exists')
        return
    }
    const command = new CreateBucketCommand({ Bucket: bucketName })
    await s3.send(command)
    console.log('Bucket created')
}

export const putObject = async (bucket: string , key: string , body: any) => {
    try{
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: body,
        })
        await s3.send(command)
        return {
            success: true,
            status: 200
        }
    }catch (e: any) {{
        console.log(e)
        return {
            success: false,
            status: 500
        }
    }}
}

export const getObject = async (bucket: string , key: string) => {
    try{
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        })
        return await s3.send(command)
    }catch (e: any){
        console.log(e)
        throw new Error(e.message)
    }
}

export const delObject = async (bucket: string , key: string) => {
    try{
        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        })
        await s3.send(command)
    }catch (e: any){
        console.log(e)
        throw new Error(e.message)
    }
}

export const PresignedUrl = async (bucketname: string , key: string ) => {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketname,
            Key: key,
        });
        const signedurl = getSignedUrl(s3, command, {expiresIn: 3600}) // the signed url gonna expire within an hour}
    }catch (e){
        console.log("Error occured while generating presigned url : ", e)
        throw new Error("Error while getting presigned URL" , {cause: e})
    }
}

export * from './utils/Bucketexists.utils.s3'