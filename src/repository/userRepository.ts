import db from '../database/db';
import { User } from '../model/userModel';

class UserRepository {
  async findByEmail(email: string): Promise<User> {
    return await db('users').where('email', email).first().select('id', 'username', 'email');
  }

  async findById(id: number): Promise<User> {
    return await db('users').where('id', id).first().select('id', 'username', 'email');
  }

  async findByUsername(username: string): Promise<User> {
    return await db('users').where('username', username).first().select('id', 'username', 'email');
  }

  async save(user: User): Promise<User> {
    const [dbUser]: User[] = await db<User>('users').returning('id').insert(user);
    return dbUser;
  }
}

export default UserRepository;
