exports.up = function (knex) {
    return knex.schema
      .createTable('productos', (productosTable) => {
        productosTable.increments();
        productosTable.string('nombre').notNullable();
        productosTable.decimal('precio', 4, 2);
        productosTable.string('descripcion').notNullable();
        productosTable.decimal('codigo', 4, 2);
        productosTable.integer('foto').notNullable();
        productosTable.integer('stock').notNullable();
        productosTable.timestamp('createdAt').defaultTo(knex.fn.now());
        
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('productos');
  };
  