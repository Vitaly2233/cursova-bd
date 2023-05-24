import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Input } from "@mui/material";
import { entityFieldsByType } from "../utils/entity-fields-by-type";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  p: 4,
};

interface Props {
  item: Record<string, string> | null;
  type: string;
  handleEditEntity: (modifiedEntity?: Record<string, string> | null) => void;
  handleOrderTotalClick: (id: number) => {};
}

function EditEntityModal({
  handleEditEntity,
  item,
  type,
  handleOrderTotalClick,
}: Props) {
  if (!item) return null;

  const keys = entityFieldsByType(type);

  const generateTableHead = () => {
    return keys.map((key) => <TableCell>{key}</TableCell>);
  };

  const generateBodyTable = () => {
    const orderTotal = (
      <Button
        variant="contained"
        onClick={() => {
          if (handleOrderTotalClick) handleOrderTotalClick(parseInt(item.id));
        }}
      >
        Get order total
      </Button>
    );
    const raws = keys.map((key) => {
      if (key === "id") {
        return (
          <TableCell component="th" scope="row" key={key}>
            {item[key]}
          </TableCell>
        );
      } else {
        return (
          <TableCell component="th" scope="row" key={key}>
            <Input
              defaultValue={item[key]}
              onChange={(event) => {
                item[key] = event.target.value;
              }}
            />
          </TableCell>
        );
      }
    });

    if (type === "goods") raws.push(orderTotal);

    return (
      <TableRow
        key={item.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {raws}
      </TableRow>
    );
  };

  return (
    <Modal
      open={!!item}
      onClose={() => handleEditEntity()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          style={{ textAlign: "center" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Edit entity
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>{generateTableHead()}</TableRow>
            </TableHead>
            <TableBody>{generateBodyTable()}</TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() => {
            handleEditEntity(item);
          }}
          style={{ alignSelf: "center", marginTop: 20 }}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}

export default EditEntityModal;
