
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";

import { DataProvider } from './Context/DataContext';

import AppRoutes from './routes';
import { theme } from './styles/theme/theme';






const App = () => {

  return (
    <DataProvider>
      <ThemeProvider theme={theme} >
        <Router>
          <Switch>
            {AppRoutes.map((route, key) => {
              const { component, path } = route;
              const Component = component;

              return (
                <Route exact={true} path={path} key={key} render={Component} />
              );
            })}
          </Switch>
        </Router>
      </ThemeProvider>
    </DataProvider>
  );
};

export default App;
