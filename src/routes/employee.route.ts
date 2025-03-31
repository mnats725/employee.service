import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeService } from '../services/employee.service';
import { EmployeeRepository } from '../repositories/employee.repository';

export const employeeRoutes = async (app: FastifyInstance) => {
  const employeeRepository = new EmployeeRepository();
  const employeeService = new EmployeeService(employeeRepository);
  const employeeController = new EmployeeController(employeeService);

  app.get(
    '/employees/:employeeId',
    async (request: FastifyRequest<{ Params: { employeeId: string } }>, reply: FastifyReply) => {
      return employeeController.getManagers(request, reply);
    }
  );
};
