import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import MezzoIcon from "components/MezzoIcon";

// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";


import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";




function TableList() {
  const [riders, setRiders] = useState([]);
  const [ordiniAssegnati, setOrdiniAssegnati] = useState({});
  const history = useHistory();

  // 🔄 Recupera riders
  const fetchRiders = async () => {
    const querySnapshot = await getDocs(collection(db, "riders"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRiders(data);
  };

  // 📦 Recupera ordini assegnati
  const fetchOrdiniAssegnati = async () => {
    const ordiniSnapshot = await getDocs(collection(db, "ordini_riders"));
    const mappa = {};
    ordiniSnapshot.forEach((doc) => {
      const data = doc.data();
      const riderId = data.assegnatoA;
      if (riderId) {
        if (!mappa[riderId]) mappa[riderId] = [];
        mappa[riderId].push(data.ID || doc.id); // usa il campo ID o l'ID del doc
      }
    });
    setOrdiniAssegnati(mappa);
  };

  useEffect(() => {
    fetchRiders();
    fetchOrdiniAssegnati();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo rider?")) {
      await deleteDoc(doc(db, "riders", id));
      fetchRiders();
      fetchOrdiniAssegnati();
    }
  };

  const handleEdit = (riderId) => {
    history.push(`/admin/rider-form/${riderId}`);
  };

  return (
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
                    <th className="border-0">Assegnati</th>
                    <th className="border-0">Note</th>
                    <th className="border-0">Data Reg.</th>
                    <th className="border-0">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((r, idx) => {
                    const ordini = ordiniAssegnati[r.id] || [];
                    const hasOrdini = ordini.length > 0;
                    const tooltip = hasOrdini
                      ? `Ordini: ${ordini.join(", ")}`
                      : "Nessun ordine";

                    return (
                      <tr key={r.id}>
                        <td>{idx + 1}</td>
                        <td>{r.cognome}</td>
                        <td>{r.nome}</td>
                        <td>{r.eta}</td>
                        <td>{r.telefono}</td>
                        <td><MezzoIcon tipo={r.mezzo} /></td>
                        <td>{r.disponibilita}</td>









                  <td>
  <OverlayTrigger
    placement="top"
    overlay={
      <Tooltip>
        {r.ordiniAssegnati?.length > 0
          ? r.ordiniAssegnati.join(", ")
          : "Nessun ordine assegnato"}
      </Tooltip>
    }
  >
    <span>
      {r.ordiniAssegnati?.length > 0 ? "🟢" : "🔴"}
    </span>
  </OverlayTrigger>
</td>










                        <td>{r.note}</td>
                        <td>{r.data_reg?.toDate().toLocaleString()}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEdit(r.id)}
                            className="me-1"
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(r.id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TableList;
