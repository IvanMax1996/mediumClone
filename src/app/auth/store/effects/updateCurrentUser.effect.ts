import {Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {catchError, map, switchMap} from "rxjs/operators"
import {of} from "rxjs"

import {CurrentUserInterface} from "../../../shared/types/currentUser.interface"
import {AuthService} from "../../services/auth.service"
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from "../actions/updateCurrentUser.action"

@Injectable()
export class UpdateCurrentUserEffect {
  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({currentUserWithPassword}) => {
        return this.authService.updateCurrentUser(currentUserWithPassword).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateCurrentUserSuccessAction({currentUser})
          }),
          catchError(() => {
            return of(updateCurrentUserFailureAction())
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private authService: AuthService) {}
}
