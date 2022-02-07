import { ApolloServer, gql } from "apollo-server-azure-functions";
import { getParty, updatePartySpotifyCredentials } from "./resolvers/party";
import { getTrackRequests } from "./resolvers/trackRequest";
import { isAuthenticated } from "./context/getAuth";
import { ContextFunction } from 'apollo-server-core'

const typeDefs = gql`
    type Query {
        party(id: String!): Party
    }
    
    type Mutation {
        updatePartySpotifyCredentials(partyId: String!, credentials: SpotifyCredentialsInput!): Party
    }
    
    input SpotifyCredentialsInput {
        accessToken: String!
        refreshToken: String!
        expiresAt: String!
    }
    
    type SpotifyCredentials {
        accessToken: String!
        refreshToken: String!
        expiresAt: String!
    }
    
    type Party {
        id: String!
        guestCount: Int!
        cohostJoinToken: String!
        spotifyCredentials: SpotifyCredentials
        ended: Boolean!
        createdAt: String!
        lastUpdated: String!
        trackRequests: [TrackRequest!]!
    }
    
    type TrackRequest {
        id: String
        artist: String
        album: String
        artworkUrl: String
        title: String
    }
`;

const resolvers = {
    Query: {
        party: getParty
    },
    Mutation: {
        updatePartySpotifyCredentials: updatePartySpotifyCredentials
    },
    Party: {
        trackRequests: getTrackRequests
    }
};

const context: ContextFunction = ({request}) => ({
    isAuthenticated: isAuthenticated(request)
})

const server = new ApolloServer({ typeDefs, resolvers, context });
export default server.createHandler();
