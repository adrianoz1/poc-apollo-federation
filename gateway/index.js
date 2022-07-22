

const { ApolloServer } = require("apollo-server-lambda");
const { ApolloGateway } = require("@apollo/gateway");
const { readFileSync } = require("fs");

const supergraphSdl = readFileSync(__dirname + '/prod-schema.graphql').toString();

const gateway = new ApolloGateway({
  supergraphSdl
});

const server = new ApolloServer({
  subscriptions: false,
  gateway,
});

exports.handler = server.createHandler();
