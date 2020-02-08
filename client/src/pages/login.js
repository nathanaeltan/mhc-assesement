import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
// MUI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Buttom from "@material-ui/core/Button"
const styles = {
  form: {
    textAlign: "center"
  }
};

class login extends Component {
    constructor(){
        super();
        this.state= {
            email: "",
            password: "",
            loading: false
        }
    }
     handleSubmit = e => {
        console.log("SUBMIT");
      };
      
     handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
              <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth/>
              <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth/>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
