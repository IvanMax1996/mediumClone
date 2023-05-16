import {Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {catchError, map, switchMap} from "rxjs/operators"
import {of} from "rxjs"
import {AddToFavoritesService} from "../../services/addToFavorites.service"
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from "../actions/addToFavorites.action"
import {ArticleInterface} from "../../../../types/article.interface"

@Injectable()
export class AddToFavoritesEffect {
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({isFavorite, slug}) => {
        const article$ = isFavorite
          ? this.addToFavoritesService.removeToFavorite(slug)
          : this.addToFavoritesService.addToFavorite(slug)

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({article})
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService
  ) {}
}
