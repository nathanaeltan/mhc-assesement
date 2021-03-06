import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material UI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddEvent from "./AddEvent";


const Navbar = ({ auth: { isAuthenticated, loading, user } }) => {
  const authLinks = (
    <Fragment>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      {user !== null ? (
        user.vendor ? (
          <Button color="inherit" component={Link} to="/vendor">
            Dashboard
          </Button>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/events">
              Dashboard
            </Button>
            <AddEvent />
          </Fragment>
        )
      ) : null}
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </Fragment>
  );

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {!loading && (
          <Fragment>
            {isAuthenticated && !loading ? authLinks : guestLinks}
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Navbar);
