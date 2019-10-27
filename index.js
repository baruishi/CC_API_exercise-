//control pannel for the app
const config = require("./config");

//database
const knex = require("knex")(config.db);

const express = require("express");

//graph iQL
const app = express();
const graphqlHTTP = require("express-graphql");

const { buildSchema } = require("graphql");
//const schema = require("./controllers");

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
  addCity(input: addCity): String!
  updatePopulationByCity(city: String!, population: Int!): String!
  delete(city: String!): String!
  }
`);

const root = {
  cities: () => {
    return knex
      .select("*")
      .from("cities")
      .then(cities => {
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
        const city = cities.pop();
        return city;
      });
  },

  delete: input => {
    console.log(input.city);
    return knex("cities")
      .where({ city: input.city })
      .del()
      .then(() => {
        return `City ${input.city} was delated from database`;
      });
  },

  addCity: input => {
    const newObj = input.input;
    return knex("cities")
      .insert({
        city: newObj.city,
        county: newObj.county,
        region: newObj.region,
        population: newObj.population
      })
      .then(() => {
        return `New city: ${newObj.city} added to database`;
      });
  },
  updatePopulationByCity: input => {
    const selectedCity = input.city;
    const newPopulation = input.population;
    return knex(`cities`)
      .where({ city: selectedCity })
      .update({ population: newPopulation })
      .then(() => {
        return `Population of ${selectedCity} updated to ${newPopulation}`;
      });
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
