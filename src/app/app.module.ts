import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { ColorPickerModule } from 'ngx-color-picker';

import { DndModule } from 'ngx-drag-drop';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { AppRoutingModule } from './app-routing.module';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { ArchivedNotesComponent } from './archived-notes/archived-notes.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PriorityPipe } from './priority.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    AddNoteComponent,
    NoteDetailComponent,
    ArchivedNotesComponent,
    NoteCardComponent,
    PageNotFoundComponent,
    PriorityPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule,
    ColorPickerModule,
    FormsModule,
    DndModule,
  ],
  providers: [PriorityPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
