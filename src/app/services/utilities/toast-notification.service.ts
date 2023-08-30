
//External
import { Injectable } from "@angular/core";
import { NgToastService } from "ng-angular-popup";

const ERROR:string="Error";
const UNAUTHORIZED_OPERATION:string="Unauthorized Operation";
const ERROR_DURATION:number=2000;

const SUCCESS:string="Success";
const SUCCESSFUL_OPERATION:string="Successful Operation";
const SUCCESS_DURATION:number=1500;


const TIMEOUT:number=100;

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {
  constructor(private toast: NgToastService) {}

  error(msg:string) {
    try {
      setTimeout(() => {
        this.toast.error({
          detail: ERROR,
          summary: msg,
          duration: ERROR_DURATION,
        });
      }, TIMEOUT);
    } catch (error) {
      console.log(`Error in ToastNotificationService error() function. Caused by ${error}`);
    }
  }

  unauthorizedOperation(msg:string) {
    try {
      setTimeout(() => {
        this.toast.error({
          detail: UNAUTHORIZED_OPERATION,
          summary: msg,
          duration: ERROR_DURATION,
        });
      }, TIMEOUT);
    } catch (error) {
      console.log(`Error in ToastNotificationService unauthorizedOperation() function. Caused by ${error}`);
    }
  }

  success(msg:string) {
    try {
      setTimeout(() => {
        this.toast.success({
          detail: SUCCESS,
          summary: msg,
          duration: SUCCESS_DURATION,
        });
      }, TIMEOUT);
    } catch (error) {
      console.log(`Error in ToastNotificationService success() function. Caused by ${error}`);
    }
  }

  successfulOperation(msg:string) {
    try {
      setTimeout(() => {
        this.toast.success({
          detail: SUCCESSFUL_OPERATION,
          summary: msg,
          duration: SUCCESS_DURATION,
        });
      }, TIMEOUT);
    } catch (error) {
      console.log(`Error in ToastNotificationService successfulOperation() function. Caused by ${error}`);
    }
  }
}
