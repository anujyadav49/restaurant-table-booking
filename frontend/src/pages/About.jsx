import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <Container className="page py-5">
      <h2 className="section-title text-center mb-4">About Us</h2>
      <Row className="align-items-center g-4">
        <Col md={6}>
          <div className="about-image" role="img" aria-label="Restaurant dining area" />
        </Col>
        <Col md={6}>
          <h4>Our Story</h4>
          <p>
            La Bella Tavola started as a small family kitchen with one simple idea: good food
            brings people together. Today we serve the same recipes with the same love, in a
            welcoming space for every occasion.
          </p>
          <p>
            We use fresh, local ingredients and cook everything to order. Whether it is a quiet
            dinner for two, a birthday or a family get-together, we are happy to host you.
          </p>
          <h5 className="mt-4">What we offer</h5>
          <ul>
            <li>Italian and continental main courses</li>
            <li>Wood-fired pizzas and fresh pasta</li>
            <li>Vegetarian and vegan options</li>
            <li>Desserts and coffee</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
