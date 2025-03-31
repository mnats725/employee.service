import { EmployeeService } from '../services/employee.service';

import type { Employee } from '../types/employee.types';

describe('findManagers', () => {
  const employees: Employee[] = [
    { employeeId: 11, name: 'John', managerId: 11 },
    { employeeId: 50, name: 'Todd', managerId: 73 },
    { employeeId: 150, name: 'Alex', managerId: 200 },
    { employeeId: 73, name: 'Sara', managerId: 11 },
    { employeeId: 200, name: 'Alex', managerId: 50 },
    { employeeId: 100, name: 'Alex', managerId: 150 },
  ];

  let employeeService: EmployeeService;

  beforeEach(() => {
    const employeeRepository = {
      getAllEmployees: () => employees,
      getEmployeeById: (employeeId: number) =>
        employees.find((emp) => emp.employeeId === employeeId),
    };

    employeeService = new EmployeeService(employeeRepository);
  });

  test('Возвращает правильных менеджеров для сотрудника с несколькими уровнями', () => {
    const managers = employeeService['findManagers'](employees, 200);

    expect(managers).toEqual([50, 73, 11]);
  });

  test('Возвращает только самого себя, если сотрудник является своим собственным менеджером', () => {
    const managers = employeeService['findManagers'](employees, 11);
    expect(managers).toEqual([11]);
  });

  test('Возвращает пустой массив, если сотрудник не найден', () => {
    const managers = employeeService['findManagers'](employees, 420);
    expect(managers).toEqual([]);
  });
});
