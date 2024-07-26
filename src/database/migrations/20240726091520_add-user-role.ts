import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_roles', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unique().notNullable();
    table.integer('role_id');
  });

  const userRolesData = [
    { user_id: 1, role_id: 1 },
    { user_id: 2, role_id: 2 }
  ];

  await knex('user_roles').insert(userRolesData);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_roles');
}
