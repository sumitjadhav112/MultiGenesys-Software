import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private countriesUrl = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country';
  private employeesUrl = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeesUrl}/${id}`);
  }

  createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.employeesUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.employeesUrl}/${id}`);
  }
}