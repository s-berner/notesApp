import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Label } from './label';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private labelsUrl = 'api/labels'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * GET labels from the server
   * @returns Observable<Label[]>
   */
  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.labelsUrl)
      .pipe(
        tap(labels => console.log(`fetched ${labels.length} labels`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }

  /**
   * POST: add a new label
   * @param label Label to add
   * @returns Observable<Label>
   */
  addLabel(label: Label): Observable<Label> {
    return this.http.post<Label>(this.labelsUrl, label, this.httpOptions)
      .pipe(
        tap(newLabel => console.log(`new label created with id: ${newLabel.id}`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }

  /**
   * DELETE: delete the label
   * @param id Id of the label to delete
   * @returns Observable<Label>
   */
  deleteLabel(id: number): Observable<Label> {
    const url = `${this.labelsUrl}/${id}`;
    return this.http.delete<Label>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted label with id: ${id}`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }
}
