import { Client } from "./struct/client";
import { config } from "dotenv";
export * from "colors";
config();

const client = new Client();
client.start();

export { client };
