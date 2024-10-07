import React from "react";
import { Link } from "react-router-dom";
import Styles from "../assets/stylesheet/index.css";

const NotFound = () => {
  return (
    <div className={Styles.notFoundWapper}>
      <section className={Styles.notFound}>
        <div className={Styles.img}>
          <img
            src="https://assets.codepen.io/5647096/backToTheHomepage.png"
            alt="Back to the Homepage"
          />
          <img
            src="https://assets.codepen.io/5647096/Delorean.png"
            alt="El Delorean, El Doc y Marti McFly"
          />
        </div>
        <div className={Styles.text}>
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <h3>BACK TO HOME?</h3>
          <Link to={"/"} className={Styles.yes}>
            YES
          </Link>
          <Link to={"https://www.youtube.com/channel/UClCLLStmE41ejOJZoZI237Q"}>NO</Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
