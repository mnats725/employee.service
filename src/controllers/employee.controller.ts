import { FastifyReply, FastifyRequest } from 'fastify';

interface EmployeeService {
  getManagers(employeeId: number): Promise<number[]>;
}

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  public getManagers = async (
    request: FastifyRequest<{ Params: { employeeId: string } }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { employeeId } = request.params;
    const employeeIdNumber = parseInt(employeeId, 10);

    if (isNaN(employeeIdNumber)) {
      reply.status(400);
      throw new Error('invalid employee id');
    }

    const managers = await this.employeeService.getManagers(employeeIdNumber);

    return reply.send({ managers });
  };
}
