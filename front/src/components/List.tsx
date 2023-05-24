import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteButton from "./DeleteButton";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { Button, Input } from "@mui/material";
import { entityFieldsByType } from "../utils/entity-fields-by-type";
import { entityViews } from "../utils/entity-views";
import { CSSProperties } from "react";

interface Props {
  type: string;
  items: Record<string, string>[];
  onSearchChange?: (search: string, type: string) => void;
  toShow?: boolean;
}

const searchContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const searchStringStyle: CSSProperties = {
  marginRight: 20,
};

function List(props: Props) {
  const { type, items, onSearchChange, toShow } = props;

  const { entityStore } = useStore();

  const isView = entityViews.find((v) => v === type) || toShow === false;
  const keys = entityFieldsByType(type);

  const generateTableHead = () => {
    return [
      <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>,
      ...keys.map((key) => <TableCell>{key}</TableCell>),
    ];
  };

  const generateBodyItem = (item: any) => {
    return [
      isView ? (
        <>.</>
      ) : (
        <DeleteButton
          id={item.id}
          onClick={() => entityStore.deleteEntity(type, item.id)}
        />
      ),
      ...keys.map((key) => (
        <TableCell
          component="th"
          scope="row"
          key={key}
          onClick={() => {
            if (!isView) entityStore.setEditEntity(item, type);
          }}
        >
          {item[key]}
        </TableCell>
      )),
    ];
  };

  const generateBodyTable = () => {
    return items.map((item) => (
      <TableRow
        key={item.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {generateBodyItem(item)}
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      {onSearchChange ? (
        <div style={searchContainerStyle}>
          <h1 style={searchStringStyle}>Search</h1>
          <Input
            onChange={(e) => {
              onSearchChange(e.target.value, type);
            }}
          />
        </div>
      ) : null}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>{generateTableHead()}</TableRow>
        </TableHead>
        <TableBody>{generateBodyTable()}</TableBody>
      </Table>
      {!isView ? (
        <div style={{ display: "flex", justifyContent: "center", margin: 30 }}>
          <Button
            style={{ width: 300 }}
            variant="contained"
            onClick={() => {
              entityStore.setAddEntity(type);
            }}
          >
            Add item
          </Button>
        </div>
      ) : null}
    </TableContainer>
  );
}

export default observer(List);
