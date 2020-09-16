import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { DivisionItem } from "../../interfaces/divisionItem";
import { NotesInfo } from "../../interfaces/notesInfo";

@Component({
  selector: "app-division-card",
  templateUrl: "./division-card.component.html",
  styleUrls: ["./division-card.component.scss"],
})
export class DivisionCardComponent implements OnInit {
  @Input() divisionCardData: DivisionItem;
  @Output() saveNotes: EventEmitter<NotesInfo> = new EventEmitter();

  public note: string;

  constructor() {}

  ngOnInit() {
    this.note = this.divisionCardData.note;
  }

  saveNote() {
    this.saveNotes.emit({
      divisionId: this.divisionCardData.divisionId,
      notes: this.note,
    });
  }
}
