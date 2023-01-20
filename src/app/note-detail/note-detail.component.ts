import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnChanges {
  note: Note | undefined;
  isDisabled: boolean = true;
  
  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onChanges: ',changes);
  }

  onTextChange(e: any) {
    console.log('text changed', e);
    this.isDisabled = false;
  }

  applyChanges(title: string, content: string): void {
    if(this.note) {
      this.note.title = title;
      this.note.content = content;
      console.log('changes applied');
    }
  }

  getNote(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.noteService.getNote(id)
      .subscribe(note => this.note = note);
  }

  saveNote(): void {
    if(this.note) {
      this.noteService.updateNote(this.note)
        .subscribe(() => this.goBack());
      console.log('changes saved')
      // disable save button
      this.isDisabled = true;
      console.log('button reset')
    }
  }

  deleteNote(): void {
    if(this.note) {
      this.noteService.deleteNote(String(this.note.id))
        .subscribe(() => this.goBack);
    }
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
