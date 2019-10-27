# CC_API_exercise-

This was created during my time as a student at [Code Chrysalis](https://www.codechrysalis.io/).

### UK Cities API

<br>

This API was created using on Postgres, GraphQL and Knex, written in JavaScript.

It represents a simple API with cities in the United Kingdom.
County, Region and Population is stored for every city.

<br>

### Set-up

```

yarn install

yarn migrate

yarn start

```

### How to use this API:

# Show all cities in the databe.

```
{
  cities {
    city
    county
    region
    population
  }
}
```

# Show a chosen city.

```
{
  city( city: "London") {
    city
    county
    region
    population
  }
}
```

# Update a population of a chosen city.

```
mutation {
  updatePopulationByCity( city: "London",  population: 3500000)
}
```

# Add a new city.

```
mutation {
  addCity( input: {
  city: "NEW CITY"
  county: "COUNTY"
  region: "REGION"
  population: 100000
})
}
```

# Delete a chosen city.

```
mutation {
  delete(city: "CITY")
}
```

developed by: _baruishi_
