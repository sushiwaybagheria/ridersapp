import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";

// react-bootstrap components
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
    cliente: "",
    indirizzo: "",
    dataConsegna: "",
    orarioConsegna: "",
    note: ""
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
        stato: "disponibile",
        assegnatoA: null
      });
      alert("Ordine aggiunto con successo!");
      setOrder({
        cliente: "",
        indirizzo: "",
        dataConsegna: "",
        orarioConsegna: "",
        note: ""
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
                  <Col md="6">
                    <Form.Group>
                      <label>Cliente</label>
                      <Form.Control
                        placeholder="Nome cliente"
                        type="text"
                        name="cliente"
                        value={order.cliente}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Indirizzo</label>
                      <Form.Control
                        placeholder="Indirizzo di consegna"
                        type="text"
                        name="indirizzo"
                        value={order.indirizzo}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <label>Data Consegna</label>
                      <Form.Control
                        type="date"
                        name="dataConsegna"
                        value={order.dataConsegna}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Orario Consegna</label>
                      <Form.Control
                        placeholder="Es. 21:00"
                        type="time"
                        name="orarioConsegna"
                        value={order.orarioConsegna}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Note</label>
                      <Form.Control
                        placeholder="Note aggiuntive"
                        type="text"
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
