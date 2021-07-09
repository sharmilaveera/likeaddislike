import { Button } from "@material-ui/core";
import { useState } from "react";

function Content({ content }) {
  const [expanded, setExpanded] = useState(true); // true
  // condtional rendering
  return (
    <div style={{ marginTop: "10px" }}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setExpanded(!expanded)}
      >
        Show {expanded ? "Less" : "More"}
      </Button>
      {expanded ? <p> {content} </p> : ""}
    </div>
  );
}

// only one you can export
export default Content;
