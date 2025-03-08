import AWS from 'aws-sdk';
import dotenv from "dotenv";
dotenv.config();

export const DATABASE = process.env.DATABASE
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
export const EMAIL_FROM = process.env.EMAIL_FROM
export const JWT_SECRET = process.env.JWT_SECRET
export const DEV_CLIENT_URL = process.env.DEV_CLIENT_URL
export const AWS_REGION = process.env.AWS_REGION

const awsConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
    apiVersion: "2025-3-8"
}
export const AWSSES = new AWS.SES(awsConfig)