import { Button, Input } from "@mui/material";
import { observer } from "mobx-react-lite";
import { CSSProperties, useState } from "react";
import { useStore } from "../store";

const innerContainerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

function DiscountPercentage(props: any) {
  const { entityStore } = useStore();

  const [output, setOutput] = useState(0);
  const [input, setInput] = useState(0);

  const handleSubmit = async () => {
    const discount = await entityStore.getDiscountPercentage(input);
    setOutput(discount * 100);
  };

  return (
    <div>
      <h1>Calculate discount percentage</h1>
      <div style={innerContainerStyles}>
        <Input
          placeholder="enter value"
          type="number"
          onChange={(e) => {
            const text = e.target.value;
            setInput(parseInt(text));
          }}
        />
        <h2 style={{ marginRight: 20, marginLeft: 20 }}>{output}%</h2>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default observer(DiscountPercentage);
