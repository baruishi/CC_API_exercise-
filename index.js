//control pannel for the app
const config = require("./config");

//database
const knex = require("knex")(config.db);
//const models = require("./models")(knex);

//const apiRouter = require("./controllers")(models);
//const morgan = require("morgan");
//const bodyParser = require("body-parser");
const express = require("express");
//const root = require("./controllers");

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
  /*citiesByPopulation: (input) => { //TODO figure out how to select a city with popualtion grater than specific number
    const populationOfCities = input.ppulation
  },*/
  updatePopulationByCity: input => {
    console.log("input", input);
    console.log("input.population", input.population);
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

// //server
// app.use("dev");
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Orign", "*");
//   res.header(
//     "Access-Controll-Allow-Deaders",
//     "GET, PUT, POST, DELETE, OPTIONS, PATH"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, authorization"
//   );
//   next();
// });

// // 3. Parse request bodies as json
// app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

// 4. If the requests begin with '/api', hand them off to the API router
// app.use("/api", apiRouter);
// app.use(express.static(`${__dirname}/public`)); // otherwise load the client app

// 5. Catch unhandled errors thrown by any of the previous middleware steps
// eslint-disable-next-line no-unused-vars
// app.use((err, req, res, next) => {
//   if (err.stack) {
//     if (err.stack.match("node_modules/body-parser"))
//       return res.status(400).send("Invalid JSON");
//   }

//   services.logger.log(err);
//   return res.status(500).send("Internal Error.");
// });

//start server
// app.listen(config.express.port, () => {
//   services.logger.log(`Server up and listening on port ${config.express.port}`);
// });
