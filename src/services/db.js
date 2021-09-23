import knex from 'knex';
import dbConfig from '../../knexfile';
import faker from 'faker';

class DB {
  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
    this.data = []
  }

  init() { 
    this.connection.schema.hasTable('productos').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla productos!');

      return this.connection.schema.createTable(
        'productos',
        (productosTable) => {
          productosTable.increments();
          productosTable.string('nombre').notNullable();        
          productosTable.decimal('precio', 4, 2);
          productosTable.string('descripcion').notNullable();
          productosTable.integer('codigo').notNullable();
          productosTable.string('foto').notNullable();        
          productosTable.integer('stock').notNullable();
          productosTable.timestamp('createdAt').defaultTo(knex.fn.now());
        }
      );
    });
  }

  get(tableName, id) {
    if (id) return this.connection(tableName).where('id', id);

    return this.connection(tableName);
  }

  post(tableName){
    const newFaker = {
      nombre: faker.commerce.productName(),
      precio: faker.commerce.price(),
      descripcion: faker.commerce.productDescription(),
      codigo: faker.datatype.number(),
      foto: faker.image.imageUrl(),
      stock: faker.datatype.number(),
    }
    this.data.push(newFaker);
    return newFaker
  }

  async create(tableName, data) {
    return this.connection(tableName).insert(data);
  }

  update(tableName, id, data) {
    return this.connection(tableName).where('id', id).update(data);
  }

  delete(tableName, id) {
    return this.connection(tableName).where('id', id).del();
  }
}

export const DBService = new DB();