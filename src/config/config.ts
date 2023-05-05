import dotenv from 'dotenv'
dotenv.config()
import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID!
const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY!

export const config: DynamoDBClientConfig = {
  region: "us-east-1",
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  }
}
export const PORT = 8000