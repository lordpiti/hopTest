import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DivisionsService } from "../divisions.service";
import { DivisionData } from "../interfaces/division";
import { NotesInfo } from "../interfaces/notesInfo";

@Component({
  selector: "app-division-dashboard",
  templateUrl: "./division-dashboard.component.html",
  styleUrls: ["./division-dashboard.component.scss"],
})
export class DivisionDashboardComponent implements OnInit {
  public divisionData$: Observable<DivisionData>;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  constructor(private divisionsService: DivisionsService) {}

  ngOnInit() {
    this.divisionsService
      .getDivisionData(this.currentPage, this.itemsPerPage)
      .subscribe((data) => {
        this.divisionsService.setCurrentDivisionData(data);
      });

    this.divisionData$ = this.divisionsService.getCurrentDivisionData();
  }

  onSaveNotes(data: NotesInfo) {
    this.divisionsService
      .saveDivisionNotesData({ divisionId: data.divisionId, notes: data.notes })
      .subscribe(() => {
        const currentData = this.divisionsService.getCurrentDivisions();
        const itemToUpdate = currentData.divisionItems.find(
          (x) => x.divisionId === data.divisionId
        );
        itemToUpdate.note = data.notes;
        this.divisionsService.setCurrentDivisionData(currentData);
      });
  }

  OnChangePageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.divisionsService
      .getDivisionData(pageNumber, this.itemsPerPage)
      .subscribe((data) => {
        this.divisionsService.setCurrentDivisionData(data);
      });
  }

  OnChangeItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    const numberOfPages = Math.ceil(
      this.divisionsService.getCurrentDivisions().numberOfItems / itemsPerPage
    );
    if (this.currentPage > numberOfPages) {
      this.currentPage = numberOfPages;
    }
    this.divisionsService
      .getDivisionData(this.currentPage, itemsPerPage)
      .subscribe((data) => {
        this.divisionsService.setCurrentDivisionData(data);
      });
  }
}
