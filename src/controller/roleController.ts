import { Request, Response } from 'express';
import RoleService from '../service/roleService';
import { createRoleSchema, updateRoleSchema } from '../validation/roleSchema';
import asyncHandler from 'express-async-handler';

class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  createRole = asyncHandler(async (req: Request, res: Response) => {
    const { userId, roleIds } = createRoleSchema.parse(req.body);
    const result = await this.roleService.createRole(userId, roleIds);

    if (!result) {
      res.status(400).json({ error: 'Failed to create role' });
      return;
    }
    res.status(200).json({ message: 'Role successfully created' });
    return;
  });

  updateRole = asyncHandler(async (req: Request, res: Response) => {
    const { userId, roleIds } = updateRoleSchema.parse(req.body);
    const result = await this.roleService.updateRole(userId, roleIds);

    if (!result) {
      res.status(400).json({ error: 'Failed to update role' });
      return;
    }
    res.status(200).json({ message: 'Role successfully updated' });
    return;
  });

  getRole = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await this.roleService.getRoles(Number(userId));
    console.log(result);

    if (!result) {
      res.status(400).json({ error: 'Failed to retrieve role' });
      return;
    }
    res.status(200).json({ roleIds: result, message: 'Role successfully updated' });
  });
}

export default RoleController;
