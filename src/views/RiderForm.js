// RiderForm.jsx
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function RiderForm() {
  const [rider, setRider] = useState({
    nome: "",
    cognome: "",
    eta: "",
    telefono: "",
    mezzo: "",
    disponibilita: true,
    numero_consegne: 0,
    note: "",
  });

  const history = useHistory();
  const { id } = useParams();



  useEffect(() => {
  if (id) {
    const fetchRider = async () => {
      const docRef = doc(db, "riders", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRider({
          id: docSnap.id,
          ...docSnap.data()
        });
      }
    };
    fetchRider();
  }
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRider((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const docRef = doc(db, "riders", id);
        await updateDoc(docRef, rider);
        alert("Rider aggiornato con successo!");
      } else {
        await addDoc(collection(db, "riders"), {
          ...rider,
          data_reg: Timestamp.now(),
        });
        alert("Rider aggiunto con successo!");
      }
      history.push("/admin/riders");
    } catch (error) {
      console.error("Errore durante il salvataggio del rider:", error);
      alert("Errore durante il salvataggio del rider");
    }
  };

  const handleCancel = () => {
    history.push("/admin/riders");
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">{id ? "Modifica Rider" : "Aggiungi Rider"}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <label>Nome</label>
                      <Form.Control
                        placeholder="Nome"
                        type="text"
                        name="nome"
                        value={rider.nome}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Cognome</label>
                      <Form.Control
                        placeholder="Cognome"
                        type="text"
                        name="cognome"
                        value={rider.cognome}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Form.Group>
                      <label>Età</label>
                      <Form.Control
                        placeholder="Età"
                        type="number"
                        name="eta"
                        value={rider.eta}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Telefono</label>
                      <Form.Control
                        placeholder="Telefono"
                        type="text"
                        name="telefono"
                        value={rider.telefono}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Mezzo</label>
                      <Form.Control
                        as="select"
                        name="mezzo"
                        value={rider.mezzo}
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
                  <Col md="12">
                    <Form.Group>
                      <label>Note</label>
                      <Form.Control
                        placeholder="Note aggiuntive"
                        type="text"
                        name="note"
                        value={rider.note}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between">
                  <Button className="btn-fill" type="submit" variant="info">
                    {id ? "Aggiorna" : "Salva"} Rider
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Annulla
                  </Button>
                </div>
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
