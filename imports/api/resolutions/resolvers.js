import Resolutions from "./resolutions";
import Goals from "../goals/goals";

export default {
  Query: {
    resolutions(obj, args, context) {
      console.log("context:", JSON.stringify(context, null, 2));
      const userId = context.userId || null;
      return Resolutions.find({ userId }).fetch();
    }
  },

  Resolution: {
    goals: resolution => {
      console.log("resolution resolver:", resolution);
      return Goals.find({ resolutionId: resolution._id }).fetch();
    },
    completed: resolution => {
      const goals = Goals.find({ resolutionId: resolution._id }).fetch();
      if (goals.length > 0) {
        return goals.every(goal => goal.completed);
      }
      return false;
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
