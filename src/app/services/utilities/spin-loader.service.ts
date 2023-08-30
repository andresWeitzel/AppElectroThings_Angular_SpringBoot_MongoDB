//External
import { Injectable } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable({
  providedIn: "root",
})
export class SpinLoaderService {
  constructor(private ngxService: NgxUiLoaderService) {}

  load(delay: number) {
    try {
      this.ngxService.start();
      setTimeout(() => {
        this.ngxService.stop();
      }, delay);
    } catch (error) {
      console.log(`Error in SpinLoaderService load() function. Caused by ${error}`);
    }
  }
}
