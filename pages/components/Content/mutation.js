import { gql } from "apollo-boost";

export const ADD_TODO = gql`
  mutation addTodo($title: String!) {
    add(title: $title) {
      id
      title
    }
  }
`;

export const DESTROY_TODO = gql`
  mutation destroyTodo($id: String!) {
    destroy(id: $id) {
      id
    }
  }
`;

