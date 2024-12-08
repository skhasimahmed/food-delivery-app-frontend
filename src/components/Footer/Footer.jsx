import "./Footer.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();

  return (
    <div className="footer" id="contact-us">
      <div className="footer-content">
        <div className="footer-content-left">
          <img
            src={assets.logo}
            alt="FoodZie. Logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <p>
            Choose from a diverse menu featuring a delectable array of dishes.
            Our mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <div className="footer-social-icons">
            <img
              src={assets.facebook_icon}
              alt="Facebook Icon"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/foodzie.official/",
                  "_blank"
                )
              }
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter Icon"
              onClick={() =>
                window.open("https://twitter.com/foodzie_official", "_blank")
              }
            />
            <img
              src={assets.linkedin_icon}
              alt="LinkedIn Icon"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/foodzie/",
                  "_blank"
                )
              }
            />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/foods");
                window.scrollTo(0, 0);
              }}
            >
              Foods
            </li>
            <li
              onClick={() =>
                window.open(
                  "https://www.freeprivacypolicy.com/live/29771f72-6374-4c97-9559-7961d2f9c50d",
                  "_blank"
                )
              }
            >
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li onClick={() => window.open("tel:(+91) 91230 05884")}>
              (+91) 9123005884
            </li>
            <li onClick={() => window.open("mailto:contact@foodzie.com")}>
              contact@foodzie.com
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright-text">
        Copyright {currentYear} &copy;{" "}
        <span
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          FoodZie.
        </span>{" "}
        - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
