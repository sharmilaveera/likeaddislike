import { useState } from "react";
import "./styles.css";

// jsx - js extended
// App component

import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  // const intialPoll = [
  //   {
  //     company: "Apple",
  //     color: "white",
  //     content:
  //       "The iPhone is a smartphone made by Apple that combines a computer."
  //   },
  //   {
  //     company: "Samsung",
  //     color: "skyblue",
  //     content:
  //       "Samsung packs its flagship phones with a slew of features—some are even better than stock Android."
  //   },
  //   {
  //     company: "MI",
  //     color: "orange",
  //     content:
  //       "Redmi is a sub-brand owned by the Chinese electronics company Xiaomi"
  //   },
  //   {
  //     company: "Oneplus",
  //     color: "red",
  //     content:
  //       "Since very beginning Dash Charging has been one of the key features of the OnePlus phones"
  //   },
  //   {
  //     company: "Moto",
  //     color: "grey",
  //     content:
  //       "Motorola primarily manufactures smartphones and other mobile devices running the Android operating system developed by Google."
  //   }
  // ];
  // react tracking then renders
  const [poll, setPoll] = useState([]);
  const [content, setContent] = useState(" ");

  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);
  const addContestant = () => {
    setPoll(poll.concat({ company, color, content }));
    setOpen(true);
  };
  localStorage.setItem("theme", "dark");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // typing -> onChange - trigger -> event.target.value (contains new value)
  // -> setCompany -> company
  // -> setColor -> color
  fetch("https://60e3e5fe6c365a0017839411.mockapi.io/poll", {
    method: "GET"
  })
    .then((data) => data.json())
    .then((pollVote) => setPoll(pollVote));

  return (
    <div>
      <div className="vote-form">
        <TextField
          variant="outlined"
          size="small"
          onChange={(event) => setCompany(event.target.value)}
          label="Enter company"
        />
        {/* BG color must change when you type in the input */}
        <TextField
          variant="outlined"
          size="small"
          style={{ color }}
          onChange={(event) => setColor(event.target.value)}
          label="Enter color"
        />
        <TextField
          variant="outlined"
          size="small"
          onChange={(event) => setContent(event.target.value)}
          label="Enter content"
        />
        <Button
          onClick={addContestant}
          variant="contained"
          size="medium"
          color="secondary"
        >
          +Add
        </Button>
        {/*<button onClick={addContestant}>+Add</button>*/}
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
    </div>
  );
}
// Vote is child component of App
// Which is the child component of Vote? Counter & Content

function Vote({ color, company, content }) {
  // console.log(props);
  // state - data - likes
  // ternary operator used
  // const bgStyle = { backgroundColor: likes >= dislikes ? "green" : "crimson" };
  const bgStyle = { backgroundColor: "#eee" };

  return (
    <div className="vote-system">
      <card>
        <h4 style={{ color }}>{company}</h4>
        <Counter color="orchid" emoji="👍" type="primary" />
        {/* ctrl+/ */}
        {/* Task is to refactor the dislike button using Counter component */}
        <Counter color="crimson" emoji="👎" type="secondary" />
        <Content content={content} />
      </card>
    </div>
  );
}

// DRY - Dont Repeat Yourself
// Clue  - Convert color & emoji as props
// common - counter , different - thumbs up/down, color - green,red
// First letter must be capital
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

//1. Task
// Each company different content
// Adding company you add with a content

//2. Task
// Build show more recipe
// map - loop all the recipes
// Add recipes

// Show More -> Show Less -> Show More
// expanded === true ? false : true;
// !expanded
// true -> click -> false -> click -> true ....

// 10 > 7 ? 'Awesome' : 'cool';

// function Counter(props) {
function Counter({ color, emoji, type }) {
  // Destructure props
  // const {color, emoji} = props;
  const [counter, setCounter] = useState(0); // React hook
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
      {/* <button style={counterStyles} onClick={() => counter = counter + 1}> */}

      <Badge badgeContent={counter} color={type}>
        {emoji}
      </Badge>
    </IconButton>
  );
}
