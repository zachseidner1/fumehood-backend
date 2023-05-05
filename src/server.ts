import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import express from "express";
import { config } from "./config/config";
import { PORT } from "./config/config";


const router = express();

/** Connect to Dynamo */
const client = new DynamoDBClient(config)


/** Log requests */
router.use((req, res, next) => {
  console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - 
  IP: [${req.socket.remoteAddress}]`)

  res.on('finish', () => {
    console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: 
    [${req.socket.remoteAddress}] - STATUS: ${res.statusCode}`)
  })
  next();
})

/** Begin listening */
router.listen(PORT, () => {
  console.log(`Began listening on port ${PORT}`)
})

/** Base route - lists tables of the database */
router.get("/", async (req, res) => {
  const lstTablesCommand = new ListTablesCommand({});
  let response = await client.send(lstTablesCommand)
  res.json(response.TableNames)
})