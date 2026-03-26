import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cat, CreateCatRequest, UpdateCatRequest } from '../models/cat.model';
import { catchError, map, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private http = inject(HttpClient);
  private apiUrl = '/prod';

  private _cats = signal<Cat[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  cats = computed(() => this._cats());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  constructor() {}

  // GET /list
  fetchCats() {
    this._loading.set(true);
    this._error.set(null);
    return this.http.get<{ status_code: number; data: any[] }>(`${this.apiUrl}/list`).pipe(
      tap(res => {
        const rawArray = res?.data || [];
        const formattedCats: Cat[] = rawArray.map(item => ({
          id: item.id,
          name: item.info?.name || 'Unknown',
          description: item.info?.description || '',
          age: item.info?.age || 'Unknown',
          imageUrl: `https://cataas.com/cat?unique=${item.id}`
        }));
        this._cats.set(formattedCats);
        this._loading.set(false);
      }),
      catchError(err => {
        this._error.set('Failed to fetch cats. Please try again.');
        this._loading.set(false);
        return throwError(() => err);
      })
    ).subscribe();
  }

  // GET /list?id={uuid}
  getCatById(id: string) {
    return this.http.get<Cat>(`${this.apiUrl}/list`, {
      params: new HttpParams().set('id', id)
    }).pipe(
      map(cat => ({
        ...cat,
        imageUrl: `https://cataas.com/cat?unique=${cat.id}`
      }))
    );
  }

  // POST /create
  createCat(request: CreateCatRequest) {
    this._loading.set(true);
    return this.http.post(`${this.apiUrl}/create`, request).pipe(
      tap(() => {
        this.fetchCats(); // Refresh list
      }),
      catchError(err => {
        this._error.set('Failed to create cat.');
        this._loading.set(false);
        return throwError(() => err);
      })
    );
  }

  // PUT /update?id={uuid}
  updateCat(id: string, request: UpdateCatRequest) {
    this._loading.set(true);
    return this.http.put(`${this.apiUrl}/update`, request, {
      params: new HttpParams().set('id', id)
    }).pipe(
      tap(() => {
        this.fetchCats(); // Refresh list
      }),
      catchError(err => {
        this._error.set('Failed to update cat.');
        this._loading.set(false);
        return throwError(() => err);
      })
    );
  }

  // DELETE /delete?id={uuid}
  deleteCat(id: string) {
    this._loading.set(true);
    return this.http.delete(`${this.apiUrl}/delete`, {
      params: new HttpParams().set('id', id)
    }).pipe(
      tap(() => {
        this._cats.update(cats => cats.filter(c => c.id !== id));
        this._loading.set(false);
      }),
      catchError(err => {
        this._error.set('Failed to delete cat.');
        this._loading.set(false);
        return throwError(() => err);
      })
    );
  }
}
