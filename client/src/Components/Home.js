import React from "react";
import pic1 from "./pic1.png";
import pic2 from "./pic2.jpeg";
import pic3 from "./pic3.jpg";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS (with Popper)
import { Container, Row, Col } from "reactstrap"; // Import Reactstrap

const Home = () => {
  return (
    <div className="home">
      <h1>Patient Appointment and Billing System</h1>
      <h2>Welcome to AlShahad Clinic</h2>

      {/* Carousel Section */}
      <div className="container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
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

          <div className="carousel-inner">
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

      {/* About Us Section */}
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h3>About AlShahad Clinic</h3>
            <p>
              AlShahad Clinic is a leading healthcare facility offering a wide
              range of medical services to meet the needs of our patients. We
              specialize in patient care, appointments, and billing services.
              Our team of experienced professionals is committed to providing
              high-quality healthcare in a welcoming and compassionate
              environment.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h4>Our Services</h4>
            <ul>
              <li>Comprehensive medical checkups</li>
              <li>Specialized healthcare consultations</li>
              <li>Patient appointment scheduling</li>
              <li>Efficient billing and insurance processing</li>
            </ul>
          </Col>

          <Col md={6}>
            <h4>Our Mission</h4>
            <p>
              Our mission is to provide excellent healthcare services in a
              patient-centered environment. We are dedicated to improving the
              health and well-being of our community by offering high-quality
              medical care, compassionate treatment, and effective billing
              management.
            </p>
          </Col>
        </Row>

        <Row className="my-4">
          <Col md={12}>
            <h4>Contact Us</h4>
            <p>
              If you have any questions or need to book an appointment, please
              feel free to contact us. We are here to assist you with all your
              healthcare needs.
            </p>
            <p>Email: contact@alshahadclinic.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
