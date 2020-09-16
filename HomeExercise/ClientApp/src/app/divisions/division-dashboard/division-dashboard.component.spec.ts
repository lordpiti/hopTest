import { CommonModule } from "@angular/common";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { DivisionPaginatorComponent } from "../division-paginator/division-paginator.component";
import { DivisionsService } from "../divisions.service";
import { DivisionData } from "../interfaces/division";
import { NotesInfo } from "../interfaces/notesInfo";
import { DivisionCardComponent } from "./division-card/division-card.component";

import { DivisionDashboardComponent } from "./division-dashboard.component";

describe("DivisionDashboardComponent", () => {
  let component: DivisionDashboardComponent;
  let fixture: ComponentFixture<DivisionDashboardComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy("navigate"),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DivisionDashboardComponent,
        DivisionCardComponent,
        DivisionPaginatorComponent,
      ],
      imports: [CommonModule, FormsModule, SharedModule],
      providers: [
        HttpHandler,
        HttpClient,
        DivisionsService,
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onSaveNotes", () => {
    it("should call the division service to update the notes", () => {
      const divisionData = {
        divisionItems: [{ divisionId: 1 }],
        numberOfItems: 100,
      } as DivisionData;

      const expectedDivisionData = {
        divisionItems: [{ divisionId: 1, note: "test2" }],
        numberOfItems: 100,
      } as DivisionData;

      const dataToSave = { divisionId: 1, notes: "test2" } as NotesInfo;

      spyOn(
        component.divisionsService,
        "saveDivisionNotesData"
      ).and.returnValue(of({}));
      spyOn(component.divisionsService, "setCurrentDivisionData");
      spyOn(component.divisionsService, "getCurrentDivisions").and.returnValue(
        divisionData
      );

      component.onSaveNotes(dataToSave);
      expect(
        component.divisionsService.saveDivisionNotesData
      ).toHaveBeenCalledWith(dataToSave);

      expect(
        component.divisionsService.setCurrentDivisionData
      ).toHaveBeenCalledWith(expectedDivisionData);
    });
  });

  describe("OnChangePageNumber", () => {
    it("should call the service to get data and set it properly afterwards", () => {
      const divisionData = {
        divisionItems: [{ divisionId: 1 }],
        numberOfItems: 100,
      } as DivisionData;

      spyOn(component.divisionsService, "getDivisionData").and.returnValue(
        of(divisionData)
      );

      spyOn(component.divisionsService, "setCurrentDivisionData");

      component.OnChangePageNumber(5);

      expect(component.currentPage).toEqual(5);
      expect(
        component.divisionsService.setCurrentDivisionData
      ).toHaveBeenCalledWith(divisionData);
    });
  });

  describe("OnChangeItemsPerPage", () => {
    it("should call the service to get data and set it properly afterwards", () => {
      const divisionData = {
        divisionItems: [{ divisionId: 1 }],
        numberOfItems: 100,
      } as DivisionData;

      spyOn(component.divisionsService, "getDivisionData").and.returnValue(
        of(divisionData)
      );

      spyOn(component.divisionsService, "getCurrentDivisions").and.returnValue(
        divisionData
      );

      spyOn(component.divisionsService, "setCurrentDivisionData");

      component.OnChangeItemsPerPage(25);

      expect(component.itemsPerPage).toEqual(25);
      expect(
        component.divisionsService.setCurrentDivisionData
      ).toHaveBeenCalledWith(divisionData);
    });
  });
});
