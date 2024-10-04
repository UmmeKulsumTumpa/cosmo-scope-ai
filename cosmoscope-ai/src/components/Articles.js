import React from "react";
import "../styles/Articles.css";

const Articles = () => {
    // Sample list of articles with paths to the PDFs in your essays folder
    const articles = [
        {
            id: 1,
            title: "Characterizing Atmospheres of Earth-like Exoplanets",
            summary: "An analysis of techniques used to study exoplanet atmospheres.",
            pdf: "/essays/_Characterizing Atmospheres of Earth-like Exoplanets_.pdf",
        },
        {
            id: 2,
            title: "Exoplanet Detection Techniques and Innovations",
            summary: "A deep dive into the latest techniques for detecting exoplanets.",
            pdf: "/essays/_Exoplanet Detection Techniques and Innovations.pdf",
        },
        {
            id: 3,
            title: "Potential for Life on Exoplanets Beyond the Habitable Zone",
            summary: "Exploring the possibilities of life on exoplanets that exist beyond the traditional habitable zone.",
            pdf: "/essays/_Potential for Life on Exoplanets Beyond the Habitable Zone.pdf",
        },
        {
            id: 4,
            title: "Impact of Stellar Activity on Exoplanet Habitability",
            summary: "A study on how stellar activity affects the habitability of exoplanets.",
            pdf: "/essays/Impact of Stellar Activity on Exoplanet Habitability.pdf",
        }
    ];

    return (
        <section className="articles-section" id="articles">
            <h2 className="articles-section__heading">Latest Articles</h2>
            {articles.map((article) => (
                <div className="articles-section__panel" key={article.id}>
                    <h3 className="articles-section__title">{article.title}</h3>
                    <p className="articles-section__summary">{article.summary}</p>
                    <a 
                        href={article.pdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <button className="articles-section__button">Read More</button>
                    </a>
                </div>
            ))}
        </section>
    );
};

export default Articles;
