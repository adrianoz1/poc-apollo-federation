const { ApolloServer, gql } = require("apollo-server-lambda");
const { buildSubgraphSchema } = require("@apollo/federation");

const posts = [
  {
    id: "1",
    title: "JS Rulez!",
    text: "",
  },
  {
    id: "2",
    title: "TS Rocks!",
    text: "",
  },
];

const typeDefs = gql`
  extend type Query {
    list: [Post]
  }
  type Post @key(fields: "id") {
    id: ID!
    title: String
    text: String
  }
`;

const resolvers = {
  Post: {
    _resolveReference(object) {
      return posts.find((post) => post.id === object.id);
    },
  },
  Query: {
    list() {
      return posts;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
});

exports.handler = server.createHandler();
