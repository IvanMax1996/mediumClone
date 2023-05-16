import {Component, OnDestroy, OnInit} from "@angular/core"
import {ProfileInterface} from "../../../shared/types/profile.interface"
import {filter, Observable, Subscription, combineLatest} from "rxjs"
import {select, Store} from "@ngrx/store"
import {getUserProfileAction} from "../../store/actions/getUserProfile.action"
import {
  ActivatedRoute,
  IsActiveMatchOptions,
  Params,
  Router
} from "@angular/router"
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector
} from "../../store/selectors"
import {currentUserSelector} from "../../../auth/store/selectors"
import {map} from "rxjs/operators"
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface"

@Component({
  selector: "mc-user-profile",
  templateUrl: "./userProfile.component.html",
  styles: [
    `
      .btn-secondary {
        background-color: #fff;

        &:hover {
          background-color: #e6e6e6;
        }
      }
    `
  ]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  userProfileSubscription: Subscription
  slug: string
  apiUrl: string
  isCurrentUserProfile$: Observable<boolean>

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initialListeners()
  }

  ngOnDestroy() {
    this.userProfileSubscription.unsubscribe()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get("slug")
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(currentUserSelector)).pipe(filter(Boolean)),
      this.store.pipe(select(userProfileSelector)).pipe(filter(Boolean))
    ]).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          ProfileInterface
        ]) => {
          return currentUser.username === userProfile.username
        }
      )
    )
  }

  initialListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile
      })

    this.route.params.subscribe((params: Params) => {
      this.slug = params["slug"]
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}))
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes("favorites")
    return (this.apiUrl = isFavorites
      ? `articles?favorited=${this.slug}`
      : `articles?author=${this.slug}`)
  }
}
