import { Input } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../store";
import { debounce } from "../utils/debounce";
import List from "./List";

interface Props {}

function CustomerOrders({}: Props) {
  const { entityStore } = useStore();
  const [items, setItems] = useState<any>([]);
  const [error, setError] = useState(null);
  console.log("🚀 ~ file: CustomerOrders.tsx:13 ~ CustomerOrders ~ items:", items)

  const handleCustomerIdType = async (e: any) => {
    const id = e.target.value;
    try {
      setItems(await entityStore.getCustomerOrders(id));
      setError(null)
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Customer orders</h1>
      <Input
        type="number"
        onChange={debounce(handleCustomerIdType, 500)}
        placeholder="type customer id"
      />
      {error ? <h2>{error}</h2> : null}
      <List toShow={false} items={[items]} type={"customerOrders"} />
    </div>
  );
}

export default CustomerOrders;
