import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Header from "./components/header";
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import { UserProvider } from "./providers/userContext";

import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, green, purple } from '@material-ui/core/colors';
import Admin from './components/admin';
import ManageUser from './components/admin/manageuser';
import UserDashboard from './components/user';
import Main from './components/authentication';
import { CourseProvider } from './providers/courseContext';
import ListCourses from './components/listCourses';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



function App() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: green[500],
      },
      // type: 'dark'
    },
    transitions: {
      duration: {
        shortest: 100,
      }
    },
  });

  const stripe = loadStripe(
    "pk_test_Vmvhpm2TASsGcgF4RcyQfkF000KwucQJR1"
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UserProvider>

          <CourseProvider>
            <Route exact path="/">
              <Redirect to="/main/login" />
            </Route>

            <Elements stripe={stripe}>
              <Route path="/main">
                <Main />
              </Route>
            </Elements>

            <Route path="/admin/manageuser">
              <ManageUser />
            </Route>

            <Route path="/admin">
              <Admin />
            </Route>

            <Route path="/user">
              <UserDashboard />
            </Route>

            <Route path="/list">
              <ListCourses />
            </Route>
          </CourseProvider>

        </UserProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;