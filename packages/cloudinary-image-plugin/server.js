import { createResolverPlugin } from "@refract-cms/server";
import { GraphQLString } from "graphql";

const CloudinaryImageResolverPlugin = createResolverPlugin({
  alias: "cloudinary-image",
  buildFieldConfig: () => {
    return {
      type: GraphQLString,
      resolve: () => "image"
    };
  }
});

export default CloudinaryImageResolverPlugin;
