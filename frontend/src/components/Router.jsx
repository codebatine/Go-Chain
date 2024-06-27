import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home.jsx';
import Explorer from '../Pages/Explorer.jsx';
import Transact from '../Pages/Transact.jsx';
import Mine from '../Pages/Mine.jsx';
import NotFound from '../Pages/NotFound.jsx';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import Dashboard from '../Pages/Dashboard.jsx';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/explorer" component={Explorer} />
      <Route path="/transact" component={Transact} />
      <Route path="/mine" component={Mine} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default AppRouter;
