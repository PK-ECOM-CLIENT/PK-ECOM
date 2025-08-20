import React, { useState } from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { useSelector } from "react-redux";
import "./purchases.css";
import { PurchasesCard } from "../../components/purchases-card/PurchasesCard";
import { convertToAESTWithTimeZone } from "../../helpers/functions/dateConversion";
import BackButton from "../../components/backbutton/BackButton";

const Purchases = () => {
  const { purchases } = useSelector((state) => state.system);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleToggleDropdown = (itemId) => {
    setOpenDropdownId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <AppLayOut>
      <div className="-util-back_btn_wraper">
        <BackButton></BackButton>
      </div>
      <section className="purchases">
        {purchases.length === 0 ? (
          <div className="purchases__empty">
            <div className="emoji">🛒</div>
            <h4>No purchases yet</h4>
            <p>When you buy something, it’ll appear here.</p>
          </div>
        ) : (
          <div className="purchases__grid">
            {purchases.map((item) => (
              <div key={item.itemId} className="purchases__cell">
                <PurchasesCard
                  item={item}
                  image={item.image}
                  orderDate={convertToAESTWithTimeZone(item.createdAt)}
                  itemId={item.itemId}
                  name={item.name}
                  catId={item.catId}
                  productId={item.productId}
                  itemPrice={item.itemPrice}
                  dropdownVisible={openDropdownId === item._id}
                  onToggleDropdown={handleToggleDropdown}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </AppLayOut>
  );
};

export default Purchases;
