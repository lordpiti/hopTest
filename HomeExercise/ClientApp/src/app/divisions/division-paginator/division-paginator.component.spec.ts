import { CommonModule } from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DivisionPaginatorComponent } from "./division-paginator.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { ElementRef } from "@angular/core";

describe("DivisionPaginatorComponent", () => {
  let component: DivisionPaginatorComponent;
  let fixture: ComponentFixture<DivisionPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DivisionPaginatorComponent],
      imports: [CommonModule, FormsModule, SharedModule],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionPaginatorComponent);
    component = fixture.componentInstance;
    component.currentPage = 2;
    component.itemsPerPage = 10;
    component.numberOfItems = 100;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("getStartItemIndex", () => {
    it("should return the first item to be displayed in the current page", () => {
      const startItemIndex = component.getStartItemIndex();
      expect(startItemIndex).toEqual(11);
    });
  });

  describe("getEndItemIndex", () => {
    it("should return the last item to be displayed in the current page", () => {
      const endItemIndex = component.getEndItemIndex();
      expect(endItemIndex).toEqual(20);
    });
  });

  describe("OnChangePageNumber", () => {
    it("should emit when an item in the paginator is clicked", () => {
      spyOn(component.pageChange, "emit");
      component.OnChangePageNumber(5);
      expect(component.pageChange.emit).toHaveBeenCalledWith(5);
    });
  });

  describe("OnChangeItemsPerPage", () => {
    it("should emit when changing the number of items per page to be displayed", () => {
      spyOn(component.itemsPerPageChange, "emit");
      component.OnChangeItemsPerPage(25);
      expect(component.itemsPerPageChange.emit).toHaveBeenCalledWith(25);
    });
  });
});
