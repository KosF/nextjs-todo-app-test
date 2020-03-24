import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const enhancedFetch = (url, init) => {
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      "Target-URL": "https://todo-mongo-graphql-server.herokuapp.com"
    }
  }).then(response => response);
};

export default new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:8080",
    fetch: enhancedFetch
    // credentials: "same-origin",
    // fetchOptions: {
    //   mode: 'no-cors'
    // },
    // useGETForQueries: true
  }),
  cache: new InMemoryCache()
});
