import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-division-paginator",
  templateUrl: "./division-paginator.component.html",
  styleUrls: ["./division-paginator.component.scss"],
})
export class DivisionPaginatorComponent implements OnInit, OnChanges {
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() itemsPerPageChange: EventEmitter<number> = new EventEmitter();
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() numberOfItems: number;

  public pagesList: number[] = [];
  public itemsPerPageList = [10, 25];
  constructor() {}

  ngOnInit() {
    this.createPaginator(this.numberOfItems, this.itemsPerPage);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.createPaginator(this.numberOfItems, this.itemsPerPage);
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
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
    for (var i = 1; i <= numberOfPages; i++) {
      this.pagesList.push(i);
    }
  }
}
