import React from "react";
import { assets } from "../../assets/assets";
import "./MobileAppDownload.css";

const MobileAppDownload = () => {
  return (
    <div className="mobile-app-download" id="mobile-app-download">
      <p>
        For better experience download <br /> FoodZie. App
      </p>
      <div className="mobile-app-download-platforms">
        <img src={assets.play_store} alt="Play Store" />

        <img src={assets.app_store} alt="App Store" />
      </div>
    </div>
  );
};

export default MobileAppDownload;
