import { EntityState } from '@ngrx/entity';
import { Employee } from './Employee';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedEmployee: Employee | null;
}

export interface AppState {
  employees: EmployeeState;
}