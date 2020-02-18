import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Spinner from "./Spinner";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import { createEvent, getVendors } from "../actions/event";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2)
  },
  dialog: {
    padding: "50px"
  }
}));
const styles = {
  form: {
    textAlign: "center",
    margin: "20px"
  },
  pageTitle: {
    marginTop: "30px"
  },
  textField: {
    margin: "10px"
  },
  button: {
    marginTop: "30px"
  }
};
const AddEvent = ({ createEvent, getVendors, vendors }) => {
  const [formData, setFormData] = useState({
    event_name: "",
    proposed_dates: "",
    vendor: "",
    location: ""
  });
  const classes = useStyles();
  const { event_name, proposed_dates, vendor, location } = formData;
  const [open, setOpen] = React.useState(false);
  const [vendorOpen, setVendorOpen] = React.useState(false);

  const handleOpen = e => {
    setOpen(true);
    console.log("OPENING");
    getVendors();
  };
  const handleVendorOpen = e => {
    setVendorOpen(true);
  };

  const handleVendorClose = () => {
    setVendorOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  }

  const handleSubmit = e => {
    e.preventDefault();
    createEvent(formData);
    setFormData("")
    handleClose()
  };

  return (
    <Fragment>
      <Tooltip title="Add Event" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <AddIcon onClick={handleOpen} />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className={classes.dialog}
      >
        <Grid container style={styles.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h2" style={styles.pageTitle}>
              Add an Event
            </Typography>
            <form noValidate onSubmit={e => handleSubmit(e)}>
              <TextField
                id="event_name"
                name="event_name"
                type="event_name"
                label="Event Name"
                style={styles.textField}
                value={event_name}
                onChange={e => onChange(e)}
                fullWidth
              />
              <TextField
                id="location"
                name="location"
                type="location"
                label="Location"
                style={styles.textField}
                value={location}
                onChange={e => onChange(e)}
                fullWidth
              />
              <InputLabel id="demo-controlled-open-select-label">
                Pick a Vendor
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={vendorOpen}
                onClose={handleVendorClose}
                onOpen={handleVendorOpen}
                onChange={onChange}
                value={vendor}
                name="vendor"
                autoWidth
              >
                <MenuItem value="">
                  <em>Pick a Vendor</em>
                </MenuItem>
                {vendors.map(item => {
                  return (
                    <MenuItem value={item._id} key={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {<br/>}
              <TextField
                id="proposed_dates"
                name="proposed_dates"
                type="proposed_dates"
                label=" Proposed Dates"
                style={styles.textField}
                value={proposed_dates}
                onChange={e => onChange(e)}
                fullWidth
                helperText="Max 3 dates, dd/mm/yyyy seperated by comma"
              />
              {" "}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={styles.button}
              >
                Submit
              </Button>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </Dialog>
    </Fragment>
  );
};

AddEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vendors: state.event.vendors
});
export default connect(mapStateToProps, { createEvent, getVendors })(AddEvent);
