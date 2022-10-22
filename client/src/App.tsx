import { Provider } from "react-redux";
// import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider } from "./theme";
import { theme } from "./theme";

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
