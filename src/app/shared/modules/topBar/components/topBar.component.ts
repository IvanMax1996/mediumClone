import {Component, OnInit} from "@angular/core"
import {select, Store} from "@ngrx/store"
import {Observable, Subscription} from "rxjs"
import {CurrentUserInterface} from "../../../types/currentUser.interface"
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector
} from "../../../../auth/store/selectors"

@Component({
  selector: "mc-topBar",
  templateUrl: "./topBar.component.html",
  styleUrls: ["./topBar.component.scss"]
})
export class TopBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>
  isAnonymous$: Observable<boolean>
  currentUser$: Observable<CurrentUserInterface | null>
  currentUserSubscription: Subscription
  imageLength: number
  test: number
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }
}
