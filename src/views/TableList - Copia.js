import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

// react-bootstrap components
import {
  Button,
  Card,
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
    const data = querySnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

console.log("🟡 Riders caricati:", data);
      setRiders(data);
    };

    fetchRiders();
  }, []);




const handleDelete = async (id) => {
  if (window.confirm("Vuoi eliminare questo rider?")) {
    try {
      await deleteDoc(doc(db, "riders", id));
      setRiders((prev) => prev.filter((r) => r.id !== id));
      alert("Rider eliminato con successo!");
    } catch (error) {
      console.error("Errore eliminazione:", error);
      alert("Errore durante l'eliminazione");
    }
  }
};

const handleEditRider = (rider) => {
  // Navigazione al form passando il rider (da implementare in RiderForm)
  window.location.href = `/admin/rider-form?id=${rider.id}`;
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
                    <th className="border-0">Consegne</th>
                    <th className="border-0">Note</th>
                    <th className="border-0">Data Reg.</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((r, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{r.cognome}</td>
                      <td>{r.nome}</td>
                      <td>{r.eta}</td>
                      <td>{r.telefono}</td>

                  <td>
  {r.mezzo === "BICI" && "🚲 BICI"}
  {r.mezzo === "MOTO" && "🏍️ MOTO"}
  {r.mezzo === "AUTO" && "🚗 AUTO"}
  {r.mezzo === "MINICAR" && "🚙 MINICAR"}
  {r.mezzo === "ALTRO" && "❓ ALTRO"}
</td>


                      <td>{r.disponibilita}</td>
                      <td>{r.numero_consegne}</td>
                      <td>{r.note}</td>
                     <td>{r.data_reg?.toDate().toLocaleString()}</td>


<td>
  <Button
    variant="warning"
    size="sm"
    className="me-2"
    onClick={() => handleEditRider(r)}
  >
    Modifica
  </Button>
  <Button
    variant="danger"
    size="sm"
    onClick={() => handleDelete(r.id)}
  >
    Elimina
  </Button>
</td>


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

export default TableList;
