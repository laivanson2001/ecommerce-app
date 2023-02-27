import { Helmet } from "react-helmet-async";
import React from "react";

const Meta = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>
  );
};

export default Meta;
