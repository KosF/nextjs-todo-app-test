import React from "react";
import { ApolloProvider } from "react-apollo";

import Header from "../components/Header/Header";
import Content from "../components/Content/Content";

import apolloClient from "../heplers/apolloClient";

const Home = () => (
  <ApolloProvider client={apolloClient}>
    <div className="container">
      <Header />

      <Content />
    </div>
  </ApolloProvider>
);

export default Home;
