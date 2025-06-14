import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebase.js";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function TableList() {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const querySnapshot = await getDocs(collection(db, "riders"));
      const ridersData = querySnapshot.docs.map((doc, index) => ({ id: doc.id, index: index + 1, ...doc.data() }));
      setRiders(ridersData);
    };
    fetchRiders();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Elenco Riders</Card.Title>
                <p className="card-category">Tutti i rider registrati nel sistema</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Cognome</th>
                      <th className="border-0">Nome</th>
                      <th className="border-0">Età</th>
                      <th className="border-0">Telefono</th>
                      <th className="border-0">Mezzo</th>
                      <th className="border-0">Disponibilità</th>
                      <th className="border-0">Consegne</th>
                      <th className="border-0">Note</th>
                      <th className="border-0">Data Reg.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riders.map((rider) => (
                      <tr key={rider.id}>
                        <td>{rider.index}</td>
                        <td>{rider.COGNOME}</td>
                        <td>{rider.NOME}</td>
                        <td>{rider.ETA}</td>
                        <td>{rider.TELEFONO}</td>
                        <td>{rider.MEZZO}</td>
                        <td>{rider.DISPONIBILITA}</td>
                        <td>{rider.NUMERO_CONSEGNE}</td>
                        <td>{rider.NOTE}</td>
                        <td>{rider.DATA_REG}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
