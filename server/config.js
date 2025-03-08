import AWS from 'aws-sdk';
import dotenv from "dotenv";
dotenv.config();

export const DATABASE = process.env.DATABASE
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
export const EMAIL_FROM = process.env.EMAIL_FROM

const awsConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: "eu-central-1",
    apiVersion: "2025-3-8"
}
export const AWSSES = new AWS.SES(awsConfig)