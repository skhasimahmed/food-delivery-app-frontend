import { useRef } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import MobileAppDownload from "../../components/MobileAppDownload/MobileAppDownload";

const Home = () => {
  const homeMenuRef = useRef();
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
