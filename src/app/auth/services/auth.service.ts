import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {HttpClient} from "@angular/common/http"
import {environment} from "../../../environments/environment"
import {map} from "rxjs/operators"

import {RegisterRequestInterface} from "../types/registerRequest.interface"
import {CurrentUserInterface} from "../../shared/types/currentUser.interface"
import {AuthResponseInterface} from "../types/authResponse.interface"
import {LoginRequestInterface} from "../types/loginRequest.interface"
import {CurrentUserInputInterface} from "../../shared/types/currentUserInput.interface"
import {CurrentUserWithPasswordInterface} from "../../shared/types/currentUserWithPassword.interface"

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "users"

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "users/login"

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "user"

    return this.http.get(url).pipe(map(this.getUser))
  }

  updateCurrentUser(
    currentUser: CurrentUserWithPasswordInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + "/user"
    const currentUserInput: CurrentUserInputInterface = {
      user: currentUser
    }
    return this.http.put(url, currentUserInput).pipe(map(this.getUser))
  }
}
