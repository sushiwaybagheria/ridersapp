import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { Modal. Form } from "react-bootstrap";
import { updateDoc, where, query } from "firebase/firestore";


import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";

function Orders() {
  const [ordini, setOrdini] = useState([]);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [ridersDisponibili, setRidersDisponibili] = useState([]);
  const [ordineSelezionato, setOrdineSelezionato] = useState(null);
  const [riderScelto, setRiderScelto] = useState("");








  const fetchOrdini = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ordini_riders"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Dati ordini:", data);
      setOrdini(data);
    } catch (error) {
      console.error("Errore nel recupero ordini:", error);
    }
  };

  useEffect(() => {
    fetchOrdini();
  }, []);

  const handleEdit = (ordineId) => {
    console.log("🟠 Ordine ID su pulsante modifica:", ordineId);
    history.push(`/admin/order-form/${ordineId}`);
  };






const apriModaleAssegna = async (ordine) => {
  setOrdineSelezionato(ordine);
  setShowModal(true);

  const q = query(collection(db, "riders"), where("disponibilita", "==", true));
  const snapshot = await getDocs(q);
  const riders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setRidersDisponibili(riders);
};

const assegnaOrdine = async () => {
  if (!riderScelto || !ordineSelezionato) return;

  const ordineRef = doc(db, "ordini_riders", ordineSelezionato.id);
  await updateDoc(ordineRef, { assegnatoA: riderScelto });

  setShowModal(false);
  setRiderScelto("");
  setOrdineSelezionato(null);
  fetchOrdini();
};








  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo ordine?")) {
      await deleteDoc(doc(db, "ordini_riders", id));
      fetchOrdini();
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Elenco Ordini</Card.Title>
              <p className="card-category">Visualizza tutti gli ordini effettuati</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ORD</th>
                    <th>FASCIA</th>
                    <th>Cliente</th>
                    <th>Indirizzo</th>
                    <th>Tel</th>
                    <th>Note</th>
                    <th>SPESE</th>
                    <th>PAG.</th>
                    <th>Tot.(€)</th>
                    <th>Data</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {ordini.map((ordine, idx) => (
                    <tr key={ordine.id}>
                      <td>{idx + 1}</td>
                      <td>{ordine.ID || "-"}</td>
                      <td>{ordine.orarioConsegna || "-"}</td>
                      <td>{ordine.cliente || "-"}</td>
                      <td>
                        {ordine.indirizzo || "-"}
                        {ordine.civico ? `, ${ordine.civico}` : ""}
                        {ordine.interno ? `, int. ${ordine.interno}` : ""}
                      </td>
                      <td>{ordine.telefono || "-"}</td>
                      <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {ordine.note || "-"}
                      </td>
                      <td>{ordine.speseConsegna || "-"}</td>
                      <td>{ordine.modalitaPagamento || "-"}</td>
                      <td>{ordine.totaleOrdine || "-"}</td>
                      <td>{ordine.dataConsegna || "-"}</td>
                      <td>
                       








<Button variant="warning" size="sm" onClick={() => handleEdit(ordine.id)} className="me-1">
  ✏️
</Button>

<Button variant="primary" size="sm" onClick={() => apriModaleAssegna(ordine)} className="me-1">
  📋
</Button>

<Button variant="danger" size="sm" onClick={() => handleDelete(ordine.id)}>
  🗑️
</Button>





                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>





<Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Assegna Ordine</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Seleziona un rider disponibile:</p>
    <Form.Select
      value={riderScelto}
      onChange={(e) => setRiderScelto(e.target.value)}
    >
      <option value="">-- Seleziona un rider --</option>
      {ridersDisponibili.map((rider) => (
        <option key={rider.id} value={rider.id}>
          {rider.nome} {rider.cognome}
        </option>
      ))}
    </Form.Select>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Annulla
    </Button>
    <Button
      variant="success"
      onClick={assegnaOrdine}
      disabled={!riderScelto}
    >
      Assegna
    </Button>
  </Modal.Footer>
</Modal>




      </Row>
    </Container>
  );
}

export default Orders;
