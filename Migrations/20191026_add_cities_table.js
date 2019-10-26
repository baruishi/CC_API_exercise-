exports.up = function(knex, Promise) {
  return knex.schema.createTable("cities", t => {
    t.increments("id") 
      .index();

    t.integer("rank")
      .index();

    t.integer("in_region")
      .index();

    t.string("city")
      .index()

    t.string("county")
      .index();

    t.string("region")
      .index();

    t.integer("population")
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cities");
};
