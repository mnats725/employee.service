import { Employee } from '../types/employee.types';

interface EmployeeRepository {
  getAllEmployees(): Employee[];
  getEmployeeById(employeeId: number): Employee | undefined;
}

export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public getManagers = async (employeeId: number): Promise<number[]> => {
    const employees = this.employeeRepository.getAllEmployees();

    return this.findManagers(employees, employeeId);
  };

  public getAllEmployees = (): Employee[] => {
    return this.employeeRepository.getAllEmployees();
  };

  public getEmployeeById = (employeeId: number): Employee | undefined => {
    return this.employeeRepository.getEmployeeById(employeeId);
  };

  private findManagers = (employees: Employee[], employeeId: number): number[] => {
    const employee = employees.find((emp) => emp.employeeId === employeeId);

    if (!employee) return [];

    if (employee.employeeId === employee.managerId) return [employeeId];

    const result: number[] = [];
    const visited = new Set<number>();
    let currentId = employeeId;

    while (true) {
      const emp = employees.find((e) => e.employeeId === currentId);

      if (!emp || visited.has(currentId)) break;

      visited.add(currentId);

      if (emp.managerId === currentId) {
        if (currentId === employeeId) return [currentId];
        break;
      }

      result.push(emp.managerId);
      currentId = emp.managerId;
    }

    if (result.length === 0) return [employeeId];

    return result;
  };
}
