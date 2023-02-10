import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { NoteService } from '../note.service';
import { LabelService } from '../label.service';
import { Note } from '../note';
import { RgbColor } from '../color';
import { ColorData } from '../colorData';
import { Priority } from '../priority';
import { Label } from '../label';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  notes: Note[] = [];
  labels: Label[] = [];
  color = 'rgb(91,104,201)'; // set default color for the color picker
  readonly priorities = ['low', 'medium', 'high']; // for the select element
  title = '';
  label: string | undefined = '0';
  content = '';
  bgColor = '';
  created = ''; // will be set in addNote()
  priority = Priority.Unselected; // default value 0 = unselected 1 = low 2 = medium 3 = high

  
  constructor(
    private noteService: NoteService, // inject note service to get all notes and add a new note
    private labelService: LabelService, // inject label service to get all labels and add a new label
    private location: Location, // inject location service to go back to the previous page
  ) { }

  ngOnInit(): void {
    this.getNotes();
    this.getLabels();
  }

  /* Get all notes from the server */
  getNotes(): void {
    this.noteService.getNotes() 
      .subscribe(notes => this.notes = notes);
  }

  /* Get all labels from the server */
  getLabels(): void {
    this.labelService.getLabels()
      .subscribe(labels => this.labels = labels);
  }
    
  /* Go back to the previous page */
  onBackClicked(): void {
    this.location.back();
  }

  /* Add a new note */
  onCreateClicked(): void {
    const title = this.title.trim(); 
    const content = this.content.trim();
    const backgrColor = this.color.trim();
    const priority = this.priority > Priority.Unselected ? this.priority : Priority.Low; // if priority is 0, set it to 1 (low)

    const submitIsEmpty = !title && !content; 
    if (submitIsEmpty) {  // if both title and content are empty, do nothing
      return;
    }

    // get readable font color
    const fontColor = new RgbColor(backgrColor).readableFontColor();

    // get current date
    const created = new Date().toJSON();

    // create colorData object
    const colorData: ColorData = {
      bg: backgrColor,
      fc: fontColor,
    }

    const archived = false;

    // set label to undefined if it is 0
    const label = this.label != '0' ? this.label : undefined;

    // add the note to the server
    this.noteService.addNote({ title, content, created, colorData, archived, priority, label} as Note)
      .subscribe(note => {
        this.notes.push(note)
      });

    // go back to the previous page after adding a new note
    this.location.back();
  }
}
