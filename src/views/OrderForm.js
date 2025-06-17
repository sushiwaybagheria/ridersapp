// OrderForm.jsx

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { addDoc, updateDoc, doc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function OrderForm() {
  const { id } = useParams();
  const history = useHistory();


const handleCancel = () => {
  history.push("/admin/orders");
};


  const [order, setOrder] = useState({
    ID: "",
    cliente: "",
    indirizzo: "",
    civico: "",
    interno: "",
    telefono: "",
    orarioConsegna: "18/20",
    note: "",
    speseConsegna: "",
    modalitaPagamento: "CONTANTI",
    totaleOrdine: "",
  });






 useEffect(() => {
  const fetchOrder = async () => {
    console.log("🧪 ID dell’ordine ricevuto da URL:", id);

    if (!id) return;

    try {
      const docRef = doc(db, "ordini_riders", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("✅ Documento trovato:", data);
        setOrder(data);
        console.log("📦 Stato aggiornato con:", data);
      } else {
        console.warn("⚠️ Documento non trovato in Firestore");
      }
    } catch (error) {
      console.error("❌ Errore nel caricamento ordine:", error);
    }
  };

  fetchOrder();
}, [id]);








  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Modifica
        const docRef = doc(db, "ordini_riders", id);
        await updateDoc(docRef, order);
        alert("Ordine aggiornato con successo!");
      } else {
        // Creazione nuovo ordine
        await addDoc(collection(db, "ordini_riders"), {
          ...order,
          assegnatoA: null,
          stato: "disponibile",
          dataConsegna: new Date().toISOString().split("T")[0],
        });
        alert("Ordine aggiunto con successo!");
      }
      history.push("/admin/orders");
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
      alert("Errore durante il salvataggio dell'ordine");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">{id ? "Modifica Ordine" : "Aggiungi Ordine"}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="2">
                    <Form.Group>
                      <label>ID</label>
                      <Form.Control type="text" name="ID" value={order.ID} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Cliente</label>
                      <Form.Control name="cliente" value={order.cliente} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Telefono</label>
                      <Form.Control name="telefono" value={order.telefono} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <Form.Group>
                      <label>Indirizzo</label>
                      <Form.Control name="indirizzo" value={order.indirizzo} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group>
                      <label>Civico</label>
                      <Form.Control name="civico" value={order.civico} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group>
                      <label>Interno</label>
                      <Form.Control name="interno" value={order.interno} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label style={{ color: "#565656" }}>Fascia Oraria</Form.Label>
                      <Form.Select name="orarioConsegna" value={order.orarioConsegna} onChange={handleChange}

className="form-control"
        style={{ color: "#565656", borderColor: "#e3e3e3" }}
      >
                        <option value="18/20">18/20</option>
                        <option value="20/22">20/22</option>
                        <option value="Altro">Altro</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label style={{ color: "#565656" }}>Spese di Consegna</Form.Label>
                      <Form.Control name="speseConsegna" value={order.speseConsegna} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label style={{ color: "#565656" }}>Modalità di Pagamento</Form.Label>
                      <Form.Select name="modalitaPagamento" value={order.modalitaPagamento} onChange={handleChange}




className="form-control"
        style={{ color: "#565656", borderColor: "#e3e3e3" }}
      >
                        <option value="CONTANTI">CONTANTI</option>
                        <option value="POS">POS</option>
                        <option value="PAGATO">PAGATO</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="8">




                   <Form.Group>
  <label>Note</label>
  <Form.Control name="note" value={order.note} onChange={handleChange} />
</Form.Group>
</Col>
<Col md="4">
  <Form.Group>
    <label>Totale Ordine (€)</label>
    <Form.Control name="totaleOrdine" value={order.totaleOrdine} onChange={handleChange} />
  </Form.Group>
</Col>
</Row>

<div className="d-flex justify-content-between">
  <Button className="btn-fill" type="submit" variant="info">
    {id ? "Aggiorna" : "Salva"} Ordine
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

export default OrderForm;
