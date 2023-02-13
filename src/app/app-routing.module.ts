import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes/notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { ArchivedNotesComponent } from './archived-notes/archived-notes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', 
    redirectTo: '/overview', 
    pathMatch: 'full' },
  { path: 'overview',
    title: 'Overview',
    component: NotesComponent },
  { path: 'addNote',
    title: 'Add Note',
    component: AddNoteComponent },
  { 
    path: 'detail/:id',
    // title set in component
    component: NoteDetailComponent },
  { path: 'archive',
    title: 'Archived Notes', 
    component: ArchivedNotesComponent },
  { path: '**',
    pathMatch: 'full',
    title: 'Page Not Found',
    component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }