import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FeedToggledComponent} from "./components/feedToggled.component"
import {RouterModule} from "@angular/router"

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FeedToggledComponent],
  exports: [FeedToggledComponent]
})
export class FeedToggledModule {}
