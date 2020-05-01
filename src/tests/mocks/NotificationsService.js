/**
 * Simulating access to POD and visualizing notifications
 */

export default class NotificationsService {

  constructor() {
    this.error = false;
  }

  checkContent(path) {
    if (path.includes("miguel")) {
      this.error = false;
    } else {
      this.error = true;
    }
  }

  formatDate(date) {
    return "";
  }
}