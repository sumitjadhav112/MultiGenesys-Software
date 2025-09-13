import { Routes } from '@angular/router';
import { EmployeeListComponent } from './feature/components/employee-list/employee-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employeeList', pathMatch: 'full' },
  { path: 'employeeList', component: EmployeeListComponent }
];
