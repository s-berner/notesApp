import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes: Note[] = [
      { id: 12, title: 'Einkaufsliste', content: '', created: new Date() },
    ];
    return {notes};
  }
}