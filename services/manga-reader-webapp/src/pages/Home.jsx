import React from "react";
import Carousel from "../components/Carousel";

const Home = ({ setSearchBarOpened }) => {
  return (
    <div>
      <Carousel setSearchBarOpened={setSearchBarOpened} />
    </div>
  );
};

export default Home;
