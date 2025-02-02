import UserService from '../service/userService';
import { Request, Response } from 'express';
import { createUserSchema, emailSchema } from '../validation/userSchema';
import asyncHandler from 'express-async-handler';
class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  userByEmail = asyncHandler(async (req: Request, res: Response) => {
    const email = emailSchema.parse(req.query.email);
    const user = await this.userService.getUserByEmail(email);
    console.log(user);
    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
    return;
  });

  userById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(Number(id));
    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    }
    res.status(201).json(user);
  });

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = createUserSchema.parse(req.body);
    //check username & email does not exist
    const emailExists = await this.userService.getUserByEmail(user.email);
    const userNameExists = await this.userService.getByUsername(user.username);
    if (!emailExists && !userNameExists) {
      const { id } = await this.userService.createUser(user);
    } else {
      res.status(400).json({ error: 'Failed to create user' });
      return;
    }

    res.status(201).json({ message: 'User successfully created' });
  });
}

export default UserController;
