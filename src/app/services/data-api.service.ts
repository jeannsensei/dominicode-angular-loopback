import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  books: Observable<any>;
  book: Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {}
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getAllBooks() {
    const url_api = 'http://localhost:3000/api/books?filter[where][oferta]=0';
    return this.http.get(url_api);
  }

  // http://localhost:3000/api/books/5bea1a07b090db1654ee6af9

  getBookById(id: string) {
    const url_api = `http://localhost:3000/api/books/${id}`;
    return (this.book = this.http.get(url_api));
  }

  getOffers() {
    const url_api = `http://localhost:3000/api/books?filter[where][oferta]=1`;
    return (this.books = this.http.get(url_api));
  }

  saveBook(book) {
    // TODO: Obtener token
    // TODO: not null
    const token = this.authService.getToken();
    const url_api = `http://localhost:3000/api/books/books?access_token=${token}`;
    return this.http
      .post(url_api, book, { headers: this.headers })
      .pipe(map(data => data));
  }

  updateBook(book) {
    // TODO: Obtener token
    // TODO: not null
    const token = this.authService.getToken();
    const url_api = `http://localhost:3000/api/books/books?access_token=${token}`;
    return this.http
      .put(url_api, book, { headers: this.headers })
      .pipe(map(data => data));
  }

  deleteBook(id: string) {
    // TODO: Obtener token
    // TODO: not null
    const token = this.authService.getToken();
    const url_api = `http://localhost:3000/api/books/books?access_token=${token}`;
    return this.http
      .delete(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }
}
