exports.up = function(knex, Promise) {
  return knex.schema
  .createTable("cities", t => {
    t.increments("id") 
      .index();

    t.string("city")
      .index()

    t.string("county")
      .index();

    t.string("region")
      .index();

    t.integer("population")
      .index();
  })
  .then(() => {
    return knex('cities').insert([
      {city:'London', county: 'London', region:'London', population: '8,907,918'},
      {city:'Birmingham', county: 'West Midlands', region:'West Midlands', population: '1,153,717'},
      {city:'Glasgow', county: 'Glasgow', region:'Scotland', population: '612,040'},
      {city:'Liverpool', county: 'Merseyside', region:'North West', population: '579,256'},
      {city:'Bristol', county: 'Bristol', region:'South West', population: '571,922'},
      {city:'Manchester', county: 'Greater Manchester', region:'North West', population: '554,400'},
      {city:'Sheffield', county: 'South Yorkshire', region:'Yorkshire Humber', population: '544,402'},
      {city:'Leeds', county: 'West Yorkshire', region:'Yorkshire', population: '503,388'},
      {city:'Edinburgh', county: 'Edinburgh', region:'Scotland', population: '488,050'},
      {city:'Leicester', county: 'Leicestershire', region:'East Midlands', population: '470,965'},
      {city:'Coventry', county: 'West Midlands', region:'West Midlands', population: '369,127'},
    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cities");
};
