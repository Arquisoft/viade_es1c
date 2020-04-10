import React, {useState} from 'react';
import { Table , TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, makeStyles, Checkbox, TablePagination} from '@material-ui/core';
import { useNotification, useWebId } from '@inrupt/solid-react-components';
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';
import {Button} from "react-bootstrap";
import {NotificationContainer, NotificationManager} from "react-notifications";

let times = 0; // Shows no read notifications

export const NotificationsTable = (props) => {

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
  const webId = useWebId();
  const {
    notification,
    markAsReadNotification,
    fetchNotification,
  } = useNotification(webId);
  const BoxWithLoading = WithLoading(Box);
  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;

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
      if (webId !== undefined) {
        let userWebId = webId.replace("/profile/card#me","/inbox/");
        const inboxes = [{ path: userWebId, inboxName: 'Global Inbox', shape: 'default' }];
        await fetchNotification(inboxes);
        if (notification.notifications.length > 0) {
          let rows = [];
          for (let i=0; i < notification.notifications.length; i++) {
            if (notification.notifications[i].read !==  'true') {
              rows.push(createData(i+1, notification.notifications[i].summary));
            }
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
      return (<div align="center"><ReactLoading type={"spin"} color={"#5FB0FF"} height={'10%'} width={'10%'}/></div>);
    }
  }

  /**
   * Mark as read multiple notifications
   */
  function markAsRead() {
    if (notification.notifications.length > 0) {
      let notificationList = document.getElementsByName("notificationList");
      let checkboxes = document.getElementsByName("check");
      let positionsNotifications = [];
      for (let i=0; i < notificationList.length; i++) {
        if (checkboxes[i].checked) {
          positionsNotifications.push(i);
        }
      }
      if (positionsNotifications.length > 0){
        for (let i=0; i < notification.notifications.length; i++) {
          if (notification.notifications[i].read !== 'true' && positionsNotifications.includes(i)) {
            markAsReadNotification(notification.notifications[i].path, notification.notifications[i].id, 'true').then(() => {
              window.location.reload(true);
            });
          }
        }
      } else {
        NotificationManager.error(t('notifications.errorMessage'), t('notifications.errorTitle'), 3000);
      }
    }
  }

  /**
   * Handle multiple selection
   * @param event
   * @param name
   */
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

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

  handleNotifications(); // Load the hooks

  return (
    <div>
      {!showTable && (
        <BoxWithLoading isLoading={!showTable}/>
      )}
      {showTable && (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-labelledby="tableTitle" aria-label="enhanced table">
              <TableHead>
                <TableRow>
                  <TableCell>Nº</TableCell>
                  <TableCell align="right">{t("notifications.value")}</TableCell>
                  <TableCell align="right">{t("notifications.read")}</TableCell>
                </TableRow>
              </TableHead>
              {(<TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row, index) => {
                  const isItemSelected = isSelected(row.N);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover onClick={(event) => handleClick(event, row.N)}
                              role="checkbox" aria-checked={isItemSelected}
                              tabIndex={-1} key={row.N} selected={isItemSelected}>
                      <TableCell id={labelId} name="notificationList">
                        {row.N}
                      </TableCell>
                      <TableCell align="right">{row.Notification}</TableCell>
                      <TableCell align="right">
                        <Checkbox name="check" checked={isItemSelected}
                                  inputProps={{'aria-labelledby': labelId}} color="primary"/>
                      </TableCell>
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
          <Button onClick={markAsRead}>{t("notifications.mark")}</Button>
        </div>
      )}
      <NotificationContainer/>
    </div>
  );
}

export default NotificationsTable;
