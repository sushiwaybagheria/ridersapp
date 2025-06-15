// src/views/Orders.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Orders() {
  const [ordini, setOrdini] = useState([]);

  useEffect(() => {
    const fetchOrdini = async () => {
      const querySnapshot = await getDocs(collection(db, "ordini_riders"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrdini(data);
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
              <p className="card-category">Tutti gli ordini registrati</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">#</th>
                    <th className="border-0">ID</th>
                    <th className="border-0">Cliente</th>
                    <th className="border-0">Telefono</th>
                    <th className="border-0">Indirizzo</th>
                    <th className="border-0">Orario</th>
                    <th className="border-0">Stato</th>
                    <th className="border-0">Assegnato A</th>
                    <th className="border-0">Note</th>
                    <th className="border-0">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {ordini.map((ordine, idx) => (
                    <tr key={ordine.id}>
                      <td>{idx + 1}</td>
                      <td>{ordine.ID}</td>
                      <td>{ordine.cliente}</td>
                      <td>{ordine.telefono}</td>
                      <td>{ordine.indirizzo}</td>
                      <td>{ordine.orarioConsegna}</td>
                      <td>{ordine.stato}</td>
                      <td>{ordine.assegnatoA || "-"}</td>
                      <td>{ordine.note}</td>
                      <td>{ordine.dataConsegna}</td>
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
