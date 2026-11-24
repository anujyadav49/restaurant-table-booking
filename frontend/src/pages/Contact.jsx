import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

function Contact() {
  const [sent, setSent] = useState(false);

  // This is a demo form: it only shows a thank-you message.
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <Container className="page py-5">
      <h2 className="section-title text-center mb-4">Contact Us</h2>
      <Row className="g-4">
        <Col md={5}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="p-4">
              <h5>Get in touch</h5>
              <p className="mt-3">📍 12 Garden Road, Civil Lines, Bareilly, Uttar Pradesh</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ hello@labellatavola.com</p>
              <p className="mb-0">🕐 Every day, 11:00 AM – 11:00 PM</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h5>Send us a message</h5>
              {sent && (
                <Alert variant="success" dismissible onClose={() => setSent(false)}>
                  Thank you! We will get back to you soon.
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control required placeholder="Your name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required placeholder="you@example.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} required placeholder="How can we help?" />
                </Form.Group>
                <Button type="submit" variant="warning" className="fw-semibold">
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
