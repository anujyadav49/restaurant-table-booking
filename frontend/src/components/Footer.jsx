import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="app-footer text-center py-4">
      <Container>
        <p className="mb-1">🍽️ La Bella Tavola · 12 Garden Road, Bareilly</p>
        <small>© {new Date().getFullYear()} La Bella Tavola. All rights reserved.</small>
      </Container>
    </footer>
  );
}

export default Footer;
