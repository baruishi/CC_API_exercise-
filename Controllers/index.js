//const express = require("./node_modules/express");

//const router = express.Router();

//const userRouter = require;

/*
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type cities {
    city: String!
    county: String!
    region: String!
    population: Int
  }

  type city {
    city: String!
    county: String!
    region: String!
    population: Int
  }
  
  input inputPopulation {
    city: String!
    population: Int!
  }
  
  input addCity {
    city: String!
    county: String!
    region: String!
    population: Int!
  }
  type Query {
    cities: [cities]
    city(city: String!): city
    citiesByPopulation(population: Int!): [cities]
  }
  type Mutation {
    updatePopulationByCity(input: inputPopulation): [city]
  }

`);

const root = {
  cities: () => {
    return knex
      .select("*")
      .from("cities")
      .then(cities => {
        console.log(cities);
        return cities;
      });
  },

  city: input => {
    const selectedCity = input.city;
    return knex
      .select("*")
      .from("cities")
      .where({ city: selectedCity })
      .then(cities => {
        const city = cities.pop(); //TODO this can be changed to one line
        return city;
      });
  },
  /*citiesByPopulation: (input) => { //TODO figure out how to select a city with popualtion grater than specific number
    const populationOfCities = input.ppulation
  },*/

/*
  updatePopulationByCity: input => {

    console.log("updatePopulationByCity");
    console.log(input);
    const selectedCity = input.city;
    const newPopulation = input.population;
    return knex("cities")
      .where({ city: selectedCity })
      .update({ population: newPopulation })
      .then(cities => {
        return `{
          city: ${selectedCity}
          county: ${cities.county}
          region: ${cities.region}
          population: ${cities.population} 
        }`;
      });
  }
};


module.exports = { schema, root };


*/

//const router = express.Router();

//const userRouter = require("./user");
//const channelRouter = require("./channel");
// module.exports = (models) => {
//   router.use("/users", userRouter(models));
//   router.use("/channels", channelRouter(models));
//   return router;
// };
