import {isDevMode, NgModule} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {AuthModule} from "src/app/auth/auth.module"
import {StoreModule} from "@ngrx/store"
import {StoreDevtoolsModule} from "@ngrx/store-devtools"

import {AppComponent} from "src/app/app.component"
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
import {EffectsModule} from "@ngrx/effects"
import {TopBarModule} from "./shared/modules/topBar/topBar.module"
import {PersistenceService} from "./shared/services/persistence.service"
import {AuthInterceptor} from "./shared/services/authInterceptor.service"
import {GlobalFeedModule} from "./globalFeed/globalFeed.module"
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store"
import {RouterModule, Routes} from "@angular/router"
import {YourFeedModule} from "./yourFeed/yourFeed.module"
import {TagFeedModule} from "./tagFeed/tagFeed.module"
import {ArticleModule} from "./article/article.module"
import {CreateArticleModule} from "./createArticle/createArticle.module"
import {EditArticleModule} from "./editArticle/editArticle.module"
import {SettingsModule} from "./settings/settings.module"
import {UserProfileModule} from "./userProfile/userProfile.module"

const routes: Routes = [
  {path: "", redirectTo: "global-feed", pathMatch: "full"}
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    TopBarModule,
    HttpClientModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
