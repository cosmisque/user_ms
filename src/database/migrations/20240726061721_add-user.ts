import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
  });

  const hashedPassword = await bcrypt.hash('123456', 10);

  const usersData = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword
    },
    {
      username: 'contributor',
      email: 'contributor@example.com',
      password: hashedPassword
    }
  ];

  await knex('users').insert(usersData);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
