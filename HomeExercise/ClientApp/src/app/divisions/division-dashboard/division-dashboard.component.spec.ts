import { CommonModule } from "@angular/common";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { DivisionsService } from "../divisions.service";
import { DivisionCardComponent } from "./division-card/division-card.component";

import { DivisionDashboardComponent } from "./division-dashboard.component";

describe("DivisionDashboardComponent", () => {
  let component: DivisionDashboardComponent;
  let fixture: ComponentFixture<DivisionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DivisionDashboardComponent, DivisionCardComponent],
      imports: [CommonModule, FormsModule, SharedModule],
      providers: [HttpHandler, HttpClient, DivisionsService],
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
});
