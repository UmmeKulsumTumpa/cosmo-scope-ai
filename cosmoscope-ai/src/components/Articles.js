// Articles.js
import React from "react";
import "../styles/Articles.css";

const Articles = () => {
    return (
        <section className="articles-section" id="articles">
            <h2 className="articles-section__heading">Latest Articles</h2>
            <div className="articles-section__panel">
                <h3 className="articles-section__title">Understanding Exoplanets</h3>
                <p className="articles-section__summary">
                    Learn about the fascinating world of exoplanets and their significance
                    in astronomy.
                </p>
                <button className="articles-section__button">Read More</button>
            </div>
            <div className="articles-section__panel">
                <h3 className="articles-section__title">
                    Habitable Worlds Observatory Mission
                </h3>
                <p className="articles-section__summary">
                    Discover how the HWO mission is set to revolutionize our understanding
                    of habitable planets.
                </p>
                <button className="articles-section__button">Read More</button>
            </div>
            <div className="articles-section__panel">
                <h3 className="articles-section__title">
                    Habitable Worlds Observatory Mission
                </h3>
                <p className="articles-section__summary">
                    Discover how the HWO mission is set to revolutionize our understanding
                    of habitable planets.
                </p>
                <button className="articles-section__button">Read More</button>
            </div>
            <div className="articles-section__panel">
                <h3 className="articles-section__title">
                    Habitable Worlds Observatory Mission
                </h3>
                <p className="articles-section__summary">
                    Discover how the HWO mission is set to revolutionize our understanding
                    of habitable planets.
                </p>
                <button className="articles-section__button">Read More</button>
            </div>
        </section>
    );
};

export default Articles;
