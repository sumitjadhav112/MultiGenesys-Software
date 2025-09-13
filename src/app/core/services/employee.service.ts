import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';

const BASE = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${BASE}/employee`);
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${BASE}/employee/${id}`);
  }

  create(emp: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(`${BASE}/employee`, emp);
  }

  update(id: string, emp: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${BASE}/employee/${id}`, emp);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE}/employee/${id}`);
  }

  // countries (simple)
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country`);
  }

}