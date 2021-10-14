import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DataProvider } from './Context/DataContext';
import AppRoutes from './routes';

const App = () => {
  return (
    <DataProvider>
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
    </DataProvider>
  );
};

export default App;
