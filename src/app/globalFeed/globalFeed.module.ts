import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {GlobalFeedComponent} from "./components/globalFeed/globalFeed.component"
import {RouterModule} from "@angular/router"
import {FeedModule} from "../shared/modules/feed/feed.module"
import {BannerModule} from "../shared/modules/banner/banner.module"
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module"
import {FeedToggledModule} from "../shared/modules/feedToggled/feedToggled.module"

const routes = [{path: "global-feed", component: GlobalFeedComponent}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedToggledModule
  ],
  declarations: [GlobalFeedComponent]
})
export class GlobalFeedModule {}
