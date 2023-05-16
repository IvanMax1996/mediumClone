import {Component, Input, OnInit} from "@angular/core"
import {select, Store} from "@ngrx/store"
import {addToFavoritesAction} from "../store/actions/addToFavorites.action"
import {Subscription} from "rxjs"
import {isLoggedInSelector} from "../../../../auth/store/selectors"
import {Router} from "@angular/router"

@Component({
  selector: "mc-add-to-favorites",
  templateUrl: "./addToFavorites.component.html"
})
export class AddToFavoritesComponent implements OnInit {
  @Input("isFavorite") isFavoriteProps: boolean
  @Input("favoritesCount") favoritesCountProps: number
  @Input("articleSlug") articleSlugProps: string

  favoritesCount: number
  isFavorite: boolean
  isLoggedInSubscription: Subscription
  isLoggedIn: boolean

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.store
      .pipe(select(isLoggedInSelector))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn
      })
    this.favoritesCount = this.favoritesCountProps
    this.isFavorite = this.isFavoriteProps
  }

  handleLike(): void {
    if (this.isLoggedIn) {
      this.store.dispatch(
        addToFavoritesAction({
          isFavorite: this.isFavorite,
          slug: this.articleSlugProps
        })
      )
      if (this.isFavorite) this.favoritesCount--
      else this.favoritesCount++

      this.isFavorite = !this.isFavorite
    } else {
      this.router.navigateByUrl("/login").then()
    }
  }
}
