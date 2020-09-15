import { Component, OnInit } from "@angular/core";
import { DivisionsService } from "../divisions.service";
import { DivisionData } from "../interfaces/division";

@Component({
  selector: "app-division-dashboard",
  templateUrl: "./division-dashboard.component.html",
  styleUrls: ["./division-dashboard.component.scss"],
})
export class DivisionDashboardComponent implements OnInit {
  public divisionData: DivisionData;

  constructor(private divisionsService: DivisionsService) {}

  ngOnInit() {
    this.divisionsService.getCurrentDivisionData().subscribe(
      (data) => {
        this.divisionData = data;
      },
      (err: any) => {}
    );

    this.divisionsService.getDivisionData().subscribe((data) => {
      this.divisionsService.setCurrentDivisionData(data);
    });

    // this.divisionsService.getCurrentPage().subscribe(
    //   (data) => {
    //     this.pageNumber = data;
    //   },
    //   (err: any) => {}
    // );
  }

  onSaveNotes(haha: any) {
    this.divisionsService
      .saveDivisionNotesData({ divisionId: haha.divisionId, notes: haha.notes })
      .subscribe((data) => {
        this.divisionsService.setCurrentDivisionData(this.divisionData);
      });
  }

  OnChangePageNumber(pageNumber: number) {
    // this.divisionsService.setCurrentPage(pageNumber);
    this.divisionsService.getDivisionData(pageNumber, 20).subscribe((data) => {
      this.divisionsService.setCurrentDivisionData(data);
    });
  }
}
