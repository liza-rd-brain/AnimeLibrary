import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../types";

const DATABASE_ERR = "Failed to load DataBase";

const DATABASE_NAME = "animeBase";

const openDateBase = (promiseCallBack: any) => {
  const requestDB = window.indexedDB.open(DATABASE_NAME, 1);

  requestDB.onerror = () => promiseCallBack(requestDB.error);

  requestDB.onsuccess = () => {
    const db = requestDB.result;
    promiseCallBack(null, db);
  };
};

const openDateBasePromise = () => {
  return new Promise((resolve, reject) => {
    openDateBase((err: DOMException | null, result: IDBDatabase) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export function useOpenDB() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useDispatch();

  switch (doEffect?.type) {
    case "!openDB":
      {
        const dataBase = openDateBasePromise();
        dataBase.then(
          (res) => {
            dispatch({ type: "loadedDB", payload: res });
          },
          (rej) => {
            console.log("rej", rej);
          }
        );
      }
      break;

    default: {
      break;
    }
  }

  useEffect(() => {}, [doEffect]);
}
