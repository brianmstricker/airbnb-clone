import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const s3client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
    });
    const formData = await req.formData();
    const urls = [];
    for (const imageInfo of formData) {
      const image = imageInfo[1];
      const name = image.name + v4();
      const chunks = [];
      for await (const chunk of image.stream()) {
        chunks.push(chunk);
      }
      const imageBuffer = Buffer.concat(chunks);
      await s3client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME as string,
          Key: name,
          Body: imageBuffer,
          ContentType: image.type,
          ACL: "public-read",
        })
      );
      const url =
        "https://airbnb-clone-storage-bucket.s3.amazonaws.com/" + name;
      urls.push(url);
    }
    return NextResponse.json(urls, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error uploading image" },
      { status: 500 }
    );
  }
}
