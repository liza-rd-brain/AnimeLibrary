import { Provider } from "react-redux";
import { ThemeProvider } from "./theme";

import { store } from "./business/store";
import { AppContainer } from "./feature/AppContainer";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContainer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
