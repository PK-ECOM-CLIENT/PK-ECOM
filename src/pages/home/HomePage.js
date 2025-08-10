import React from "react";
import "./HomePage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { CustomCarousels } from "../../components/custom-components/CustomCarousels";
import { CustomCard } from "../../components/custom-components/CustomCard";
import { NoticeModal } from "../../components/noticeModal/NoticeModal";

// demo images
import boots from "../../assits/images/offersimg/boots.jpg";
import laptop from "../../assits/images/offersimg/laptop.jpg";
import sofa from "../../assits/images/offersimg/sofa.jpg";
import trousers from "../../assits/images/offersimg/trousers.jpg";

const HomePage = () => {
  const carouselOffers = [
    { name: "boots", description: "20% off", img: boots, id: "1" },
    { name: "laptop", description: "15% off", img: laptop, id: "2" },
    { name: "sofa", description: "15% off", img: sofa, id: "3" },
    { name: "trousers", description: "30% off", img: trousers, id: "4" },
  ];

  const clearance = [
    { name: "boots", description: "20% off", img: boots, id: "c1" },
    { name: "laptop", description: "10% off", img: laptop, id: "c2" },
    { name: "laptop", description: "10% off", img: laptop, id: "c3" },
    { name: "sofa", description: "15% off", img: sofa, id: "c4" },
    { name: "boots", description: "20% off", img: boots, id: "c5" },
    { name: "trousers", description: "30% off", img: trousers, id: "c6" },
    { name: "laptop", description: "10% off", img: laptop, id: "c7" },
    { name: "boots", description: "20% off", img: boots, id: "c8" },
    { name: "boots", description: "20% off", img: boots, id: "c9" },
    { name: "laptop", description: "10% off", img: laptop, id: "c10" },
    { name: "boots", description: "20% off", img: boots, id: "c11" },
    { name: "sofa", description: "15% off", img: sofa, id: "c12" },
    { name: "trousers", description: "30% off", img: trousers, id: "c13" },
  ];

  const offers = [
    { name: "boots", description: "20% off", img: boots, id: "o1" },
    { name: "laptop", description: "10% off", img: laptop, id: "o2" },
    { name: "boots", description: "20% off", img: boots, id: "o3" },
    { name: "boots", description: "20% off", img: boots, id: "o4" },
    { name: "laptop", description: "10% off", img: laptop, id: "o5" },
    { name: "boots", description: "20% off", img: boots, id: "o6" },
    { name: "trousers", description: "30% off", img: trousers, id: "o7" },
    { name: "laptop", description: "10% off", img: laptop, id: "o8" },
    { name: "boots", description: "20% off", img: boots, id: "o9" },
    { name: "boots", description: "20% off", img: boots, id: "o10" },
    { name: "laptop", description: "10% off", img: laptop, id: "o11" },
    { name: "boots", description: "20% off", img: boots, id: "o12" },
  ];

  const newArrivals = [
    { name: "boots", description: "Aussie Product", img: boots, id: "n1" },
    { name: "laptop", description: "Japanese Brand", img: laptop, id: "n2" },
    { name: "boots", description: "Aussie Product", img: boots, id: "n3" },
    { name: "boots", description: "Aussie Product", img: boots, id: "n4" },
    { name: "laptop", description: "Japanese Brand", img: laptop, id: "n5" },
    { name: "boots", description: "Aussie Product", img: boots, id: "n6" },
    { name: "trousers", description: "Hand made", img: trousers, id: "n7" },
    { name: "laptop", description: "Japanese Brand", img: laptop, id: "n8" },
    { name: "boots", description: "Aussie Product", img: boots, id: "n9" },
    { name: "boots", description: "Aussie Product", img: boots, id: "n10" },
    { name: "laptop", description: "Japanese Brand", img: laptop, id: "n11" },
    { name: "boots", description: "Aussie Product", img: boots, id: "n12" },
  ];

  const topSales = [
    { name: "boots", description: "Aussie Product", img: boots, id: "t1" },
    { name: "laptop", description: "Japanese Brand", img: laptop, id: "t2" },
    { name: "boots", description: "Aussie Product", img: boots, id: "t3" },
    { name: "boots", description: "Aussie Product", img: boots, id: "t4" },
    { name: "laptop", description: "Japanese Brand", img: laptop, id: "t5" },
    { name: "boots", description: "Aussie Product", img: boots, id: "t6" },
    { name: "trousers", description: "Hand made", img: trousers, id: "t7" },
    { name: "laptop", description: "Japanese Brand", img: laptop, id: "t8" },
    { name: "boots", description: "Aussie Product", img: boots, id: "t9" },
    { name: "boots", description: "Aussie Product", img: boots, id: "t10" },
    { name: "laptop", description: "Japanese Brand", img: laptop, id: "t11" },
    { name: "boots", description: "Aussie Product", img: boots, id: "t12" },
  ];

  return (
    <AppLayOut>
      <main className="home">
        {/* Hero / Carousel */}
        <section className="home__hero">
          <CustomCarousels items={carouselOffers} />
        </section>

        {/* Promo strip (optional quick links / badges) */}
        <section className="home__promostrip">
          <div className="promo">
            <i className="fa-solid fa-truck-fast"></i>
            <span>Fast delivery</span>
          </div>
          <div className="promo">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Buyer protection</span>
          </div>
          <div className="promo">
            <i className="fa-solid fa-rotate-left"></i>
            <span>Easy returns</span>
          </div>
          <div className="promo">
            <i className="fa-solid fa-headset"></i>
            <span>Support 7 days</span>
          </div>
        </section>

        {/* Sections */}
        <HomeSection
          icon="fa-tags"
          title="Clearance"
          hint="Grab them before they’re gone"
          items={clearance}
        />

        <HomeSection
          icon="fa-bolt"
          title="Current Offers"
          hint="Limited time deals"
          items={offers}
        />

        <HomeSection
          icon="fa-sparkles" /* fallback to star if missing */
          title="New Arrivals"
          hint="Fresh picks this week"
          items={newArrivals}
        />

        <HomeSection
          icon="fa-fire"
          title="Top Sales"
          hint="Trending best sellers"
          items={topSales}
        />

        <NoticeModal />
      </main>
    </AppLayOut>
  );
};

/** Reusable section */
const HomeSection = ({ title, hint, icon = "fa-star", items }) => {
  return (
    <section className="home__section">
      <header className="home__sectionhead">
        <div className="home__titlewrap">
          <i className={`fa-solid ${icon} home__titleicon`} />
          <h3 className="home__title">{title}</h3>
          <span className="home__hint">{hint}</span>
        </div>
        {/* optional view-all link – wire up path if you have one */}
        {/* <a className="home__viewall" href="/offers">View all</a> */}
      </header>

      {/* Grid that becomes horizontal scroll on small screens */}
      <div className="home__grid">
        {items.map((item, i) => (
          <div className="home__cell" key={`${title}-${i}`}>
            <CustomCard
              name={item.name}
              img={item.img}
              description={item.description}
              parent={title.toLowerCase().replace(/\s+/g, "")}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
