import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const highlights = [
  { icon: "🍝", title: "Fresh Italian Food", text: "Hand-made pasta, wood-fired pizza and classic desserts made every day." },
  { icon: "🕯️", title: "Cosy Ambience", text: "Warm lights, soft music and comfortable seating for family and friends." },
  { icon: "⭐", title: "Friendly Service", text: "Our team makes sure every visit feels special, from first bite to last." },
];

function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="hero d-flex align-items-center text-center text-white">
        <Container>
          <h1 className="display-3 fw-bold">La Bella Tavola</h1>
          <p className="lead mb-4">
            Authentic flavours, warm hospitality. Reserve your table in less than a minute.
          </p>
          <Button as={Link} to="/booking" size="lg" variant="warning" className="fw-semibold px-4">
            Book a Table
          </Button>
        </Container>
      </section>

      {/* Highlights */}
      <Container className="py-5">
        <h2 className="section-title text-center mb-5">Why Dine With Us</h2>
        <Row className="g-4">
          {highlights.map((item) => (
            <Col md={4} key={item.title}>
              <Card className="h-100 text-center shadow-sm border-0 highlight-card">
                <Card.Body className="p-4">
                  <div className="highlight-icon">{item.icon}</div>
                  <Card.Title className="mt-3">{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Restaurant details */}
      <section className="details-section py-5">
        <Container>
          <Row className="g-4 text-center">
            <Col md={4}>
              <h5>📍 Address</h5>
              <p className="mb-0">12 Garden Road, Civil Lines<br />Bareilly, Uttar Pradesh</p>
            </Col>
            <Col md={4}>
              <h5>🕐 Opening Hours</h5>
              <p className="mb-0">Monday – Sunday<br />11:00 AM – 11:00 PM</p>
            </Col>
            <Col md={4}>
              <h5>📞 Contact</h5>
              <p className="mb-0">+91 98765 43210<br />hello@labellatavola.com</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
