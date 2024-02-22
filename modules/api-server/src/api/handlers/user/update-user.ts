import { EMAIL_REGEX, defineHandler, defineSchema, getResponse } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { userService } from "services/user";
import { ENV } from "platform/env";
import axios from "axios";
import { UploadImageData } from "globals";

const schema = defineSchema({
  body: type.Object({
    name: type.Optional(type.String()),
    nickname: type.Optional(type.String()),
    email: type.String({
      format: "email",
      pattern: EMAIL_REGEX,
    }),
    picture:  type.Optional(type.Any()),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const userId = (session.get("user") as { id: number }).id;

  let picture: string | undefined = undefined;

  // ! refactor
  if (body.picture) {
    const formData = new FormData();
    const blob = new Blob([body.picture]);
    formData.append('image', blob);

    const axiosConfig = {
      method: 'post',
      url: `https://api.imgbb.com/1/upload?key=${ENV.UPLOAD_IMAGE_API_KEY}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    const res = await axios<UploadImageData>(axiosConfig);

    picture = res.data.data.url;
  }

  const user = await userService.updateUser(userId, { ...body, picture });

  session.set("user", {
    id: user?.id,
    email: user?.email,
    nickname: user?.nickname,
  });

  return rep.status(200).send(getResponse("success", user));
}

export const updateUser = defineHandler({
  schema,
  handler
});