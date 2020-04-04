import React, {useState} from 'react';
import { Table , TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, makeStyles, Checkbox} from '@material-ui/core';
import { useNotification, useWebId } from '@inrupt/solid-react-components';
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';
import {Button} from "react-bootstrap";

export const NotificationsTable = (props) => {

  // Hook for i18n
  const {t} = useTranslation();
  const [rows, setRows] = useState([]);
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
      for (let i=0; i < notification.notifications.length; i++) {
        if (notification.notifications[i].read !== 'true' && positionsNotifications.includes(i)) {
          markAsReadNotification(notification.notifications[i].path, notification.notifications[i].id, 'true').then(() => {
            window.location.reload(true);
          });
        }
      }
    }
  }

  handleNotifications(); // Load the hooks

  return (
    <div>
      {!showTable && (
        <BoxWithLoading isLoading={!showTable}/>
      )}
      {showTable && (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nº</TableCell>
                  <TableCell align="right">{t("notifications.value")}</TableCell>
                  <TableCell align="right">{t("notifications.read")}</TableCell>
                </TableRow>
              </TableHead>
              {(<TableBody>
                {rows.map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell name="notificationList">
                      {row.N}
                    </TableCell>
                    <TableCell align="right">{row.Notification}</TableCell>
                    <TableCell align="right"><Checkbox name="check" color="primary"></Checkbox></TableCell>
                  </TableRow>
                ))}
              </TableBody>)}
            </Table>
          </TableContainer>
          <br/>
          <Button onClick={markAsRead}>{t("notifications.mark")}</Button>
        </div>
      )}
    </div>
  );
}

export default NotificationsTable;
