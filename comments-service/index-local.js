const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/federation");

const comments = [
  {
    id: "1",
    post: { id: "1" },
    text: "Super Cool",
  },
  {
    id: "2",
    post: { id: "1" },
    text: "Gr8!",
  },
];

const typeDefs = gql`
  type Comment @key(fields: "id") {
    id: ID!
    post: Post
    text: String
  }
  extend type Post @key(fields: "id") {
    id: ID! @external
    comments: [Comment]
  }
`;

const resolvers = {
  Comment: {
    _resolveReference(object) {
      return comments.find((comment) => comment.id === object.id);
    },
  },
  Post: {
    comments(post) {
      return comments.filter((comment) => comment.post.id === post.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
});

server.listen({ port: 5002 }).then(({ url }) => console.log(`Comments service ready at ${url}`));
