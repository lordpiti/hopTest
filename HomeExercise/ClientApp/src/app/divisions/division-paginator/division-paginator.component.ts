import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DivisionsService } from "../divisions.service";

@Component({
  selector: "app-division-paginator",
  templateUrl: "./division-paginator.component.html",
  styleUrls: ["./division-paginator.component.scss"],
})
export class DivisionPaginatorComponent implements OnInit {
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() itemsPerPageChange: EventEmitter<any> = new EventEmitter();
  @Input() currentPage: number;
  @Input() itemsPerPage: number;

  public pagesList: number[] = [];
  public itemsPerPageList = [10, 25];
  public numberOfItems = 0;

  constructor(public divisionsService: DivisionsService) {}

  ngOnInit() {
    this.createPaginator(
      this.divisionsService.getCurrentDivisions().numberOfItems,
      this.itemsPerPage
    );
    // // Needed as the division data can change and number of pages as well
    this.divisionsService.getCurrentDivisionData().subscribe(
      (data) => {
        this.createPaginator(data.numberOfItems, this.itemsPerPage);
      },
      (err: any) => {}
    );
  }

  OnChangePageNumber(pageNumber: number) {
    this.pageChange.emit(pageNumber);
  }

  OnChangeItemsPerPage(itemsPerPage: number) {
    this.itemsPerPageChange.emit(itemsPerPage);
  }

  getStartItemIndex() {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndItemIndex() {
    return this.currentPage * this.itemsPerPage > this.numberOfItems
      ? this.numberOfItems
      : this.currentPage * this.itemsPerPage;
  }

  private createPaginator(numberOfItems: number, itemsPerPage: number) {
    this.pagesList = [];
    this.numberOfItems = numberOfItems;
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
    for (var i = 1; i <= numberOfPages; i++) {
      this.pagesList.push(i);
    }
  }
}
