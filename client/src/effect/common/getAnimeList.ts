import { DetailAnimeList } from "../../types";
import { STORE_NAME } from "./constantList";

export const getAnimeList = (
  db: IDBDatabase,
  controller: AbortController
): Promise<DetailAnimeList> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const animeList = transaction.objectStore(STORE_NAME);
    const requestStoredAnime = animeList.getAll();

    requestStoredAnime.onsuccess = () => resolve(requestStoredAnime.result);
    requestStoredAnime.onerror = () => reject(requestStoredAnime.error);

    controller.signal.addEventListener("abort", reject);
  });
};
