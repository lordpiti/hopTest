import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DivisionDashboardComponent } from "./division-dashboard/division-dashboard.component";
import { DivisionCardComponent } from "./division-dashboard/division-card/division-card.component";
import { RouterModule, Routes } from "@angular/router";
import { DivisionsService } from "./divisions.service";
import { FormsModule } from "@angular/forms";

const divisionRoutes: Routes = [
  { path: "", component: DivisionDashboardComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(divisionRoutes), FormsModule],
  declarations: [DivisionDashboardComponent, DivisionCardComponent],
  providers: [DivisionsService],
})
export class DivisionsModule {}
