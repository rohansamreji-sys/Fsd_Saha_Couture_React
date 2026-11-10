
import { useState } from "react";

const slides = [
    {
        title: "The Art of Everyday Elegance",
        description: "Discover thoughtfully selected styles for every moment.",
        image: "/assets/kurta.jpg",
        label: "Kurtas",
    },
    {
        title: "Grace in Every Detail",
        description: "Explore timeless silhouettes and beautiful occasion wear.",
        image: "/assets/saree.jpg",
        label: "Sarees",
    },
    {
        title: "Made for Your Moments",
        description: "Find pieces that feel just right for you.",
        image: "/assets/everyday.jpg",
        label: "Everyday Edit",
    },
];

function Hero() {
    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = () => {
        setActiveSlide((current) => (current + 1) % slides.length);
    };

    const previousSlide = () => {
        setActiveSlide(
            (current) => (current - 1 + slides.length) % slides.length
        );
    };

    const slide = slides[activeSlide];

    return (
        <section className="hero-section" id="home">
            <div className="hero-copy">
                <p className="eyebrow">SAHA COUTURE · BENGALURU</p>
                <h1>{slide.title}</h1>
                <p className="hero-description">{slide.description}</p>

                <a href="#style-finder" className="primary-button">
                    Find Your Saha Edit
                </a>

                <div className="hero-controls">
                    <button
                        type="button"
                        onClick={previousSlide}
                        aria-label="Previous collection"
                    >
                        &#8592;
                    </button>

                    <span>
                        0{activeSlide + 1} / 0{slides.length}
                    </span>

                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next collection"
                    >
                        &#8594;
                    </button>
                </div>

                <div className="hero-dots">
                    {slides.map((item, index) => (
                        <button
                            key={item.label}
                            type="button"
                            className={activeSlide === index ? "active" : ""}
                            onClick={() => setActiveSlide(index)}
                            aria-label={`Show ${item.label}`}
                        />
                    ))}
                </div>
            </div>

            <div className="hero-image-wrap">
                <img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.label}
                    className="hero-image"
                />
                <span className="image-caption">{slide.label}</span>
            </div>
        </section>
    );
}

export default Hero;
