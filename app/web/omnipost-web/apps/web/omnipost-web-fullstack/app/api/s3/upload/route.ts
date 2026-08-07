import {connectS3, createBucket, putObject, UniqueKey} from '@repo/s3'
import {NextRequest, NextResponse} from 'next/server';
import {TOAST_EVENTS} from "@/lib/toasts";

const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

await connectS3()
console.log(process.env.S3_BUCKET_NAME as string)
await createBucket(process.env.S3_BUCKET_NAME as string)

export async function POST(req: NextRequest) {
    try {

        const data = await req.formData();
        const file = data.get('file') as File;
        const fileBuffer = await file.arrayBuffer();
        if (!fileTypes.includes(file.type)) {
            return Error("File type not supported")
        }
        const key = UniqueKey(file.name)
        const object = await putObject(process.env.S3_BUCKET_NAME as string, key, fileBuffer)
        console.log(object)
        if (!object.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to upload file"
                },
                {status: 500}
            )
        }
        return NextResponse.json({
                success: true,
                data: {
                    key
                },
            },
            {status: 200}
        )
    } catch (e) {
        console.log(e)
        return NextResponse.redirect(
            new URL(`/dashboard?toast=${TOAST_EVENTS.upload_failed}`, req.url).toString(),
        )
    }
}
