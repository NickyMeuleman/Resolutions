import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import { mergeTypes } from "merge-graphql-schemas";
import merge from "lodash/merge";

//dsdsdssffgddff

import ResolutionsSchema from "../../api/resolutions/Resolutions.graphql";
import ResolutionsResolvers from "../../api/resolutions/resolvers";

import UsersSchema from "../../api/users/User.graphql";
import UsersResolvers from "../../api/users/resolvers";

import GoalsSchema from "../../api/goals/Goal.graphql";
import GoalsResolvers from "../../api/goals/resolvers";

const typeDefs = mergeTypes([ResolutionsSchema, UsersSchema, GoalsSchema]);

const resolvers = merge(ResolutionsResolvers, UsersResolvers, GoalsResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
