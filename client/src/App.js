import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Routing 
import PrivateRoute from './components/routing/PrivateRoute';
import ApplicationsRoute from './components/routing/ApplicationsRoute';

// Screens
// import PrivateScreen from './components/screens/PrivateScreen';
import PrivateScreen from './components/screens/PrivateScreen';
// import LoginScreen from './components/screens/LoginScreen';
import LoginScreen from './components/screens/LoginScreen';
// import RegisterScreen from './components/screens/RegisterScreen';
import RegisterScreen from './components/screens/RegisterScreen';
// import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
// import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import DisplayApplications from './components/screens/Applications/DisplayApplications';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <ApplicationsRoute exact path="/displayApplications" component={DisplayApplications} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
