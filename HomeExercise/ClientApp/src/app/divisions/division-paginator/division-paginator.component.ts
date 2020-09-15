import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DivisionsService } from "../divisions.service";

@Component({
  selector: "app-division-paginator",
  templateUrl: "./division-paginator.component.html",
  styleUrls: ["./division-paginator.component.scss"],
})
export class DivisionPaginatorComponent implements OnInit {
  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  public pagesList: number[] = [];

  constructor(public divisionsService: DivisionsService) {}

  ngOnInit() {
    this.createPaginator(
      this.divisionsService.getCurrentDivisions().numberOfItems
    );
    // // Needed as the division data can change and number of pages as well
    this.divisionsService.getCurrentDivisionData().subscribe(
      (data) => {
        this.createPaginator(data.numberOfItems);
      },
      (err: any) => {}
    );
  }

  OnChangePageNumber(pageNumber: number) {
    this.pageChange.emit(pageNumber);
  }

  private createPaginator(numberOfItems: number) {
    this.pagesList = [];
    for (var i = 1; i < numberOfItems / 20; i++) {
      this.pagesList.push(i);
    }
  }
}
