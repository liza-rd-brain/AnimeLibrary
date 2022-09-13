import { STORE_NAME } from "./constantList";

export const getAnimeList = (db: IDBDatabase): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const animeList = transaction.objectStore(STORE_NAME);
    const requestStoredAnime = animeList.getAll();
    requestStoredAnime.onsuccess = () => resolve(requestStoredAnime.result);
    requestStoredAnime.onerror = () => reject(requestStoredAnime.error);
  });
};
