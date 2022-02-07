import { CosmosClient } from "@azure/cosmos";

export const cosmosClient = new CosmosClient(process.env.CosmosDbConnectionString);
export const partyContainer = cosmosClient.database('guestplayer').container('party');