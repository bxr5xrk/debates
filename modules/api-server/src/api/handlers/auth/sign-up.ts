import axios from "axios";
import { EMAIL_REGEX, defineHandler, defineSchema, getResponse } from "api/lib";
import { Server } from "platform/types";
import { Type as type } from "@sinclair/typebox";
import { ENV } from "platform/env";
import { UploadImageData } from "globals";
import { authService } from "services/auth";

const schema = defineSchema({
  body: type.Object({
    email: type.String({
      format: "email",
      pattern: EMAIL_REGEX,
    }),
    password: type.String(),
    nickname: type.String(),
    picture: type.Any(),
    name: type.String(),
  })
});

async function handler({ body, session }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
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


  const user = await authService.signUp({ ...body, picture });

  session.set("user", {
    id: user?.id,
    email: user?.email,
    nickname: user?.nickname,
  });

  return rep.status(200).send(getResponse("success", user));
}

export const signUp = defineHandler({
  schema,
  handler
});
