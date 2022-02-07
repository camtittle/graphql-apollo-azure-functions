import { partyContainer } from "../shared/cosmosClient";

export const getTrackRequests = async (party: any) => {
    const { resources } = await partyContainer.items
        .query({
            query: "SELECT * from c WHERE c.partyId = @partyId AND c.type = 1",
            parameters: [{ name: "@partyId", value: party.id }]
        })
        .fetchAll();

    return resources;
};