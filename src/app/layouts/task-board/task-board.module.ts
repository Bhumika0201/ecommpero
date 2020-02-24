import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskBoardComponent } from "./task-board.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule, SharedModule],
  declarations: [TaskBoardComponent]
})
export class TaskBoardModule { }
