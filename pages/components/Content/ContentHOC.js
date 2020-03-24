import { compose } from "recompose";
import { graphql } from "react-apollo";

import { GET_TODOS } from "./queries";
import { ADD_TODO, DESTROY_TODO } from "./mutation";

export default compose(
  graphql(GET_TODOS),
  graphql(ADD_TODO, {
    props: ({ mutate }) => ({
      add: title =>
        mutate({
          variables: title,
          refetchQueries: [{ query: GET_TODOS }]
        })
    })
  }),
  graphql(DESTROY_TODO, {
    props: ({ mutate }) => ({
      destroy: id =>
        mutate({
          variables: { id: id.toString() },
          refetchQueries: [{ query: GET_TODOS }]
        })
    })
  })
);
