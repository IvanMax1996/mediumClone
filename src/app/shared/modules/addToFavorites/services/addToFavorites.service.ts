import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {environment} from "../../../../../environments/environment"
import {Observable} from "rxjs"
import {ArticleInterface} from "../../../types/article.interface"
import {GetArticleResponseInterface} from "../../../types/getArticleResponse.interface"
import {map} from "rxjs/operators"

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorite(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug)
    return this.http.post(url, {}).pipe(map(this.getArticle))
  }

  removeToFavorite(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug)
    return this.http.delete(url).pipe(map(this.getArticle))
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article
  }
}
