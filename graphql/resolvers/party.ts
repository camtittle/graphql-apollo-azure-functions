import { partyContainer } from "../shared/cosmosClient";
import { AuthenticationError } from "apollo-server-azure-functions";

export const getParty = async (_, { id }: { id: string }, context) => {
    if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication header required');
    }
    const result = await partyContainer.item(id, id).read();

    if (result.statusCode !== 200) {
        return undefined;
    }

    return result.resource;
}

export const updatePartySpotifyCredentials = async (_, { partyId, credentials }) => {
    console.log('Update spotify credentials');
    return {
        id: partyId
    }
}