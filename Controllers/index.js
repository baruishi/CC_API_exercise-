const express = require("express");
const { buildSchema }  = require('graphql');


//TODO consider taking the rank & in region out from the table

const schema = buildSchema(`
  type cities {
    rank: String!
    in_region: String!
    city: String!
    county: String!
    region: String!
    population: Int
  }

  type city {
    rank: String!
    in_region: String!
    city: String!
    county: String!
    region: String!
    population: Int
  }
  input addCity {
    rank: String!
    in_region: String!
    city: String!
    county: String!
    region: String!
    population: Int!
  }
  type Query {
    cities: [cities]
    citiesByPopulation(population: Int!): [cities]
  }
  type Mutation {
    updatePopulationByCity(city: String!, population: Int): Int!
  }

`);


//const router = express.Router();

//const userRouter = require("./user");
//const channelRouter = require("./channel");



module.exports = { schema, root};


// module.exports = (models) => {
//   router.use("/users", userRouter(models));
//   router.use("/channels", channelRouter(models));
//   return router;
// };
