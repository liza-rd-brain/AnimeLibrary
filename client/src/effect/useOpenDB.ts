import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../types";

const DATABASE_ERR = "Failed to load DataBase";

const DATABASE_NAME = "animeBase";

const openDataBasePromise = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const requestDB = window.indexedDB.open(DATABASE_NAME, 1);

    requestDB.onupgradeneeded = function () {
      // срабатывает, если на клиенте нет базы данных
      // ...выполнить инициализацию...
      let db = requestDB.result;
      if (!db.objectStoreNames.contains("animeList")) {
        // если хранилище "books" не существует
        db.createObjectStore("animeList", { keyPath: "id" }); // создаём хранилище
      }
      // makeTransAction(db);
    };

    requestDB.onsuccess = () => resolve(requestDB.result);

    requestDB.onerror = () => reject(requestDB.error);
  });
};

export function useOpenDB() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!openDB":
        openDataBasePromise().then(
          (db) => {
            setTimeout(() => {
              dispatch({ type: "loadedDB", payload: db });
            }, 2000);
          },
          (error) => {
            console.log("error", error);
          }
        );
        break;

      default: {
        break;
      }
    }
  }, [dispatch, doEffect]);
}
