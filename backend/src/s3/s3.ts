// src/s3.ts
import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage'
import config from 'config';

const s3Connection = JSON.parse(JSON.stringify(config.get<object>('s3.connection' as any)));


const s3Client = new S3Client(s3Connection);

export async function createAppBucketIfNotExists() {
  try {
    const result = await s3Client.send(
      new CreateBucketCommand({
        Bucket: config.get<string>('s3.bucket'),
      })
    );
    console.log('bucket created:', result.Location ?? '');
  } catch (e) {
    console.log(
      'failed b',
      (e as any).message ?? e
    );
  }
}

export async function uploadImageToBucket(
  key: string,
  body: Buffer,
  contentType: string
) {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: config.get<string>('s3.bucket'),
      Key: key,
      ContentType: contentType,
      Body: body,
    },
  });

  const result = await upload.done();
  console.log('image result:', result);
}

export default s3Client;
