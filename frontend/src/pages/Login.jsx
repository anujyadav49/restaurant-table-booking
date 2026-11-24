import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      // Admins go to the admin panel, customers go to the booking page
      navigate(user.role === "admin" ? "/admin" : "/booking");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="page py-5 d-flex justify-content-center">
      <Card className="auth-card shadow border-0 w-100">
        <Card.Body className="p-4">
          <h3 className="text-center mb-4">Welcome Back</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={form.password} onChange={handleChange} placeholder="Your password" required />
            </Form.Group>
            <Button type="submit" variant="warning" className="w-100 fw-semibold" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
