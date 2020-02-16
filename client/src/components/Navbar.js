import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material UI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddEvent from "./AddEvent";
const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(0),
    backgroundColor: "#81c784",
    height: "30px",
    width: "40px"
  }
}));

const Navbar = ({ auth: { isAuthenticated, loading, user } }) => {
  const classes = useStyles();
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
