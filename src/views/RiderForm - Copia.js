import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function RiderForm() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    eta: "",
    telefono: "",
    mezzo: "",
    disponibilita: "",
    numero_consegne: "",
    note: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "riders"), {
        ...formData,
        numero_consegne: Number(formData.numero_consegne),
        eta: Number(formData.eta),
        data_reg: serverTimestamp()
      });
      alert("Rider aggiunto con successo!");
      setFormData({
        nome: "",
        cognome: "",
        eta: "",
        telefono: "",
        mezzo: "",
        disponibilita: "",
        numero_consegne: "",
        note: ""
      });
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
      alert("Errore durante il salvataggio.");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Nuovo Rider</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <label>Nome</label>
                      <Form.Control
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Cognome</label>
                      <Form.Control
                        type="text"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="4">
                    <Form.Group>
                      <label>Età</label>
                      <Form.Control
                        type="number"
                        name="eta"
                        value={formData.eta}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Telefono</label>
                      <Form.Control
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">




<Form.Group>
  <label>Mezzo</label>
  <Form.Control
    as="select"
    name="mezzo"
    value={formData.mezzo}
    onChange={handleChange}
    required
  >
    <option value="">Seleziona un mezzo</option>
    <option value="AUTO">AUTO</option>
    <option value="MOTO">MOTO</option>
    <option value="BICI">BICI</option>
    <option value="MINICAR">MINICAR</option>
    <option value="ALTRO">ALTRO</option>
  </Form.Control>
</Form.Group>






                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <Form.Group>
                      <label>Disponibilità</label>
                      <Form.Control
                        type="text"
                        name="disponibilita"
                        value={formData.disponibilita}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Numero consegne</label>
                      <Form.Control
                        type="number"
                        name="numero_consegne"
                        value={formData.numero_consegne}
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
                        as="textarea"
                        rows="3"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="btn-fill pull-right" type="submit" variant="info">
                  Salva Rider
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

export default RiderForm;
