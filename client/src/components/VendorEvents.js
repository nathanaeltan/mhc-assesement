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
import { getVendorEvents } from "../actions/event";
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
  company_name,
  confirmed_date
) {
  return {
    event_name,
    location,
    vendor_name,
    status,
    date,
    _id,
    company_name,
    confirmed_date
  };
}

const Events = ({ getVendorEvents, event: { events, loading }, user }) => {
  useEffect(() => {
    setTimeout(() => {
      getVendorEvents();
    }, 2000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();

  const rows = events.map(event => {
    const {
      event_name,
      location,
      vendor_name,
      status,
      date,
      _id,
      company_name,
      confirmed_date
    } = event;
    return createData(
      event_name,
      location,
      vendor_name,
      status,
      date,
      _id,
      company_name,
      confirmed_date
    );
  });
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>VENDOR</h1>
      <TableContainer component={Paper}>
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
              <TableCell>Confirmed Date</TableCell>
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
                <TableCell>
                  {row.confirmed_date ? (
                    <Moment format="DD/MM/YYYY">{row.confirmed_date}</Moment>
                  ) : (
                    ""
                  )}
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
  getVendorEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  user: state.auth.user
});

export default connect(mapStateToProps, { getVendorEvents })(Events);
