import axios, { AxiosError } from "axios";
import { DetailAnimeList, ResponseType, State } from "../types";

export async function findAnime(animeName: string) {
  console.log(animeName);

  const config = {
    method: "post",
    url: "http://localhost:3000/findName",
    data: {
      name: animeName,
    },
  };

  const res = await axios(config).then(
    (res: ResponseType) => {
      // записать данные/ куда?
      // console.log(res.data);
      return res;
    },
    (err: AxiosError) => {
      console.log(err.code);
    }
  );

  if (res) {
    return res.data;
  }
}
