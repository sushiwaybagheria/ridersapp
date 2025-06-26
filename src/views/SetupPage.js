import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Bootstrap
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

function SetupPage() {
  const [indirizzo, setIndirizzo] = useState("");
  const [rimborso, setRimborso] = useState("");
  const [salvato, setSalvato] = useState(false);
  const [errore, setErrore] = useState("");

  // 🔄 Carica impostazioni esistenti
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "config");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIndirizzo(data.indirizzo || "");
          setRimborso(data.rimborso || "");
        }
      } catch (err) {
        console.error("Errore nel recupero settings:", err);
        setErrore("Errore nel caricamento delle impostazioni");
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "settings", "config"), {
        indirizzo,
        rimborso,
      });
      setSalvato(true);
      setErrore("");
      setTimeout(() => setSalvato(false), 2000);
    } catch (err) {
      console.error("Errore nel salvataggio:", err);
      setErrore("Errore nel salvataggio");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8" className="mx-auto">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Impostazioni Generali</Card.Title>
              <p className="card-category">Configura indirizzo e rimborso</p>
            </Card.Header>
            <Card.Body>
              {salvato && <Alert variant="success">Impostazioni salvate ✅</Alert>}
              {errore && <Alert variant="danger">{errore}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Indirizzo del Ristorante</Form.Label>
                  <Form.Control
                    type="text"
                    value={indirizzo}
                    onChange={(e) => setIndirizzo(e.target.value)}
                    placeholder="Via Roma 123, Palermo"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Rimborso €/km</Form.Label>
                  <Form.Control
                    type="number"
                    value={rimborso}
                    onChange={(e) => setRimborso(e.target.value)}
                    placeholder="Es. 0.35"
                    step="0.01"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-4">
                  Salva impostazioni
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SetupPage;
