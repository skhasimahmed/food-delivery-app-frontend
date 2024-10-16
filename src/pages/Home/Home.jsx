import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import MobileAppDownload from "../../components/MobileAppDownload/MobileAppDownload";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [category, setCategory] = useState("All");
  return (
    <div className="home">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <MobileAppDownload />
    </div>
  );
};

export default Home;
