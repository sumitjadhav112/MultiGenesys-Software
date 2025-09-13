import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Employee } from '../../../core/models/Employee';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,          
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzSpinModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule, 
    NzEmptyModule,
    NzIconModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = [];
  countries: string[] = [];
  isLoading = true;
  isModalVisible = false;
  isEditMode = false;
  selectedEmployee: Employee | null = null;
  searchValue = '';
  
  employeeForm: FormGroup;

  constructor(
    private empService: EmployeeService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      position: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state:['',[Validators.required]],
      district:['',[Validators.required]],
      department:['',[Validators.required]]

    });
  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.loadCountries();
  }

  getAllEmployees(): void {
    this.isLoading = true;
    this.empService.getAll().subscribe({
      next: (data: Employee[]) => {
        console.log('employee data :', data);
        this.employeeList = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.message.error('Failed to load employees');
        this.isLoading = false;
      }
    });
  }

  loadCountries(): void {
    this.empService.getCountries().subscribe({
      next: (data: any) => {
        this.countries = data.map((item: any) => item.country);
        console.log('country data', this.countries);
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
        this.message.error('Failed to load countries');
      }
    });
  }

  showAddModal(): void {
    this.isEditMode = false;
    this.selectedEmployee = null;
    this.employeeForm.reset();
    this.isModalVisible = true;
  }

  showEditModal(employee: Employee): void {
    this.isEditMode = true;
    this.selectedEmployee = employee;
    this.employeeForm.patchValue({
      name: employee.name,
      emailId: employee.emailId, 
      position: employee.position,
      country: employee.country,
      state:employee.state,
      district:employee.district,
      department:employee.department
    });
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.employeeForm.reset();
  }

  handleOk(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      console.log(this.employeeForm.value.state);
      console.log(this.employeeForm.value.district);

      
      
      if (this.isEditMode && this.selectedEmployee) {
        this.empService.update(this.selectedEmployee.id, formData).subscribe({
          next: () => {
            this.message.success('Employee updated successfully');
            this.getAllEmployees();
            this.isModalVisible = false;
          },
          error: (error) => {
            console.error('Error updating employee:', error);
            this.message.error('Failed to update employee');
          }
        });
      } else {
        this.empService.create(formData).subscribe({
          next: () => {
            this.message.success('Employee added successfully');
            this.getAllEmployees();
            this.isModalVisible = false;
          },
          error: (error) => {
            console.error('Error adding employee:', error);
            this.message.error('Failed to add employee');
          }
        });
      }
    } else {
      Object.values(this.employeeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this employee?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteEmployee(id),
      nzCancelText: 'No'
    });
  }

  deleteEmployee(id: string): void {
    this.empService.delete(id).subscribe({
      next: () => {
        this.message.success('Employee deleted successfully');
        this.getAllEmployees();
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.message.error('Failed to delete employee');
      }
    });
  }

  get filteredEmployees(): Employee[] {
    if (!this.searchValue) {
      return this.employeeList;
    }
    return this.employeeList.filter(employee => 
      employee.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employee.emailId.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      (employee.position && employee.position.toLowerCase().includes(this.searchValue.toLowerCase()))
    );
  }
}