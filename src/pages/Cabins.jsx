import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  const [showForm, setShowFrom] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />

        <Button onClick={() => setShowFrom((show) => !show)}>
          {!showForm ? "Add new cabin" : "Close Form"}
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
