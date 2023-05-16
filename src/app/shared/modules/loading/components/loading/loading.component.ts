import {Component} from "@angular/core"

@Component({
  selector: "mc-loading",
  template: '<div class="loading">Loading...</div>',
  styles: [
    `
      .loading {
        text-align: center;
      }
    `
  ]
})
export class LoadingComponent {}
