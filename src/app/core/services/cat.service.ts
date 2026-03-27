import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Cat, CreateCatRequest, UpdateCatRequest, RawCatResponse } from '../models/cat.model';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private http = inject(HttpClient);
  private apiUrl = '/prod';

  // State for manual updates (create/update/delete)
  private _refreshTrigger = signal(0);

  // GET /list using rxResource (Modern Angular 19)
  catsResource = rxResource({
    request: () => ({ trigger: this._refreshTrigger() }),
    loader: () => this.http.get<RawCatResponse>(`${this.apiUrl}/list`).pipe(
      map(res => {
        const rawArray = res?.data || [];
        return rawArray.map(item => ({
          id: item.id,
          name: item.info?.name || 'Unknown',
          description: item.info?.description || '',
          age: item.info?.age || 'Unknown',
          imageUrl: `https://cataas.com/cat?unique=${item.id}`
        })) as Cat[];
      })
    )
  });

  // Expose simplified signals
  cats = computed(() => this.catsResource.value() || []);
  loading = computed(() => this.catsResource.isLoading());
  error = computed(() => this.catsResource.error() ? 'Failed to fetch cats. Please try again.' : null);

  constructor() {}

  fetchCats() {
    this._refreshTrigger.update(v => v + 1);
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
    return this.http.post(`${this.apiUrl}/create`, request).pipe(
      tap(() => this.fetchCats()),
      catchError(err => throwError(() => err))
    );
  }

  // PUT /update?id={uuid}
  updateCat(id: string, request: UpdateCatRequest) {
    return this.http.put(`${this.apiUrl}/update`, request, {
      params: new HttpParams().set('id', id)
    }).pipe(
      tap(() => this.fetchCats()),
      catchError(err => throwError(() => err))
    );
  }

  // DELETE /delete?id={uuid}
  deleteCat(id: string) {
    return this.http.delete(`${this.apiUrl}/delete`, {
      params: new HttpParams().set('id', id)
    }).pipe(
      tap(() => this.fetchCats()),
      catchError(err => throwError(() => err))
    );
  }
}
