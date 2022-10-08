import axios from "axios";
import { DetailAnimeList, ResponseType } from "../types";

export async function findAnime(
  animeName: string,
  controller: AbortController
): Promise<DetailAnimeList> {
  const config = {
    method: "post",
    url: "http://localhost:3000/findName",
    data: {
      name: animeName,
    },
    signal: controller.signal,
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
