import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { DataProvider } from './Context/DataContext';
import { style } from './Global';
import { useStyles } from './hooks/useStyles';
import AppRoutes from './routes';
import { theme } from './styles/theme/theme';



const App = () => {
  useStyles(style);
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
