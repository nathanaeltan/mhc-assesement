import React, { useEffect, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { getEvent } from "../actions/event";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const ViewEvent = ({ eventID, getEvent, event: { event, loading }, user }) => {
  useEffect(() => {
    getEvent(eventID);
  }, [getEvent]);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClickOpen = e => {
    setOpen(true);
    getEvent(eventID);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let event_name,
    location,
    vendor_name,
    company_name,
    status,
    remarks,
    date,
    proposed_dates;

  if (event) {
    event_name = event.event_name;
    location = event.location;
    vendor_name = event.vendor_name;
    company_name = event.company_name;
    status = event.status;
    remarks = event.remarks;
    date = event.date;
    proposed_dates = event.proposed_dates;
  }

  return (
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
            <DialogTitle id="responsive-dialog-title">{event_name}</DialogTitle>
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

              {proposed_dates.map(item => {
                return (
                  <DialogContentText>
                    <Moment format="YYYY/MM/DD">{item}</Moment>
                  </DialogContentText>
                );
              })}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Agree
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
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  user: state.auth.user
});

export default connect(mapStateToProps, { getEvent })(ViewEvent);
