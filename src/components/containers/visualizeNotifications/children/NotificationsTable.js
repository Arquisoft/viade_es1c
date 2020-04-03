import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useNotification, useWebId } from '@inrupt/solid-react-components';
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';

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
    fetchNotification,
  } = useNotification(webId);
  const TableWithLoading = WithLoading(Table);

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
            if (notification.notifications[i].read !==  true) {
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

  handleNotifications(); // Load the hooks

  return (
    <div>
      <TableContainer component={Paper}>
        <TableWithLoading isLoading={!showTable} className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nº</TableCell>
              <TableCell align="right">{t("notifications.value")}</TableCell>
            </TableRow>
          </TableHead>
          {showTable && (<TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.N}
                </TableCell>
                <TableCell align="right">{row.Notification}</TableCell>
              </TableRow>
            ))}
          </TableBody>)}
        </TableWithLoading>
      </TableContainer>
    </div>
  );
}

export default NotificationsTable;
