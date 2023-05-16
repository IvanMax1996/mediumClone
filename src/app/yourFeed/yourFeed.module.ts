import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {RouterModule} from "@angular/router"
import {FeedModule} from "../shared/modules/feed/feed.module"
import {BannerModule} from "../shared/modules/banner/banner.module"
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module"
import {FeedToggledModule} from "../shared/modules/feedToggled/feedToggled.module"
import {YourFeedComponent} from "./components/yourFeed/yourFeed.component"

const routes = [{path: "feed", component: YourFeedComponent}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedToggledModule
  ],
  declarations: [YourFeedComponent]
})
export class YourFeedModule {}
