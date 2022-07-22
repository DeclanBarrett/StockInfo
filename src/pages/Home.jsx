import React from "react";

//home page with extra row of features
export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}

// hero content
const Hero = () => (
  <div className="Hero">
    <div className="HeroContent">
      <h1 className="HeroTitle">They Only Go Up</h1>
      <p className="HeroSubtitle">Welcome to Stonks, the Stock Analyst portal. Click on Symbols to see the available companies, Quote
      to get the latest price information by stock symbol, or choose Price History to sample from
      the most recent one hundred days of information for a particular stock. </p>
    </div>
  </div>
);

// features section
function Features() {

  // Feature panels information objects
  const featuresData = [
    {
      heading: "Lose Sleep",
      text:
        "You will lose sleep. Since these are American stocks you will spend all night randomly checking the market.",
      img: { src: "img/like.png", alt: "Thumbs up icon" }
    },
    {
      heading: "Get Stressed",
      text:
        "The market goes up when it should go down and goes down when it should go up, and the FED can just print infinite money.",
      img: { src: "img/faces.png", alt: "Entertainment icon" }
    },
    {
      heading: "Go On Welfare",
      text:
        "Explore welfare options after your life savings disappear within a week, or you lose thousands on options trading.",
      img: { src: "img/heart.png", alt: "Heart icon" }
    }
  ];

  // Return a features header that can be view on mobile and desktop
  return (
    <article className="features">
      <div className="features_header">
        <h2>Our Promise</h2>
      </div>

      <div className="features_box-wrapper">
        {// display the information for each of our features in their own Box
          featuresData.map(feature => (
            <FeatureBox id="FeatureBox" feature={feature} />
          ))}
      </div>
    </article>
  );
}

// Display a Feature box when passed in the information for the feature
const FeatureBox = ({ feature }) => (
  <div className="features_box">
    <img src={feature.img.src} alt={feature.img.alt} />
    <h5>{feature.title}</h5>
    <p>{feature.text}</p>
  </div>
);
