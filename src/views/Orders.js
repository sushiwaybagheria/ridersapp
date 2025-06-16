import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import {
  Card,
  Table,
  Container,
  Row,
  Col
} from "react-bootstrap";

function Orders() {
  const [ordini, setOrdini] = useState([]);

  useEffect(() => {
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

    fetchOrdini();
  }, []);

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
                    </tr>
                  ))}
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
