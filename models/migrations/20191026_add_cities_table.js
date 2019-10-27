exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("cities", t => {
      t.increments("id").index();

      t.string("city").index();

      t.string("county").index();

      t.string("region").index();

      t.integer("population").index();
    })
    .then(() => {
      return knex("cities").insert([
        {
          city: "London",
          county: "London",
          region: "London",
          population: "8907918"
        },
        {
          city: "Birmingham",
          county: "West Midlands",
          region: "West Midlands",
          population: "1153717"
        },
        {
          city: "Glasgow",
          county: "Glasgow",
          region: "Scotland",
          population: "612040"
        },
        {
          city: "Liverpool",
          county: "Merseyside",
          region: "North West",
          population: "579256"
        },
        {
          city: "Bristol",
          county: "Bristol",
          region: "South West",
          population: "571922"
        },
        {
          city: "Manchester",
          county: "Greater Manchester",
          region: "North West",
          population: "554400"
        },
        {
          city: "Sheffield",
          county: "South Yorkshire",
          region: "Yorkshire Humber",
          population: "544402"
        },
        {
          city: "Leeds",
          county: "West Yorkshire",
          region: "Yorkshire",
          population: "503388"
        },
        {
          city: "Edinburgh",
          county: "Edinburgh",
          region: "Scotland",
          population: "488050"
        },
        {
          city: "Leicester",
          county: "Leicestershire",
          region: "East Midlands",
          population: "470965"
        },
        {
          city: "Coventry",
          county: "West Midlands",
          region: "West Midlands",
          population: "369127"
        }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cities");
};
