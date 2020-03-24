import { gql } from "apollo-boost";

export const GET_TODOS = gql`
  query todoQuery {
    todos {
      id
      title
      completed
    }
  }
`;