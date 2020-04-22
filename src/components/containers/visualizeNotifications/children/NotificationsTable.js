import React, {useState, useEffect} from "react";
import { Table , TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, makeStyles, TablePagination} from "@material-ui/core";
import { useNotification } from "@inrupt/solid-react-components";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
import {Button, Form, FormControl} from "react-bootstrap";
import {NotificationContainer, NotificationManager} from "react-notifications";
import "./NotificationsTable.css";

let times = 0; // Shows no read notifications
let restartNotifications = true;  // For searcher

export const NotificationsTable = ({myWebId}) => {

  // Hook for i18n
  const {t} = useTranslation();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [showTable, setShowTable] = useState(false);
  const useStyles = makeStyles({
    table: {
      minWidth: 200,
    },
  });
  const classes = useStyles();
  const webId = myWebId;
  const {
    notification,
    fetchNotification,
  } = useNotification(webId);
  const BoxWithLoading = WithLoading(Box);

  /**
   * Function that create the row
   * @param N
   * @param Notification
   * @returns {{N: *, Notification: *}}
   */
  function createData(N, Notification) {
    return { N, Notification };
  }

  /**
   * Obtains the notifications from the POD
   * and loads the hooks
   * @returns {Promise<void>}
   */
  async function handleNotifications() {
      if (webId !== undefined && webId !== null) {
        let userWebId = webId.replace("/profile/card#me","/inbox/");
        const inboxes = [{ path: userWebId, inboxName: 'Global Inbox', shape: 'default' }];
        await fetchNotification(inboxes);
        if (notification.notifications.length > 0 && restartNotifications) {
          let rows = [];
          for (let i=0; i < notification.notifications.length; i++) {
            rows.push(createData(i+1, notification.notifications[i].summary));
          }
          setRows(rows);
          setShowTable(true);
          if (times === 0) {
            times++;
            NotificationManager.info(t('notifications.infoMessage1').concat(rows.length).concat(t('notifications.infoMessage2'))
              , t('notifications.infoTitle'), 3000);
          }
        }
      }
  }

  /**
   * Function that shows a loading component while notifications are being obtained
   * @param Component
   * @returns {WithLoadingComponent}
   * @constructor
   */
  function WithLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
      if (!isLoading) return (<Component {...props} />);
      return (<div align="center">
        <ReactLoading type={"spin"} color={"#5FB0FF"} height={'10%'} width={'10%'}/>
        <br/>
        <p>{t('notifications.loadingNotifications')}</p>
      </div>);
    }
  }

  /**
   * Search notifications by input
   */
  function searchNotifications() {
    if (notification.notifications.length > 0) {
      let searchInput = document.getElementById("searchInput").value;
      if (searchInput.localeCompare("") !== 0) {
        let notifications = [];
        for (let i=0; i < notification.notifications.length; i++) {
          if (notification.notifications[i].summary.toUpperCase().includes(searchInput.toUpperCase())) {
            restartNotifications = false;
            notifications.push(createData(i+1, notification.notifications[i].summary));
          }
        }
        if (notifications.length === 0) {
          restartNotifications = false;
          NotificationManager.error(t('notifications.errorMessage')
            , t('notifications.errorTitle'), 3000);
        }
        setRows(notifications);
      } else {
        restartNotifications = true;
      }
    }
  }

  /**
   * Handle page change
   * @param event
   * @param newPage
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Handle how many rows have each page
   * @param event
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    handleNotifications(); // Load the hooks
  });

  return (
    <div data-testid="notificationTableComp">
      {!showTable && (
        <BoxWithLoading isLoading={!showTable}/>
      )}
      {showTable && (
        <div>
          <Form className="searcher" inline>
            <FormControl type="text" placeholder="e.g. user1" className="mr-sm-2" id="searchInput" />
            <Button variant="primary" onClick={searchNotifications}>{t("notifications.searchButton")}</Button>
          </Form>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-labelledby="tableTitle" aria-label="enhanced table">
              <TableHead>
                <TableRow>
                  <TableCell>Nº</TableCell>
                  <TableCell align="right">{t("notifications.value")}</TableCell>
                </TableRow>
              </TableHead>
              {(<TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell name="notificationList">
                        {row.N}
                      </TableCell>
                      <TableCell align="right">{row.Notification}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>)}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 6, 12]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <br/>
        </div>
      )}
      <NotificationContainer/>
    </div>
  );
}

export default NotificationsTable;
