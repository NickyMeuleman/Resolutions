import Resolutions from "./resolutions";

export default {
  Query: {
    resolutions(obj, args, context) {
      console.log("context:", JSON.stringify(context, null, 2));
      const userId = context.userId || null;
      return Resolutions.find({ userId }).fetch();
    }
  },
  Mutation: {
    async createResolution(obj, args, context) {
      console.log("create resolution mutation resolver");
      console.log("server side:", args);
      const resolutionId = await Resolutions.insert({
        name: args.name,
        userId: context.userId
      });
      return Resolutions.findOne(resolutionId);
    },
    async deleteResolution(obj, args, context) {
      console.log("delete resolution mutation resolver");
      console.log("server side:", args);
      const resolution = await Resolutions.findOne(args.id);
      await Resolutions.remove({ _id: args.id });
      return resolution;
    },
    async updateResolution(obj, args, context) {
      console.log("update resolution mutation resolver");
      console.log("server side:", args);
      const resolution = await Resolutions.findOne(args.id);
      await Resolutions.update(
        { _id: args.id },
        { ...resolution, name: args.name }
      );
      return resolution;
    }
  }
};
