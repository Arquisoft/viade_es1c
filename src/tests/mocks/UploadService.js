/**
 * Simulating access to POD and upload tracks
 */
export default class UploadService {

  constructor() {
    this.error = false;
    this.success = false;
    this.errorPermissions = false;
  }

  handleUpload(HTMLElement) {
    this.success = false;
    this.error = false;
    if (HTMLElement.files.length > 0) {
      for (let i = 0; i < HTMLElement.files.length; i++) {
        if (HTMLElement.files[parseInt(i)].name.includes(".txt")) {
          this.error = true;
        } else if (HTMLElement.files[parseInt(i, 10)].name.includes(".json")) {
          this.success = true;
        } else if (HTMLElement.files[parseInt(i, 10)].name.includes(".ttl")) {
          this.errorPermissions = true;
        }
      }
    }
  }
}