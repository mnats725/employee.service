import { Employee } from '../types/employee.types';

export class EmployeeRepository {
  private employees: Employee[] = [
    //типа с базы беру :D
    { employeeId: 11, name: 'John', managerId: 11 },
    { employeeId: 50, name: 'Todd', managerId: 73 },
    { employeeId: 150, name: 'Alex', managerId: 200 },
    { employeeId: 73, name: 'Sara', managerId: 11 },
    { employeeId: 200, name: 'Alex', managerId: 50 },
    { employeeId: 100, name: 'Alex', managerId: 150 },
  ];

  public getAllEmployees = (): Employee[] => this.employees;

  public getEmployeeById = (employeeId: number): Employee | undefined =>
    this.employees.find((employee) => employee.employeeId === employeeId);
}
