import knex from 'knex';
import dbConfig from '../../knexfile';

class DBSq {
    constructor() {
      const environment = process.env.NODE_ENV || 'production';
      console.log(`SETTING ${environment} DB`);
      const options = dbConfig[environment];
      this.connection = knex(options);
    }
  
    init() { 
      this.connection.schema.hasTable('mensajes').then((exists) => {
        if (exists) return;
        console.log('Creamos la tabla mensajes!');
  
        return this.connection.schema.createTable(
          'mensajes',
          (mensajes) => {
            mensajes.increments();
            mensajes.string('mensajes').notNullable();
            mensajes.string('usuario').notNullable(); 
          }
        );
      });
    }
}

export const DBSqlite = new DBSq();