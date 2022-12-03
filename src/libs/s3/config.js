import * as dotenv from "dotenv";
dotenv.config();

export default {
  s3: {
    credentials: {
      accessKeyId: process.env.AWS_ACCES_KEY_ID,
      secretAccessKey: process.env.AWS_SECREt_ACCESS_KEY,
    },
    region: procces.env.AWS_REGION,
    httpOptions: {
      timeout: 90000,
    },
    params: {
      ACL: "public-read",
      Bucket: procces.env.AWS_BUCKET_NAME,
    },
  },
};
