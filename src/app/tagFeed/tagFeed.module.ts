import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {RouterModule} from "@angular/router"
import {FeedModule} from "../shared/modules/feed/feed.module"
import {BannerModule} from "../shared/modules/banner/banner.module"
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module"
import {FeedToggledModule} from "../shared/modules/feedToggled/feedToggled.module"
import {TagFeedComponent} from "./components/tagFeed/tagFeed.component"

const routes = [{path: "tags/:slug", component: TagFeedComponent}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedToggledModule
  ],
  declarations: [TagFeedComponent]
})
export class TagFeedModule {}
