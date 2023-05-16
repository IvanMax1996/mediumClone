import {Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction
} from "../actions/register.action"
import {switchMap, map, catchError, tap} from "rxjs/operators"
import {of} from "rxjs"
import {HttpErrorResponse} from "@angular/common/http"
import {Router} from "@angular/router"

import {CurrentUserInterface} from "../../../shared/types/currentUser.interface"

import {AuthService} from "../../services/auth.service"
import {PersistenceService} from "../../../shared/services/persistence.service"

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set("accessToken", currentUser.token)
            return registerSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl("/global-feed").then()
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}
}
