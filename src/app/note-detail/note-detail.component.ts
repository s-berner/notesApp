import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TitleService } from '../title.service';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { Priority } from '../priority';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Note | undefined; // undefined if the note cannot be found
  saveBtnDisabled: boolean = true; // disable the save button by default
  readonly priorities = ['low', 'medium', 'high']; // for the select element
  
  constructor(
    private noteService: NoteService, // inject the note service to get the note from the server
    private titleService: TitleService, // inject the title service to set the title
    private route: ActivatedRoute, // inject the route to get the id of the note from the url
    private router: Router, // inject the router to navigate to the archived notes page
    private location: Location // inject the location to go back to the previous page
  ) { }

  ngOnInit(): void {
    this.getNote();
  }

  /* get the note from the server */
  getNote(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.noteService.getNote(id)
      .subscribe(note => {
        this.note = note;
        this.setTitle(this.note?.title || 'note not found');
    });
  }

  /* Set the Tab Title */
  setTitle(newTitle: string): void {
    console.log('setting title to ' + newTitle);
    this.titleService.setTitle(newTitle);
  }

  /**
   * If changes detected enable the save button
   * TODO: check if the changes are actually different from the original note
   */
  onChangesReceived(): void {
    this.saveBtnDisabled = false; // enable the save button when changes are made
  }

  /* saves the changes made to the note */
  onSaveClicked(): void {
    if(this.note) {
      this.noteService.updateNote(this.note)
        .subscribe(() => this.onBackClicked());
      this.saveBtnDisabled = true; // disable the save button
    }
  }

  /* changes the archived property of the note to 'true' */
  onArchiveClicked(): void {
    if(this.note) {
      this.note.archived = true; // archive the note
      this.note.priority = Priority.Unselected;
      this.noteService.updateNote(this.note)
        .subscribe(() => this.router.navigate(['/archive']));
      console.log('note with id ' + this.note.id + ' archived');
    }
  }

  /** 
   * changes the archived property of the note to 'false', 
   * saves the changes and navigates to the overview page
   */
  onUnarchiveClicked(): void {
    if(this.note) {
      this.note.archived = false; // unarchive the note
      this.noteService.updateNote(this.note)
        .subscribe(() => this.router.navigate(['/overview']));
      console.log('note with id ' + this.note.id + ' unarchived');
    }
  }

  /** 
   * delete the current note from the server
   * and go back to the previous location
   */
  deleteNote(): void {
    if(this.note) {
      this.noteService.deleteNote(String(this.note.id))
        .subscribe(() => this.onBackClicked());
    }
  }

  /* goes back to the previous location */
  onBackClicked(): void {
    this.location.back();
  }
}