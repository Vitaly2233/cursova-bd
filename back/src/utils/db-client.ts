import knex from 'knex';

const client = knex({
  client: "postgresql",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "mysecretpassword",
    database: "cursova",
  },
});

export { client };
