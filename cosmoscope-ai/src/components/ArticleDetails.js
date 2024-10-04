import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "../styles/ArticleDetails.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const articles = [
    {
        id: 1,
        title: "Characterizing Atmospheres of Earth-like Exoplanets",
        pdf: "/essays/_Characterizing Atmospheres of Earth-like Exoplanets_.pdf",
    },
    {
        id: 2,
        title: "Exoplanet Detection Techniques and Innovations",
        pdf: "/essays/_Exoplanet Detection Techniques and Innovations.pdf",
    },
    {
        id: 3,
        title: "Potential for Life on Exoplanets Beyond the Habitable Zone",
        pdf: "/essays/_Potential for Life on Exoplanets Beyond the Habitable Zone.pdf",
    },
    {
        id: 4,
        title: "Impact of Stellar Activity on Exoplanet Habitability",
        pdf: "/essays/Impact of Stellar Activity on Exoplanet Habitability.pdf",
    }
];

const ArticleDetails = () => {
    const { id } = useParams();
    const article = articles.find((item) => item.id === parseInt(id));
    const [numPages, setNumPages] = useState(null);
    const [showContent, setShowContent] = useState(false); // State to trigger animation

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    // Trigger animations when the component mounts
    useEffect(() => {
        setTimeout(() => setShowContent(true), 100); // Delay to trigger the animation
    }, []);

    if (!article) {
        return (
            <section className="details-section">
                <h2 className="details-section__heading">Article Not Found</h2>
                <Link to="/articles">
                    <button className="details-section__back-button">Back to Articles</button>
                </Link>
            </section>
        );
    }

    return (
        <section className="details-section">
            {/* Animated Heading */}
            <div className={`details-section__heading-container ${showContent ? 'animate-heading' : ''}`}>
                <h1 className="details-section__heading">{article.title}</h1>
            </div>

            {/* Animated PDF Content */}
            <div className={`details-section__panel ${showContent ? 'animate-content' : ''}`}>
                <Document
                    file={article.pdf}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={console.error}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </div>

            <Link to="/articles">
                <button className="details-section__back-button">Back to Articles</button>
            </Link>
        </section>
    );
};

export default ArticleDetails;
