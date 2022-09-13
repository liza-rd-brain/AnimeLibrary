import React from "react";
import { AppContainer } from "./feature/AppContainer";

import { Provider } from "react-redux";

import { store } from "./business/store";

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
