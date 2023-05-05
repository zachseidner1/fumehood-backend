import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import express from "express";
import { config } from "./config/config";
import { PORT } from "./config/config";
import Logger from "./library/Logger";

const router = express();

/** Connect to Dynamo */
const client = new DynamoDBClient(config)


/** Log requests */
router.use((req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode >= 500) {
      Logger.error(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: 
    [${req.socket.remoteAddress}] - STATUS: ${Logger.colorStatusCode(res.statusCode)}`)
    }
    else {
      Logger.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: ${Logger.colorStatusCode(res.statusCode)}`)
    }
  })
  next();
})

/** Begin listening */
router.listen(PORT, () => {
  Logger.info(`Began listening on port ${PORT}`)
})

/** Base route - lists tables of the database */
router.get("/", async (req, res) => {
  const lstTablesCommand = new ListTablesCommand({});
  try {
    let response = await client.send(lstTablesCommand)
    res.json(response.TableNames)
  } catch (ignored) {
    res.status(500).json({ message: "Internal server error" })
  }
})