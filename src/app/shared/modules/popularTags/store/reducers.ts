import {PopularTagsStateInterface} from "../types/popularTagsState.interface"
import {Action, createReducer, on} from "@ngrx/store"
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from "./actions/getPopularTags.action"

const initialState: PopularTagsStateInterface = {
  data: null,
  error: null,
  isLoading: null
}

const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      data: null,
      isLoading: true
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      data: action.popularTags,
      isLoading: false
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false
    })
  )
)

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action)
}
