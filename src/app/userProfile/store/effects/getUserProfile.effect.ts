import {Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {catchError, map, switchMap} from "rxjs/operators"
import {of} from "rxjs"
import {UserProfileService} from "../../services/userProfile.service"
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from "../actions/getUserProfile.action"
import {ProfileInterface} from "../../../shared/types/profile.interface"

@Injectable()
export class GetUserProfileEffect {
  getUserProfileArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({slug}) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: ProfileInterface) => {
            return getUserProfileSuccessAction({userProfile})
          }),
          catchError(() => {
            return of(getUserProfileFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}
}
