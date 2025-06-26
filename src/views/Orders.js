import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

import { updateDoc, where, query } from "firebase/firestore";
import "../assets/css/modal.css";




// 🔁 Funzione per calcolare distanza e rimborso con Google Distance Matrix API
const calcolaDistanzaEur = async (indirizzoCliente, indirizzoRistorante, rimborsoPerKm) => {
  const encodedRistorante = encodeURIComponent(indirizzoRistorante);
  const encodedCliente = encodeURIComponent(indirizzoCliente);
  const apiKey = "AIzaSyB3lddst7ZfQj5vi2F4p3Ww8UL5GhK6D2o";

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedRistorante}&destinations=${encodedCliente}&key=${apiKey}&language=it`;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // workaround per evitare CORS in dev
  const response = await fetch(proxyUrl + url);
  const data = await response.json();

  if (
    data.rows &&
    data.rows[0] &&
    data.rows[0].elements &&
    data.rows[0].elements[0].status === "OK"
  ) {
    const distanzaMetri = data.rows[0].elements[0].distance.value;
    const distanzaKm = distanzaMetri / 1000;
    const rimborso = distanzaKm * rimborsoPerKm;
    return {
      km: distanzaKm.toFixed(2),
      euro: rimborso.toFixed(2),
    };
  } else {
    console.error("Errore nella risposta Distance Matrix:", data);
    return { km: "-", euro: "-" };
  }
};












import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Orders() {
  const [ordini, setOrdini] = useState([]);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [ridersDisponibili, setRidersDisponibili] = useState([]);
  const [ordineSelezionato, setOrdineSelezionato] = useState(null);
 
// 📏 Distanze e rimborsi calcolati per ogni ordine
const [distanze, setDistanze] = useState({});


 const [riderScelto, setRiderScelto] = useState("");
  const [mappaRider, setMappaRider] = useState({});



// 📦 Impostazioni da Firestore
const [indirizzoRistorante, setIndirizzoRistorante] = useState("");
const [rimborsoKm, setRimborsoKm] = useState(0.1); // valore di default











 const fetchOrdini = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "ordini_riders"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOrdini(data);

    const distanzeTemp = {};

    for (const ordine of data) {
      const indirizzoCompleto = `${ordine.indirizzo || ""} ${ordine.civico || ""} ${ordine.interno || ""}`;
      const risultato = await calcolaDistanzaEur(indirizzoCompleto, indirizzoRistorante, rimborsoKm);
      distanzeTemp[ordine.id] = risultato;
    }

    setDistanze(distanzeTemp);
  } catch (error) {
    console.error("Errore nel recupero ordini:", error);
  }
};


  const fetchTuttiIRiders = async () => {
    const q = query(collection(db, "riders"));
    const snapshot = await getDocs(q);
    const mappa = {};
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      mappa[doc.id] = `${data.nome} ${data.cognome}`;
    });
    setMappaRider(mappa);
  };




// 🔁 Carica impostazioni generali (indirizzo ristorante e rimborso €/km)
const fetchSettings = async () => {
  try {
    const docRef = doc(db, "settings", "config");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setIndirizzoRistorante(data.indirizzo || "");
      setRimborsoKm(parseFloat(data.rimborso || 0.1));
    }
  } catch (err) {
    console.error("Errore nel caricamento settings:", err);
  }
};






useEffect(() => {
  fetchSettings();
  fetchOrdini();
  fetchTuttiIRiders();
}, []);


  const handleEdit = (ordineId) => {
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
<th>Rimborso</th>

                    <th>Assegnato</th>
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


<td>
  {distanze[ordine.id] ? (
    <>
      {distanze[ordine.id].km} km<br />
      💶 {distanze[ordine.id].euro} €
    </>
  ) : (
    "-"
  )}
</td>

                        {ordine.assegnatoA ? (
                          <span
                            title={`Assegnato a ${mappaRider[ordine.assegnatoA] || ""}`}
                            style={{ cursor: "pointer", color: "green", textDecoration: "underline" }}
                            onClick={() => history.push(`/admin/rider-form/${ordine.assegnatoA}`)}
                          >
                            ✅ Sì
                          </span>
                        ) : (
                          "⛔ No"
                        )}
                      </td>
                      <td>
                        <Button variant="warning" size="sm" onClick={() => handleEdit(ordine.id)} className="me-1">✏️</Button>
                        <Button variant="primary" size="sm" onClick={() => apriModaleAssegna(ordine)} className="me-1">📋</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(ordine.id)}>🗑️</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <h4>Assegna Ordine</h4>
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
            <div className="custom-modal-buttons mt-3 d-flex justify-content-between">
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
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Orders;
