import { Component, Input, OnInit} from '@angular/core';
import { Note } from '../note';
import { Priority } from '../priority';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  @Input() note!: Note; // supplied from parent
  emoji: string = ''; // Emoji to display for priority ⚠️ = Medium, 🛑 = High

  ngOnInit(): void {
    this.emoji = this.setEmoji();
  }

  /** 
   * Set Emoji based on priority
   * @returns {string} Emoji to display
   */
  setEmoji(): string {
    console.log('priority: ', this.note.priority, typeof this.note.priority);
    switch (this.
      note.priority) {
      case Priority.Medium:
        console.log('medium');
        return '⚠️';
      case Priority.High:
        console.log('high');
        return '🛑';
      default:
        console.log('unselected or low')
        return '';
    }
  }
}
