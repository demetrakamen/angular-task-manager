import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreateTaskComponent } from './create-task/create-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SharedModule } from '../shared/shared.module';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    TaskComponent,
    TasksListComponent,
    CreateTaskComponent,
    EditTaskComponent,

  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule, 
    SharedModule
  ],
  exports: [TaskComponent, TasksListComponent, EditTaskComponent, CreateTaskComponent]
})
export class FeaturesModule { }
