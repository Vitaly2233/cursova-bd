import { Button } from "@mui/material";

const styles = {
  width: 50,
  height: 50,
};

interface Props {
  id: number;
  onClick: (id: number) => void;
}

function DeleteButton({ id, onClick }: Props) {
  return (
    <Button
      style={styles}
      variant="contained"
      onClick={() => {
        onClick(id);
      }}
      sx={{ ":hover": { backgroundColor: "red" } }}
    />
  );
}

export default DeleteButton;
