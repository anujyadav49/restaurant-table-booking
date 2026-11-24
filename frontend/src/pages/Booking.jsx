import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../api";
import { useAuth } from "../context/AuthContext";
import ReservationForm from "../components/ReservationForm";

// Colour of the status badge
export const statusColor = { pending: "warning", confirmed: "success", cancelled: "danger" };

function Booking() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null); // the reservation being edited

  // READ: load my bookings
  const loadReservations = async () => {
    try {
      const { data } = await api.get("/reservations/my");
      setReservations(data);
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    }
  };

  useEffect(() => {
    if (user) loadReservations();
  }, [user]);

  // CREATE: make a new booking
  const handleCreate = async (formData) => {
    setLoading(true);
    try {
      await api.post("/reservations", formData);
      setMessage({ type: "success", text: "Table booked! We will confirm it shortly." });
      loadReservations();
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: save the edited booking
  const handleUpdate = async (formData) => {
    setLoading(true);
    try {
      await api.put(`/reservations/${editing._id}`, formData);
      setEditing(null);
      setMessage({ type: "success", text: "Reservation updated." });
      loadReservations();
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  // DELETE: remove a booking
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reservation?")) return;
    try {
      await api.delete(`/reservations/${id}`);
      setMessage({ type: "success", text: "Reservation deleted." });
      loadReservations();
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    }
  };

  // Visitors who are not logged in see a message instead of the form
  if (!user) {
    return (
      <Container className="page py-5 text-center">
        <h2 className="section-title mb-3">Book a Table</h2>
        <Alert variant="info" className="d-inline-block">
          Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to book a table.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="page py-5">
      <h2 className="section-title text-center mb-4">Book a Table</h2>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })}>
          {message.text}
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h5 className="mb-3">New Reservation</h5>
              <ReservationForm
                initialData={{ customerName: user.name, email: user.email }}
                onSubmit={handleCreate}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h5 className="mb-3">My Reservations</h5>
              {reservations.length === 0 ? (
                <p className="text-muted mb-0">You have no reservations yet.</p>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r._id}>
                          <td>{r.bookingDate}</td>
                          <td>{r.bookingTime}</td>
                          <td>{r.guests}</td>
                          <td>
                            <Badge bg={statusColor[r.status]} className="text-capitalize">
                              {r.status}
                            </Badge>
                          </td>
                          <td className="text-nowrap">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="me-2"
                              disabled={r.status === "cancelled"}
                              onClick={() => setEditing(r)}
                            >
                              Edit
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(r._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit popup */}
      <Modal show={!!editing} onHide={() => setEditing(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editing && (
            <ReservationForm
              initialData={editing}
              onSubmit={handleUpdate}
              submitLabel="Save Changes"
              loading={loading}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Booking;
