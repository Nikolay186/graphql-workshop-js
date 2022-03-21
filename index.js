import { ApolloServer } from "apollo-server";
import { schema } from "/Users/Nikolaj/projects/graphql-apollo-server-workshop/schema.js";

const server = new ApolloServer({
    schema: schema
});

server.listen({
    port: 4000,
    endpoint: "/gql"
});