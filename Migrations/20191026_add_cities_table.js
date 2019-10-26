exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("cities", t => {
    t.increments("id") // auto-incrementing id column
      .index(); // index this column

    t.integer("rank") // auto-incrementing id column
      .index(); // index this column

    t.integer("in_region") // auto-incrementing id column
      .index(); // index this column

    t.string("city") // auto-incrementing id column
      .index(); // index this column

    t.string("county") // auto-incrementing id column
      .index(); // index this column

    t.string("region") // auto-incrementing id column
      .index(); // index this column

    t.integer("population") // auto-incrementing id column
      .index(); // index this column
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("cities");
};
