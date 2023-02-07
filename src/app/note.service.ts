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

  /** 
   * GET notes from the server 
   * @returns Observable<Note[]>
   */
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        tap(notes => console.log(`fetched ${notes.length} notes`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }

  /** 
   * GET note by id. Will 404 if id not found 
   * @param id Id of the note to get
   * @returns Observable<Note>
   */
  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url)
      .pipe(
        tap(_ => console.log(`fetched note with id: ${id}`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }

  /** 
   * POST: add a new note 
   * @param note Note to add
   * @returns Observable<Note>
   */
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

  /** 
   * PUT: update(replace) a note 
   * @param note Note to update
   * @returns Observable<Note> 
   */
  updateNote(note: Note): Observable<Note> {
    if (typeof note.priority === 'string') { // html select element returns a string
      note.priority = Number(note.priority); // so i need to revert it to number
    }
    
    return this.http.put<Note>(this.notesUrl, note, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated note with id: ${note.id}`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error) )
        })
      );
  }

  /** 
   * PUT: update(replace) all notes
   * @param notes Notes to update
   * @returns Observable<Note[]> 
   */
  updateNotes(notes: Note[]): Observable<Note[]> {
    return this.http.put<Note[]>(this.notesUrl, notes, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated ${notes.length} notes`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error))
        })
      );
  }

  /** 
   * DELETE: delete a note 
   * @param id Id of the note to delete
   * @returns Observable<Note>
   */
  deleteNote(id: string): Observable<Note> {
    const url = `${this.notesUrl}/${id}`
    return this.http.delete<Note>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted note with id: ${id}`)),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }
}
