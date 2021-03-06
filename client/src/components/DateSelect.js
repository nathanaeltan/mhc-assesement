import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";
import { confirmDate, getVendorEvents } from "../actions/event";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400
  }
}));

const DateSelect = ({
  proposed_dates,
  confirmDate,
  getVendorEvents,
  eventID,
  event: { event }
}) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    confirmed_date: ""
  });

  const [open, setOpen] = React.useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    await confirmDate(formData, eventID);

    await getVendorEvents();
  };
  const { confirmed_date } = formData;

  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Confirm Date
        </InputLabel>

        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
          value={confirmed_date}
          name="confirmed_date"
        >
          <MenuItem value="">
            <em>Pick a Date</em>
          </MenuItem>
          {proposed_dates.map(item => {
            return (
              <MenuItem value={item} key={item}>
                <Moment format="DD/MM/YYYY">{item}</Moment>
              </MenuItem>
            );
          })}
        </Select>
        {event.confirmed_date ? null : (
          <Button onClick={handleSubmit}>Confirm</Button>
        )}
      </FormControl>
    </Fragment>
  );
};

DateSelect.propTypes = {
  confirmDate: PropTypes.func.isRequired,
  getVendorEvents: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  event: state.event
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    { confirmDate: confirmDate, getVendorEvents: getVendorEvents },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(DateSelect);
