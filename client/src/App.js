import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// Components
import Navbar from "./components/Navbar";
import Events from "./components/Events"
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
// import dashboard from "./pages/dashboard";
import PrivateRoute from "./pages/routing/PrivateRoute";
 

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#0288d1",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                {/* <PrivateRoute Route exact path="/dashboard" component={dashboard} /> */}
                <PrivateRoute Route exact path="/events" component={Events} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
