import { Component, OnInit } from '@angular/core';

import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-archived-notes',
  templateUrl: './archived-notes.component.html',
  styleUrls: ['./archived-notes.component.css']
})
export class ArchivedNotesComponent implements OnInit {
  archivedNotes: Note[] = []; // array to store the archived notes
  archiveIsEmpty!: boolean; // flag to check if there are any archived notes
  msg: string = 'No archived notes found'; // message to display when there are no archived notes

  constructor(
    private notesService: NoteService // inject the NoteService
  ) { }

  ngOnInit(): void { 
    this.getArchivedNotes();
  }

  /** Get all notes from server and filter for archived ones */
  getArchivedNotes(): void {
    this.notesService.getNotes()
      .subscribe(notes => {
        this.archivedNotes = notes.filter(note => note.archived); // filter the notes to get only the archived ones
      });
  }
}
