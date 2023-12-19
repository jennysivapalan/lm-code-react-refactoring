import pureHeroism from "../hooks/useHero";
import { v4 as uuid } from "uuid";

const Heroics = () => {
  const heroics = pureHeroism;

  const renderReviewScore = (score: number) => {
    const scoreRepresentationUsingACuteLilPlanetEmoji = [];
    for (let i = 0; i < score; i++) {
      scoreRepresentationUsingACuteLilPlanetEmoji.push(
        <span key={uuid()}>🪐</span>
      );
    }
    return scoreRepresentationUsingACuteLilPlanetEmoji;
  };

  return (
    <div
      className="hero-section"
      style={{
        background: `linear-gradient(0deg, rgba(10 10 10 / 90%), rgba(25 119 25 / 60%)), url(${heroics.image})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 20%",
      }}
    >
      <h3>We've been helping humanity traverse the universe for aeons.</h3>
      <p>
        Now it's your turn to marvel at the wonders of the universe! But don't
        just take our word for it; check out these smashing reviews from
        customers just like you!
      </p>
      <ul className="testimonials">
        {heroics.testimonials.map(({ name, rating, spiel, social }) => {
          return (
            <li key={name} className="test-card">
              <h4>{name}</h4>
              <a>{social}</a>
              <p>{spiel}</p>
              <p>Score / 5: {renderReviewScore(rating)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Heroics;
