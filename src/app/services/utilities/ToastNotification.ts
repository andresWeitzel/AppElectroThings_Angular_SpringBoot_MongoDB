//External
import { NgToastService } from "ng-angular-popup";

const ERROR:string="ERROR";
const ERROR_DURATION:number=2000;
const TIMEOUT:number=100;

export class ToastNotification {
  constructor(private toast: NgToastService) {}

  toastError(msg:string) {
    try {
      setTimeout(() => {
        this.toast.error({
          detail: ERROR,
          summary: msg,
          duration: ERROR_DURATION,
        });
      }, TIMEOUT);
    } catch (error) {
      console.log(`Error in toastError() function. Caused by ${error}`);
    }
  }
}
