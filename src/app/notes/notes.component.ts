import { Component, Input, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  ongoingNotes: Note[] = [];
  archivedNotes: Note[] = [];
  isCollapsed = true;
 

  constructor(private notesService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notesService.getNotes()
      .subscribe(notes => {
        this.notes = notes;
        this.ongoingNotes = notes.filter(note => !note.archived);
        this.archivedNotes = notes.filter(note => note.archived);
      });
  }

  collapsibleBtnClicked() {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }
}
