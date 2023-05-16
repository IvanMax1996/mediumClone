import {Component, OnDestroy, OnInit} from "@angular/core"
import {FormBuilder, FormGroup} from "@angular/forms"
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface"
import {filter, Observable, Subscription} from "rxjs"
import {select, Store} from "@ngrx/store"
import {currentUserSelector} from "../../../auth/store/selectors"
import {isSubmittingSelector} from "../../store/selectors"
import {updateCurrentUserAction} from "../../../auth/store/actions/updateCurrentUser.action"
import {CurrentUserWithPasswordInterface} from "../../../shared/types/currentUserWithPassword.interface"
import {logoutAction} from "../../../auth/store/actions/sync.action"

@Component({
  selector: "mc-settings",
  templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface
  currentUserSubscription: Subscription
  form: FormGroup
  isSubmitting$: Observable<boolean>
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ""
    })
  }

  submit(): void {
    const currentUserWithPassword: CurrentUserWithPasswordInterface = {
      ...this.currentUser,
      ...this.form.value
    }

    this.store.dispatch(updateCurrentUserAction({currentUserWithPassword}))
  }

  logout(): void {
    this.store.dispatch(logoutAction())
  }
}
