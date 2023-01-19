import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesUrl = 'api/notes'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET notes from the server */
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  /** GET note by id. Will 404 if id not found */
  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url);
  }

  /** POST: add a new note */
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions)
      .pipe(
        tap(newNote => console.log(`new note created with id: ${newNote.id}`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }

  /** PUT: update a note */
  updateNote(note: Note): Observable<any> {
    return this.http.put<Note>(this.notesUrl, note, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated note with id: ${note.id}`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error) )
        })
      );
  }

  deleteNote(id: string): Observable<any> {
    const url = `${this.notesUrl}/${id}`
    return this.http.delete<Note>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted note with id: ${id}`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      )
  }

}
