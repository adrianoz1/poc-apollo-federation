
const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const {readFileSync} = require("fs");

const supergraphSdl = readFileSync(__dirname + '/prod-schema.graphql').toString();

const gateway = new ApolloGateway({
  supergraphSdl
});

const server = new ApolloServer({
  plugins: [
  ],
  gateway,
});

server.listen({ port: 5004 }).then(({ url }) => console.log(`Gateway ready at ${url}`));
