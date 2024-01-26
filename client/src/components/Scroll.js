import React, { useState, useEffect } from "react";


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show/hide the button based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      🔝
    </button>
  );
};

export default ScrollToTopButton;
