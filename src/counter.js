import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import "./styles.css";

// crt+shift+p
function Counter({ color, emoji, type }) {
  const [counter, setCounter] = useState(0);
  const counterStyles = {
    fontSize: "25px",
    fontWeight: "bold",
    color
  };
  return (
    <IconButton
      size="large"
      style={counterStyles}
      onClick={() => setCounter(counter + 1)}
    >
      <Badge badgeContent={counter} color={type}>
        {emoji}
      </Badge>
    </IconButton>
  );
}

const x = "this is good!!!";

const y = "this is nice!!!";

export { Counter };
