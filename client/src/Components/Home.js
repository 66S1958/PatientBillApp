import React from "react";
import pic1 from "./pic1.png";
import pic2 from "./pic2.jpeg";
import pic3 from "./pic3.jpg";

const Home = () => {
  return (
    <div className="home">
      <h1>Patient Appointment and Billing System</h1>
      <h2>welcome in AlShahad Clinic</h2>
      <div className="container">
        <div id="carouselExampleIndicators" className="carousel slide">
          {/* Carousel indicators */}
          <div className="carousel-indicators">
            {/* Indicator buttons */}
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {/* Carousel inner */}
          <div className="carousel-inner">
            {/* Carousel items */}
            <div className="carousel-item active">
              <img src={pic1} className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src={pic2} className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src={pic3} className="d-block w-100" alt="Slide 3" />
            </div>
          </div>

          {/* Carousel controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
