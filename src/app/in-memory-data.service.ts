import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from './note';
import { Priority } from './priority';
import { Label } from './label';

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
        colorData: {
          bg: 'rgb(235,64,52)',
          fc: 'rgb(255,255,255)'
        },
        archived: false,
        priority: Priority.Medium,
        position: 1,
        label: 'Work',
      },
      {
        id: 13,
        title: 'Grocery List',
        content: 'not-milk, bread, french fries, like-chicken, green beans, apples, toothpaste', 
        created: '2023-01-16T11:41:48.439Z',
        colorData: {
          bg: 'rgb(81,128,32)',
          fc: 'rgb(255,255,255)' 
        },
        archived: false,
        priority: Priority.High,
        position: 0,
        label: 'Shopping',
      },
      {
        id: 17,
        title: 'Cat Vaccinations',
        content: 'Feb, 17th 10:30 AM', 
        created: '2023-01-16T11:41:48.439Z',
        colorData: {
          bg: 'rgba(196,141,204,0.62)',
          fc: 'rgb(255,255,255)' 
        },
        archived: false,
        priority: Priority.Low,
        position: 5,
        label: 'Personal',
      },
      {
        id: 17,
        title: 'Emojis 💕',
        content: '🐮 - Cow, 🐷 - Pig, 🐔 - Chicken, 🐰 - Rabbit',
        created: '2022-01-16T11:41:48.439Z',
        colorData: {
          bg: 'rgba(204, 83, 61)',
          fc: 'rgb(255,255,255)'
        },
        archived: true,
        priority: Priority.Unselected,
        position: 2,
      },
      {
        id: 18,
        title: 'Plant-Based Meal Ideas',
        content: 'Breakfast: Smoothie with almond milk, frozen berries, and banana Lunch: Chickpea salad with veggies, avocado, and a vinaigrette dressing Dinner: Grilled vegetables with quinoa and a tahini sauce',
        created: '2022-01-16T11:41:48.439Z',
        colorData: {
          bg: 'rgba(204, 83, 61)',
          fc: 'rgb(255,255,255)'
        },
        archived: true,
        priority: Priority.Unselected,
        position: 3,
      },
      {
        id: 19,
        title: 'Eating Out on a Plant-Based Diet',
        content: 'When eating out, look for restaurants that offer plant-based options on their menu. If a restaurant does not have many options, consider ordering a vegetarian dish and asking for it to be made without dairy or eggs. Some popular fast food chains now offer plant-based burgers and sandwiches, so look for those options when on-the-go. When in doubt, a salad with plenty of veggies and a vinaigrette dressing can always be a safe option',
        created: '2022-01-16T11:41:48.439Z',
        colorData: {
          bg: 'rgba(204, 83, 61)',
          fc: 'rgb(255,255,255)'
        },
        archived: true,
        priority: Priority.Unselected,
        position: 4,
      },
    ];
    const labels: Label[] = [
      {id: 1, name: 'Work'},
      {id: 2, name: 'Personal'},
      {id: 3, name: 'Home'},
      {id: 4, name: 'School'},
      {id: 5, name: 'Shopping'},
      {id: 6, name: 'Travel'},
      {id: 7, name: 'Health'},
      {id: 8, name: 'Finance'},
      {id: 9, name: 'Other'}
    ];
    
    return {notes, labels};
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