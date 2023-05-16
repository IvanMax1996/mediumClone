import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {PopularTagsComponent} from "./components/popularTags.component"
import {PopularTagsService} from "./services/popularTags.service"
import {StoreModule} from "@ngrx/store"
import {reducers} from "./store/reducers"
import {EffectsModule} from "@ngrx/effects"
import {GetPopularTagsEffect} from "./store/effects/getPopularTags.effect"
import {ErrorMessageModule} from "../errorMessage/errorMessage.module"
import {LoadingModule} from "../loading/loading.module"
import {RouterModule} from "@angular/router"

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature("popularTags", reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    ErrorMessageModule,
    LoadingModule
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService]
})
export class PopularTagsModule {}
