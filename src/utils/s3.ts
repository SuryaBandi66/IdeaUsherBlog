import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = async (file: any): Promise<string> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `${Date.now()}-${file.name}`,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  const upload = await s3.upload(params).promise();
  return upload.Location;
};
