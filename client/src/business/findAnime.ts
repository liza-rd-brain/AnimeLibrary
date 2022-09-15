import axios from "axios";
import { ResponseType } from "../types";

export async function findAnime(
  animeName: string
) /* : Promise<DetailAnimeList> */ {
  const config = {
    method: "post",
    url: "http://localhost:3000/findName",
    data: {
      name: animeName,
    },
  };

  return await axios(config).then(
    (resAnime: ResponseType) => {
      return resAnime.data;
    },
    (err) => {
      return err;
    }
  );
}
