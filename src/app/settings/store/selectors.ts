import {AppStateInterface} from "../../shared/types/appState.interface"
import {createSelector} from "@ngrx/store"
import {SettingsStateInterface} from "../types/settingsState.interface"
export const settingsFeatureSelector = (
  state: AppStateInterface
): SettingsStateInterface => state.auth

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface) => settingsState.isSubmitting
)
