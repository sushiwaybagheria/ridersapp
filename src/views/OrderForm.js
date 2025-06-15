import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function OrderForm() {
  const [order, setOrder] = useState({
    ID: "",
    cliente: "",
    indirizzo: "",
    telefono: "",
    orarioConsegna: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "ordini_riders"), {
        ...order,
        assegnatoA: null,
        stato: "disponibile",
        dataConsegna: new Date().toISOString().split("T")[0], // es: "2025-06-15"
      });
      alert("Ordine aggiunto con successo!");
      setOrder({
        ID: "",
        cliente: "",
        indirizzo: "",
        telefono: "",
        orarioConsegna: "",
        note: "",
      });
    } catch (error) {
      console.error("Errore durante l'aggiunta dell'ordine:", error);
      alert("Errore durante l'aggiunta dell'ordine");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Aggiungi Ordine</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="4">
                    <Form.Group>
                      <label>ID</label>
                      <Form.Control
                        type="number"
                        name="ID"
                        value={order.ID}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Cliente</label>
                      <Form.Control
                        name="cliente"
                        value={order.cliente}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Telefono</label>
                      <Form.Control
                        name="telefono"
                        value={order.telefono}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <Form.Group>
                      <label>Indirizzo</label>
                      <Form.Control
                        name="indirizzo"
                        value={order.indirizzo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Orario Consegna</label>
                      <Form.Control
                        name="orarioConsegna"
                        value={order.orarioConsegna}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Note</label>
                      <Form.Control
                        name="note"
                        value={order.note}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="btn-fill pull-right" type="submit" variant="info">
                  Salva Ordine
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderForm;
