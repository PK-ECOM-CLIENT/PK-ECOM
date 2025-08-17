import React from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import BackButton from "../../components/backbutton/BackButton";

const NewArrivals = () => {
  return (
    <AppLayOut>
      {" "}
      <BackButton />
      <div>New Arrivals</div>
    </AppLayOut>
  );
};

export default NewArrivals;
