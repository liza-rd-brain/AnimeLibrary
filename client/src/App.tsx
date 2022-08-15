import React from "react";
import { AppContainer } from "./features/AppContainer";

import { Provider, useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";

import { store } from "./business/store";

type DataBase = { database: any };

const makeTransAction = (db: IDBDatabase) => {
  let transaction = db.transaction("books", "readwrite"); // (1)

  // получить хранилище объектов для работы с ним
  let books = transaction.objectStore("books"); // (2)

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

const GetApp = () => {
  const dispatch = useDispatch();
  let requestDB = window.indexedDB.open("test_1", 1);

  requestDB.onupgradeneeded = function () {
    // срабатывает, если на клиенте нет базы данных
    // ...выполнить инициализацию...
    let db = requestDB.result;
    if (!db.objectStoreNames.contains("books")) {
      // если хранилище "books" не существует
      db.createObjectStore("books", { keyPath: "id" }); // создаём хранилище
    }

    makeTransAction(db);
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

    dispatch({ type: "loadedDB", payload: db });
  };

  return <TextField />;
};

const App = () => {
  // продолжить работу с базой данных, используя объект db

  return (
    <Provider store={store}>
      {/* <GetApp /> */}
      <AppContainer />
    </Provider>
  );
};

export default App;
