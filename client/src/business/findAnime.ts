import axios, { AxiosError } from "axios";
import { DetailAnimeList, ResponseType, State } from "../types";

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

  //TODO: как отработать ошибку из промиса
  return await axios(config).then(
    (resAnime: ResponseType) => {
      return resAnime.data;
    },
    (err) => {
      console.log(err);
    }
  );
}
