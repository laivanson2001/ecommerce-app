import React from "react";

const Container = ({ class1, children }) => {
  return (
    <section className={class1}>
      <div className="container-xxl">{children}</div>
    </section>
  );
};

export default Container;
