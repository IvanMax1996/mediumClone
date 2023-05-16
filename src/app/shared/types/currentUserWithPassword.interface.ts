import {CurrentUserInterface} from "./currentUser.interface"

export interface CurrentUserWithPasswordInterface extends CurrentUserInterface {
  password: string
}
