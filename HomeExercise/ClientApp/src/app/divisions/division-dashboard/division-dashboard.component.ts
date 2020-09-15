import { Component, OnInit } from "@angular/core";
import { DivisionsService } from "../divisions.service";
import { DivisionData } from "../interfaces/division";
import { NotesInfo } from "../interfaces/notesInfo";

@Component({
  selector: "app-division-dashboard",
  templateUrl: "./division-dashboard.component.html",
  styleUrls: ["./division-dashboard.component.scss"],
})
export class DivisionDashboardComponent implements OnInit {
  public divisionData: DivisionData;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  constructor(private divisionsService: DivisionsService) {}

  ngOnInit() {
    this.divisionsService.getCurrentDivisionData().subscribe(
      (data) => {
        this.divisionData = data;
      },
      (err: any) => {}
    );

    this.divisionsService
      .getDivisionData(this.currentPage, this.itemsPerPage)
      .subscribe((data) => {
        this.divisionsService.setCurrentDivisionData(data);
      });
  }

  onSaveNotes(data: NotesInfo) {
    this.divisionsService
      .saveDivisionNotesData({ divisionId: data.divisionId, notes: data.notes })
      .subscribe(() => {
        const itemToUpdate = this.divisionData.divisionItems.find(
          (x) => x.divisionId === data.divisionId
        );
        itemToUpdate.note = data.notes;
        this.divisionsService.setCurrentDivisionData(this.divisionData);
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
