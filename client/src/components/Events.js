import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getEvents } from "../actions/event";
import ViewEvent from "./ViewEvent";
import Moment from "react-moment";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(
  event_name,
  location,
  vendor_name,
  status,
  date,
  _id,
  company_name
) {
  return { event_name, location, vendor_name, status, date, _id, company_name };
}

const Events = ({ getEvents, event: { events, loading }, user }) => {
  useEffect(() => {
    setTimeout(() => {
      getEvents();
    }, 2000);
  }, [getEvents]);
  const classes = useStyles();
  const rows = events.map(event => {
    const {
      event_name,
      location,
      vendor_name,
      status,
      date,
      _id,
      company_name
    } = event;
    return createData(
      event_name,
      location,
      vendor_name,
      status,
      date,
      _id,
      company_name
    );
  });
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <TableContainer component={Paper} style={{paddingTop: "40px"}}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>
                {user !== null ? (user.vendor ? "Company" : "Vendor") : null}
              </TableCell>
              <TableCell>Approved </TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.event_name}
                </TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  {" "}
                  {user !== null
                    ? !user.vendor
                      ? row.vendor_name
                      : row.company_name
                    : null}
                </TableCell>
                <TableCell>
                  {row.status ? "Approved" : "Not Approved"}
                </TableCell>
                <TableCell>
                  <Moment format="DD/MM/YYYY">{row.date}</Moment>
                </TableCell>
                <TableCell>
                  <ViewEvent eventID={row._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  user: state.auth.user
});

export default connect(mapStateToProps, { getEvents })(Events);
