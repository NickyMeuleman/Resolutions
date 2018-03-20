import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import { mergeTypes } from "merge-graphql-schemas";
import merge from "lodash/merge";
import ResolutionsSchema from "../../api/resolutions/Resolutions.graphql";
import ResolutionsResolvers from "../../api/resolutions/resolvers";
import UsersSchema from "../../api/users/User.graphql";
import UsersResolvers from "../../api/users/resolvers";

// comment for reload..

const testSchema = `
type Query {
  hi: String
}
`;

const typeDefs = mergeTypes([testSchema, ResolutionsSchema, UsersSchema]);

const hiResolver = {
  Query: {
    hi() {
      return "Dag Nicky!";
    }
  }
};

const resolvers = merge(hiResolver, ResolutionsResolvers, UsersResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
