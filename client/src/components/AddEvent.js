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
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { connect } from "react-redux";
import { createEvent, getVendors } from "../actions/event";
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
  }
}));
const AddEvent = ({ createEvent, getVendors }) => {
  const [formData, setFormData] = useState({
    event_name: "",
    proposed_dates: "",
    vendor: "",
    location: ""
  });
  const classes = useStyles();
  const { event_name, proposed_dates, vendor, location } = formData;
  const [open, setOpen] = React.useState(false);

 
  const handleOpen = e => {
    setOpen(true);
   console.log("CLICKED")
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createEvent(formData)
  };
  return (
    <Fragment>
    <Tooltip title="Add Event" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <AddIcon onClick={e => handleOpen(e)}/>
        </Fab>
      </Tooltip>
    </Fragment>
  )
  
};

AddEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired
};
export default connect(null, { createEvent, getVendors })(AddEvent);
