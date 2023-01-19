import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { NoteService } from '../note.service';
import { Note } from '../note';
import { RgbColor } from '../color';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  notes: Note[] = [];
  color = 'rgb(91,104,201)'; // default color
  
  constructor(
    private noteService: NoteService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }
  
  goBack(): void {
    this.location.back();
  }

  addNote(title: string, content: string, bg: string): void {
    title = title.trim();
    content = content.trim();
    bg = bg.trim();

    const submitIsEmpty = !title && !content;
    if (submitIsEmpty) {
      return;
    }

    // determine font color
    const fc = new RgbColor(bg).readableFontColor();

    // set created time
    const created = new Date().toJSON();

    // add to db
    this.noteService.addNote({ title, content, created, bg, fc } as Note)
      .subscribe(note => {
        this.notes.push(note)
      });

    // after adding the note go back to the overview
    this.goBack();
  }
}
