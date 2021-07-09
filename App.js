import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";

// default - export
import Content from "./Content";
// named - export - as syntax
import { Counter } from "./Counter";
import "./styles.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  // const intialPoll = [
  //   { company: "Apple", color: "grey", content: "US based company" },
  //   { company: "Samsung", color: "skyblue", content: "Korean based company" },
  //   { company: "MI", color: "orange", content: "China based company" },
  //   { company: "Oneplus", color: "red", content: "China based company" },
  //   { company: "Moto", color: "#000080", content: "US based company" }
  // ];
  // react tracking then renders
  const [poll, setPoll] = useState([]);

  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const addContestant = () => {
    setPoll(poll.concat({ company, color, content }));
    setOpen(true);
  };
  localStorage.setItem("theme", "dark");
  // typing -> onChange - trigger -> event.target.value (contains new value)
  // -> setCompany -> company
  // -> setColor -> color
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // on load of component
  useEffect(() => {
    fetch("https://60e3e5fe6c365a0017839411.mockapi.io/poll", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((pollVote) => setPoll(pollVote));
  }, []);
  // dependency array - empty -> component is loaded

  // Add contestant to api task

  // +Add -> open is true -> 2000ms or close button -> open is set false
  return (
    <div>
      {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
      <div className="vote-form">
        <TextField
          variant="outlined"
          onChange={(event) => setCompany(event.target.value)}
          label="Enter company"
        />
        {/* BG color must change when you type in the input */}
        <TextField
          variant="outlined"
          style={{ backgroundColor: color }}
          onChange={(event) => setColor(event.target.value)}
          label="Enter color"
        />
        <TextField
          variant="outlined"
          onChange={(event) => setContent(event.target.value)}
          label="Enter content"
        />
        <Button onClick={addContestant} variant="outlined" color="primary">
          +Add
        </Button>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Successfully Added {company}
        </Alert>
      </Snackbar>

      <div className="poll">
        {poll.map((detalil) => (
          <Vote
            company={detalil.company}
            color={detalil.color}
            content={detalil.content}
          />
        ))}
      </div>
    </div>
  );
}

function Vote({ color, company, content }) {
  const bgStyle = { backgroundColor: "#eee" };
  return (
    <div className="vote-system">
      <Card>
        <h4 style={{ color }}>{company}</h4>
        <Counter color="orchid" emoji="👍" type="primary" />
        <Counter color="crimson" emoji="👎" type="secondary" />
        <Content content={content} />
      </Card>
    </div>
  );
}
