import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "ordini_riders"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setOrders(data);
    };

    fetchOrders();
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
                    <th className="border-0">Cliente</th>
                    <th className="border-0">Indirizzo</th>
                    <th className="border-0">Data</th>
                    <th className="border-0">Orario</th>
                    <th className="border-0">Note</th>
                    <th className="border-0">Stato</th>
                    <th className="border-0">Assegnato A</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{o.cliente}</td>
                      <td>{o.indirizzo}</td>
                      <td>{o.dataConsegna}</td>
                      <td>{o.orarioConsegna}</td>
                      <td>{o.note}</td>
                      <td>{o.stato}</td>
                      <td>{o.assegnatoA || "-"}</td>
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
