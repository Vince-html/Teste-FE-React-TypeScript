

import { ThemeProvider } from "@mui/material/styles";

import { DataProvider } from './Context/DataContext';


import { theme } from './styles/theme/theme';
import Home from './pages/Home/index';

const App = () => {

  return (
    <DataProvider>
      <ThemeProvider theme={theme} >
        <Home />
      </ThemeProvider>
    </DataProvider>
  );
};

export default App;
