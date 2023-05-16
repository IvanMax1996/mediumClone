import {createAction, props} from "@ngrx/store"
import {ActionTypes} from "../actionTypes"
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface"
import {CurrentUserWithPasswordInterface} from "../../../shared/types/currentUserWithPassword.interface"

export const updateCurrentUserAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER,
  props<{currentUserWithPassword: CurrentUserWithPasswordInterface}>()
)

export const updateCurrentUserSuccessAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const updateCurrentUserFailureAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER_FAILURE
)
