import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Routing 
import PrivateRoute from './components/routing/PrivateRoute';

// Screens
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import Dashboard from './components/screens/Applications/Dashboard';
import DashboardRoute from './components/routing/ApplicationsRoute';

const App = () => {
  // const classes = useStyles();
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <DashboardRoute exact path="/displayApplications" component={Dashboard} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
