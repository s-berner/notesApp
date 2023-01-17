import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes: Note[] = [
      { 
        id: 12,
        title: 'Meeting Notes - January 12th',
        content: 'Discussed project timelines and assigned tasks to team members. Set next meeting for January 19th at 2pm. Action items: John to create project proposal, Jane to research competitors, Michael to create wireframes.',
        created: '2023-01-16T11:41:48.439Z',
        bg: 'rgb(235,64,52)',
        fc: 'rgb(255,255,255)'
      },
      { 
        id: 13,
        title: 'Grocery List',
        content: 'not-milk, bread, french fries, like-chicken, green beans, apples, toothpaste', 
        created: '2023-01-16T11:41:48.439Z',
        bg: 'rgb(81,128,32)',
        fc: 'rgb(255,255,255)' 
      },
      { 
        id: 14,
        title: 'To-Do List - Work',
        content: '1. Respond to client email 2. Finish report 3. Schedule meeting with team 4. Prepare for presentation 5. Follow up on project status',
        created: '2023-01-16T11:41:48.439Z',
        bg: 'rgb(194,135,212)',
        fc: 'rgb(0,0,0)'

      },
      { 
        id: 15,
        title: 'Book Club - Next Meeting',
        content: 'The next book club meeting will be on January 15th at 7pm. We will be discussing "The Great Gatsby" by F. Scott Fitzgerald. Refreshments will be provided. Please RSVP by January 13th.',
        created: '2023-01-16T11:41:48.439Z',
        bg: 'rgb(242,136,198)',
        fc: 'rgb(0,0,0)'
      },
      { 
        id: 16,
        title: 'Travel Plans - Spring Break',
        content: 'Booked flight to Miami on March 15th. Hotel reservations at the Riviera for March 15-20th. Rent a car for the duration of the stay. Activities planned: visit South Beach, Little Havana, and Everglades National Park.',
        created: '2023-01-16T11:41:48.439Z',
        bg: 'rgba(136,242,166,0.7)',
        fc: 'rgb(0,0,0)'
      },
    ];
    
    return {notes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 11;
  }
}