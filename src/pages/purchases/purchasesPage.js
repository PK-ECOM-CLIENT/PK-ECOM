import React from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { PurchasesCard } from "../../components/purchases-card/PurchasesCard";

const purchases = () => {
  return (
    <AppLayOut>
      <PurchasesCard></PurchasesCard>
    </AppLayOut>
  );
};
export default purchases;
