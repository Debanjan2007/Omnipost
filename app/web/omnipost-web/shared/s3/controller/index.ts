import { s3 } from './connect.s3.js'
import { CreateBucketCommand , PutObjectCommand , GetObjectCommand , DeleteObjectCommand } from '@aws-sdk/client-s3'
import { bucketExists } from './utils/Bucketexists.utils.s3.js'

export const createBucket = async (bucketName: string) => {
    const bucket = await bucketExists(bucketName)
    if(!bucket){
        console.log('Bucket already exists')
        return
    }
    const command = new CreateBucketCommand({ Bucket: bucketName })
    await s3.send(command)
}

export const puObject = async (bucket: string , key: string , body: any) => {
    try{
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: body,
        })
        await s3.send(command)
    }catch (e: any) {{
        console.log(e)
        throw new Error(e.message)
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

export * from './utils/Bucketexists.utils.s3.js'