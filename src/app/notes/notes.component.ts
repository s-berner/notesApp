import { Component, OnInit, Output } from '@angular/core';

import { DndDropEvent } from 'ngx-drag-drop';

import { NoteService } from '../note.service';
import { PriorityPipe } from '../priority.pipe';
import { Note } from '../note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Output() notes: Note[] = []; 
  groupByOptions = ['none', 'priority', 'Label']; // set the options for the group by dropdown
  groupSelected = this.groupByOptions[0]; // default to no grouping
  groups = new Map<string, Note[]>();
  isCollapsed: Record<string, boolean> = {};

  constructor(
    private notesService: NoteService,
    private priorityPipe: PriorityPipe,
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  /* Get all notes from the server and filters out archived notes */
  getNotes(): void {
    this.notesService.getNotes()
      .subscribe(notes => {
        this.notes = notes
          .filter(note => !note.archived)
          .sort((a, b) => a.position - b.position);
      });
  }

  /** Update All notes
   * TODO: Only update the notes that have changed
   */
  updateNotes(): void {
    this.notes.forEach(note => {
      this.notesService.updateNote(note)
        .subscribe();
    });
  }

  /**
   * handle the change event of the group by dropdown
   */
  onGroupSelectionChange(): void {
    switch(this.groupSelected) {
      case 'priority':
        this.groups = this.groupBy(this.notes, note => String(note.priority));
        break;
      case 'Label':
        this.groups = this.groupBy(this.notes, note => note.label || '');
        break;
      default:
        // no grouping
    }
  }

  /**
   * Groups an array of items by a key
   * @param array - The array to group
   * @param grouper - A function that returns the key for each item
   * @returns A map of keys to arrays of items
   */
  groupBy<V>(array: V[], grouper: (item: V) => string): Map<string, V[]> {
    return array.reduce((store, item) => {
        let key = grouper(item);
        if (store.has(key)) {
            store.get(key)?.push(item);
        } else {
            store.set(key, [item]);
        }
        return store;
    }, new Map<string, V[]>());
  }

  /**
   * Handles the click event of the group header
   * @param key - The key of the group to collapse/expand
   */
  onGroupHeaderClick(key: string): void {
    if (this.isCollapsed.hasOwnProperty(key)) {       // if the key exists 
      this.isCollapsed[key] = !this.isCollapsed[key]; // switch the value
    } else {                                          // if the key doesn't exist
      this.isCollapsed[key] = true;                   // set the value to true (collapsed)
    }
  }

  onDragStart(event: DragEvent): void {
    console.log('drag', JSON.stringify(event, null, 2));
  }

  onDragMoved(event: DragEvent): void {
    console.log('drag moved', JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent): void {
    console.log('drag ended', JSON.stringify(event, null, 2));
  }

  /**
   * Handles the drop event of the dropzone
   * and updates the notes on the server
   * @param event - The drop event
   * @param list - The list of Notes to update the position
   */
  onDrop(event: DndDropEvent, list: Note[]): void {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {
      // remove the item from the previous position
      let prevIndex = -1;
      this.notes.forEach((item, index) => {
        if (item.id === event.data.id) {
          prevIndex = index;
        }
      });
      console.log('prevIndex', prevIndex)
      this.notes.splice(prevIndex, 1);

      // get the new position
      let newIndex = event.index;
      console.log('newIndex', newIndex)

      // if the item is dropped outside of dropzone
      if (typeof newIndex === "undefined") {
        console.log('dropped outside dropzone')
        newIndex = list.length;
      }

      // insert the item into the new position
      list.splice(newIndex, 0, event.data);

      // update the positions of the notes
      this.notes.forEach((note, index) => {
        note.position = index;
      });

      // update the notes on the server
      this.updateNotes();
    }
  }

  /* based on group selected return title for header */
  selectGroupTitle(key: string, groupedBy: string): string {
    switch(groupedBy) {
      case 'priority':
        return this.priorityPipe.transform(key);
      case 'Label':
        return key;
      default:
        return 'error';
    }
  }
}