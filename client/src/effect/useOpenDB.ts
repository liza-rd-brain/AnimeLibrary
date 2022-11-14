import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ActionName, useAppDispatch } from "../business/reducer";

import { State } from "../types";
import { getAnimeList } from "./common/getAnimeList";

const KEY_NAME = "link";
const STORE_NAME = "animeList";
const DATABASE_NAME = "animeBase";

const openDataBasePromise = (
  controller: AbortController
): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const requestDB = window.indexedDB.open(DATABASE_NAME, 1);

    requestDB.onupgradeneeded = function () {
      // срабатывает, если на клиенте нет базы данных до открытия соединения
      let db = requestDB.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: KEY_NAME });
      }
    };

    requestDB.onerror = () => reject(requestDB.error);
    requestDB.onsuccess = () => resolve(requestDB.result);

    controller.signal.addEventListener("abort", reject);
  });
};

export function useOpenDB() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useAppDispatch();

  useEffect(
    function requestOpenDB() {
      const controller = new AbortController();

      switch (doEffect?.type) {
        case "!openDB":
          openDataBasePromise(controller).then(
            (db) => {
              getAnimeList(db, controller).then((animeList) => {
                console.log("animeList open db", animeList);
                setTimeout(() => {
                  dispatch({
                    type: ActionName.loadedDB,
                    payload: { dataBase: db, animeList },
                  });
                }, 2000);
              });
            },
            (error) => {
              console.log("error", error);
            }
          );

          return () => {
            controller.abort();
          };

        default: {
          break;
        }
      }
    },
    //не нужно добавлять dispatch, dataBase в список зависимостей
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doEffect]
  );
}
