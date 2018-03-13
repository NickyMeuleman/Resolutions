import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import { mergeTypes } from "merge-graphql-schemas";
import merge from "lodash/merge";
import ResolutionsSchema from "../../api/resolutions/Resolutions.graphql";
import ResolutionsResolvers from "../../api/resolutions/resolvers";

const testSchema = `
type Query {
  hi: String
}
`;

const typeDefs = mergeTypes([testSchema, ResolutionsSchema]);

const hiResolver = {
  Query: {
    hi() {
      return "Dag Nicky!";
    }
  }
};

const resolvers = merge(hiResolver, ResolutionsResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
