const {buildSchema} = require("graphql")

module.exports = buildSchema(`
    type User {
        name: String!
        age: Int!
    }
    type TestType {
        count: Int!
        users: [User!]!
    }
    type Query{
        test: TestType!
    }
`)