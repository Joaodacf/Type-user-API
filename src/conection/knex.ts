import knex from "knex"

const conectionKnex = {
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '1243',
        database: 'typebanco',
    }
}

export default knex(conectionKnex)


