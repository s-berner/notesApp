import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Note | undefined;
  
  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  applyChanges(title: string, content: string): void {
    if(this.note) {
      this.note.title = title;
      this.note.content = content;
    }
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.noteService.getNote(id)
      .subscribe(note => this.note = note);
  }

  updateNote(): void {
    if(this.note) {
      this.noteService.updateNote(this.note)
        .subscribe(() => this.goBack());
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
