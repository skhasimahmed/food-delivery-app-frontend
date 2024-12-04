import { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import MobileAppDownload from "../../components/MobileAppDownload/MobileAppDownload";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {
  const { activeMenu } = useContext(StoreContext);
  const homeMenuRef = useRef();
  useEffect(() => {
    if(activeMenu === 'home') {
      homeMenuRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  });
  return (
    <div className="home" id="home-menu" ref={homeMenuRef}>
      <Header />
      <ExploreMenu />
      <FoodDisplay />
      <MobileAppDownload />
    </div>
  );
};

export default Home;
