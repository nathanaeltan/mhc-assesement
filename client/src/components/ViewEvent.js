import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { getEvent, toggleApproval } from "../actions/event";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { bindActionCreators } from "redux";
import DateSelect from "./DateSelect";
import Spinner from "./Spinner";
const ViewEvent = ({
  eventID,
  getEvent,
  toggleApproval,
  event: { event, loading },
  user
}) => {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = e => {
    setOpen(true);
    getEvent(eventID);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleApproval = e => {
    toggleApproval(eventID);
    setOpen(false);
  };
  let event_name,
    location,
    vendor_name,
    company_name,
    status,
    date,
    proposed_dates;

  if (event) {
    event_name = event.event_name;
    location = event.location;
    vendor_name = event.vendor_name;
    company_name = event.company_name;
    status = event.status;
    date = event.date;
    proposed_dates = event.proposed_dates;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={e => handleClickOpen(e)}
        >
          View
        </Button>

        {event ? (
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Event: {event_name}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Location: {location}</DialogContentText>
              <DialogContentText>
                {user !== null
                  ? user.vendor
                    ? "Company: " + company_name
                    : "Vendor: " + vendor_name
                  : null}
              </DialogContentText>
              <DialogContentText>
                Date: <Moment format="YYYY/MM/DD">{date}</Moment>
              </DialogContentText>
              <DialogContentText>
                Status: {status ? "Approved" : "Not Approved"}
              </DialogContentText>
              <DialogContentText>Proposed Dates:</DialogContentText>
              {user !== null ? (
                user.vendor ? (
                  <DateSelect
                    proposed_dates={proposed_dates}
                    eventID={eventID}
                  />
                ) : (
                  proposed_dates.map(item => {
                    return (
                      <DialogContentText key={item}>
                        <Moment format="YYYY/MM/DD">{item}</Moment>
                      </DialogContentText>
                    );
                  })
                )
              ) : null}
            </DialogContent>
            {user.vendor ? (
              <DialogActions>
                <Button
                  onClick={e => handleApproval(e)}
                  color="secondary"
                  variant="contained"
                  autoFocus
                >
                  {status ? "Deny" : "Approve"}
                </Button>
              </DialogActions>
            ) : null}

            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>
    </Fragment>
  );
};

ViewEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  toggleApproval: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  eventID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  user: state.auth.user
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    { getEvent: getEvent, toggleApproval: toggleApproval },
    dispatch
  );
};

export default connect(mapStateToProps, matchDispatchToProps)(ViewEvent);
