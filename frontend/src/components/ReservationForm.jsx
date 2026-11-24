import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

// Today's date in YYYY-MM-DD format (used to stop people choosing past dates)
const today = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// This form is used for BOTH creating and editing a reservation.
// - initialData: the starting values
// - onSubmit: function that receives the form data
function ReservationForm({ initialData, onSubmit, submitLabel = "Book Table", loading = false }) {
  const [form, setForm] = useState({
    customerName: initialData.customerName || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    bookingDate: initialData.bookingDate || "",
    bookingTime: initialData.bookingTime || "",
    guests: initialData.guests || 2,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, guests: Number(form.guests) });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              pattern="[0-9+\-\s]{7,15}"
              title="Enter a valid phone number"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Number of Guests</Form.Label>
            <Form.Control
              type="number"
              name="guests"
              min="1"
              max="20"
              value={form.guests}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Booking Date</Form.Label>
            <Form.Control
              type="date"
              name="bookingDate"
              min={today()}
              value={form.bookingDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Booking Time</Form.Label>
            <Form.Control
              type="time"
              name="bookingTime"
              min="11:00"
              max="23:00"
              value={form.bookingTime}
              onChange={handleChange}
              required
            />
            <Form.Text muted>We are open 11:00 AM – 11:00 PM</Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit" variant="warning" className="w-100 fw-semibold" disabled={loading}>
        {loading ? "Please wait..." : submitLabel}
      </Button>
    </Form>
  );
}

export default ReservationForm;
