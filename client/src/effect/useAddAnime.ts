import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DetailAnime, State } from "../types";
import { STORE_NAME } from "./common/constantList";
import { getAnimeList } from "./common/getAnimeList";

const DATABASE_ERR = "Failed to load DataBase";

type TableAnime = DetailAnime & { id: string };

//TODO: прибрать промис
const addAnime = (dataBase: IDBDatabase, anime: DetailAnime) => {
  return new Promise((resolve, reject) => {
    const transaction = dataBase.transaction(STORE_NAME, "readwrite");
    const animeList = transaction.objectStore(STORE_NAME);
    const request = animeList.add(anime);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
};

// const createAddAnimePromise = (dataBase: IDBDatabase, anime: DetailAnime) => {
//   return new Promise((resolve, reject) => {
//     addAnime(
//       dataBase,
//       anime,
//       (err: DOMException | null, result?: IDBValidKey) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// };

export function useAddAnime() {
  const { doEffect, dataBase } = useSelector((state: State) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!addAnime":
        // eslint-disable-next-line no-lone-blocks
        {
          console.log("addAnime");
          if (dataBase) {
            const currAnime = doEffect.data;
            const addAnimePromise = addAnime(dataBase, currAnime);
            //возвращает  key
            addAnimePromise.then(
              (res) => {
                console.log("add res", res);
                getAnimeList(dataBase).then((animeList) => {
                  console.log("newAnimeList", animeList);
                });
              },
              (error) => {
                console.log("error", error);
              }
            );
          }
        }
        break;

      default: {
        break;
      }
    }
  }, [doEffect]);
}
