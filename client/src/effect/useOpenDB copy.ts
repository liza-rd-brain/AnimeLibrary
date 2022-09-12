import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export function useOpenDB() {
  const dispatch = useDispatch();

  const requestDB = window.indexedDB.open("animeBase2", 1);

  console.log("requestDB", requestDB);

  const makeTransAction = (db: IDBDatabase) => {
    console.log(db);
    let transaction = db.transaction("animeList", "readwrite"); // (1)

    // получить хранилище объектов для работы с ним
    let books = transaction.objectStore("animeList"); // (2)

    let book = {
      id: "js",
      price: 10,
      created: new Date(),
    };

    let request = books.add(book); // (3)

    request.onsuccess = function () {
      // (4)
      console.log("Книга добавлена в хранилище", request.result);
    };

    request.onerror = function () {
      console.log("Ошибка", request.error);
    };
  };

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

  requestDB.onerror = function () {
    console.error("Error", requestDB.error);
  };

  requestDB.onsuccess = function () {
    let db = requestDB.result;

    // if (!state.database) {
    //   setState((prev) => {
    //     return { ...prev, database: db };
    //   });

    console.log("db", db);
    makeTransAction(db);

    // dispatch({ type: "loadedDB", payload: db });
  };

  useEffect(() => {}, []);
}
