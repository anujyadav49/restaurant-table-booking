import { useEffect, useState } from "react";
import { Container, Card, Table, Badge, Button, Modal, Alert, Row, Col, ButtonGroup } from "react-bootstrap";
import api, { getErrorMessage } from "../api";
import ReservationForm from "../components/ReservationForm";
import { statusColor } from "./Booking";

function AdminPanel() {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // READ: load every booking from every customer
  const loadReservations = async () => {
    try {
      const { data } = await api.get("/admin/reservations");
      setReservations(data);
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  // Confirm or cancel a booking
  const changeStatus = async (id, status) => {
    try {
      await api.put(`/admin/reservations/${id}/status`, { status });
      setMessage({ type: "success", text: `Reservation ${status}.` });
      loadReservations();
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    }
  };

  // UPDATE: edit booking details
  const handleUpdate = async (formData) => {
    setLoading(true);
    try {
      await api.put(`/admin/reservations/${editing._id}`, formData);
      setEditing(null);
      setMessage({ type: "success", text: "Reservation updated." });
      loadReservations();
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reservation permanently?")) return;
    try {
      await api.delete(`/admin/reservations/${id}`);
      setMessage({ type: "success", text: "Reservation deleted." });
      loadReservations();
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    }
  };

  const count = (status) => reservations.filter((r) => r.status === status).length;
  const visible = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  return (
    <Container className="page py-5">
      <h2 className="section-title text-center mb-4">Admin Panel</h2>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })}>
          {message.text}
        </Alert>
      )}

      {/* Summary numbers */}
      <Row className="g-3 mb-4 text-center">
        {[
          { label: "Total", value: reservations.length, color: "dark" },
          { label: "Pending", value: count("pending"), color: "warning" },
          { label: "Confirmed", value: count("confirmed"), color: "success" },
          { label: "Cancelled", value: count("cancelled"), color: "danger" },
        ].map((s) => (
          <Col xs={6} md={3} key={s.label}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className={`fs-2 fw-bold text-${s.color}`}>{s.value}</div>
                <div className="text-muted">{s.label}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <h5 className="mb-0">All Bookings</h5>
            <ButtonGroup size="sm">
              {["all", "pending", "confirmed", "cancelled"].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "dark" : "outline-dark"}
                  className="text-capitalize"
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Button>
              ))}
            </ButtonGroup>
          </div>

          {visible.length === 0 ? (
            <p className="text-muted mb-0">No reservations found.</p>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => (
                    <tr key={r._id}>
                      <td>{r.customerName}</td>
                      <td className="small">
                        {r.email}
                        <br />
                        {r.phone}
                      </td>
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
                          variant="success"
                          className="me-1"
                          disabled={r.status === "confirmed"}
                          onClick={() => changeStatus(r._id, "confirmed")}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="me-1"
                          disabled={r.status === "cancelled"}
                          onClick={() => changeStatus(r._id, "cancelled")}
                        >
                          Cancel
                        </Button>
                        <Button size="sm" variant="outline-primary" className="me-1" onClick={() => setEditing(r)}>
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

export default AdminPanel;
