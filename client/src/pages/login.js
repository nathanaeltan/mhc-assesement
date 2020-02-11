import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
// MUI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import { login } from "../actions/auth";
const styles = {
  form: {
    textAlign: "center"
  },
  pageTitle: {
    marginTop: "30px"
  },
  textField: {
    margin: "10px"
  }
};

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  // const { classes } = this.props;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/events" />;
  }
  return (
    <Grid container style={styles.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" style={styles.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={e => onSubmit(e)}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            style={styles.textField}
            value={email}
            onChange={e => onChange(e)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            style={styles.textField}
            value={password}
            onChange={e => onChange(e)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.button}
          >
            Submit
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
