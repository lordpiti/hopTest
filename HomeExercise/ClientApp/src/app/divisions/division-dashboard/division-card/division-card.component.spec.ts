import { CommonModule } from "@angular/common";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { DivisionsService } from "../../divisions.service";
import { DivisionItem } from "../../interfaces/divisionItem";

import { DivisionCardComponent } from "./division-card.component";

describe("DivisionCardComponent", () => {
  let component: DivisionCardComponent;
  let fixture: ComponentFixture<DivisionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DivisionCardComponent],
      imports: [CommonModule, FormsModule, SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionCardComponent);
    component = fixture.componentInstance;
    component.divisionCardData = {
      divisionId: 1,
      noesCount: 1,
      ayesCount: 1,
      title: "test",
    } as DivisionItem;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
