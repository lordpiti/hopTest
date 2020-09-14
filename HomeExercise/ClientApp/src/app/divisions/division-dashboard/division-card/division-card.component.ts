import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DivisionItem } from "../../interfaces/divisionItem";

@Component({
  selector: "app-division-card",
  templateUrl: "./division-card.component.html",
  styleUrls: ["./division-card.component.scss"],
})
export class DivisionCardComponent implements OnInit {
  @Input() divisionCardData: DivisionItem;
  @Output() saveNotes: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  saveNote() {
    this.saveNotes.emit({
      divisionId: this.divisionCardData.divisionId,
      notes: this.divisionCardData.note,
    });
  }
}
