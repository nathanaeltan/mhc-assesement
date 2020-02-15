import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";
import { confirmDate } from "../actions/event";
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

const DateSelect = ({ proposed_dates, confirmDate, eventID }) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    confirmedDate: ""
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
  const handleSubmit = e => {
    e.preventDefault();
    confirmDate(formData, eventID);
  };
  const { confirmedDate } = formData;

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
            name="confirmed_date"
            onChange={e => handleChange(e)}
            value={confirmedDate}
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
          <Button onClick={handleSubmit}>
            Confirm
          </Button>
        
      </FormControl>
    </Fragment>
  );
};

DateSelect.propTypes = {
  confirmDate: PropTypes.func.isRequired
};
// const mapStateToProps = state => ({
//   event: state.event,
//   user: state.auth.user
// });

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ confirmDate: confirmDate }, dispatch);
};
export default connect(null, matchDispatchToProps)(DateSelect);
