import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes/notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { ArchivedNotesComponent } from './archived-notes/archived-notes.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: NotesComponent },
  { path: 'addNote', component: AddNoteComponent },
  { path: 'detail/:id', component: NoteDetailComponent },
  { path: 'archive', component: ArchivedNotesComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }