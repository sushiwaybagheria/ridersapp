import React from "react";
import { useNavigate } from "react-router-dom";

// react-bootstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

function Orders() {
  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate("/admin/order-form");
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title as="h4">Ordini Riders</Card.Title>
                <p className="card-category">Visualizza tutti gli ordini registrati</p>
              </div>
              <Button variant="success" size="sm" onClick={handleAddOrder}>
                + Aggiungi Ordine
              </Button>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Data</th>
                    <th>Rider</th>
                    <th>Zona</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Qui andranno gli ordini */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Orders;
