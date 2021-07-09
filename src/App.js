import { useState, useEffect } from "react";
import "./styles.css";

// jsx - js extended
// App component

import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Link,
  Route,
  Switch,
  Redirect,
  useHistory,
  useParams,
  AddContestant
} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ALL_COMPANY_DETAIL = [
  {
    id: "1",
    company: "Apple",
    color: "white",
    content:
      "The iPhone is a smartphone made by Apple that combines a computer."
  },
  {
    id: "2",
    company: "Samsung",
    color: "skyblue",
    content:
      "Samsung packs its flagship phones with a slew of features—some are even better than stock Android."
  },
  {
    id: "3",
    company: "MI",
    color: "orange",
    content:
      "Redmi is a sub-brand owned by the Chinese electronics company Xiaomi"
  },
  {
    id: "4",
    company: "Oneplus",
    color: "red",
    content:
      "Since very beginning Dash Charging has been one of the key features of the OnePlus phones"
  },
  {
    id: "5",
    company: "Moto",
    color: "grey",
    content:
      "Motorola primarily manufactures smartphones and other mobile devices running the Android operating system developed by Google."
  }
];
export default function App() {
  const history = useHistory();
  const intialPoll = ALL_COMPANY_DETAIL;
  // react tracking then renders
  const [poll, setPoll] = useState([]);
  const [content, setContent] = useState(" ");
  const [search, setSearch] = useState("");

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
  useEffect(() => {
    fetch("https://60e3e5fe6c365a0017839411.mockapi.io/poll", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((pollVote) => setPoll(pollVote))
      .catch((err) => setPoll(intialPoll));
  }, []);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Button onClick={() => history.push("/")} color="inherit">
            Home
          </Button>
          <Button
            onClick={() => history.push("/Vote(oldPath)")}
            color="inherit"
          >
            Vote(oldPath)
          </Button>
          <Button onClick={() => history.push("/Poll")} color="inherit">
            Poll
          </Button>
          <Button onClick={() => history.push("/Users")} color="inherit">
            Users
          </Button>
          <Button
            onClick={() => history.push("/some Random Route")}
            color="inherit"
          >
            some Random Route
          </Button>
          <Button
            onClick={() => history.push("/addcontestant")}
            color="inherit"
          >
            Add Contestant
          </Button>
        </Toolbar>
      </AppBar>
      <div className="vote-form">
        {/* <Link to="/">Home</Link>
         <Link to ="/vote">Vote(old path)</Link>
         <Link to="/poll">Poll</Link>
         <Link to="/addContestant">Add Contestant</Link> */}

        {/* <Link to="/users">Users</Link>
          <Link to="fsdgfdsvgg">some random route</Link> */}

        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/addContestant">
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
          </Route>
          <Route path="/vote">
            <Redirect to="/poll" />
          </Route>

          <Route path="/poll">
            <div>
              <Button
                onClick={() => history.push("/addcontestant")}
                variant="outlined"
                color="secondary"
              >
                Add Contestant
              </Button>
              <TextField
                label="Search"
                id="outlined-start-adornment"
                onChange={(event) => setSearch(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">🔍</InputAdornment>
                  )
                }}
                variant="outlined"
              />
              <div className="poll">
                provide poll to new update!!!
                {poll.map((detalil) => (
                  <Vote
                    id={detalil.id}
                    company={detalil.company}
                    color={detalil.color}
                    content={detalil.content}
                  />
                ))}
              </div>
            </div>
          </Route>
          <Route path="/:Companyid">
            <CompanyDetail />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );

  function CompanyDetail() {
    const { companyid } = useParams();
    const contestant = ALL_COMPANY_DETAIL.find(
      (detail) => detail.id === companyid
    );
    return (
      <div>
        <h1 style={{ color: contestant.color }}> {contestant.company} </h1>
        <p> {contestant.content} </p>
      </div>
    );
  }
  // Vote is child component of App
  // Which is the child component of Vote? Counter & Content
  function Users() {
    const history = useHistory();

    return (
      <div>
        <button onClick={() => history.goBack()}> Go Back</button>
        <p> User details </p>
      </div>
    );
  }
  function Welcome() {
    const history = useHistory();
    return (
      <div>
        <button onClick={() => history.goForward()}> GoForward</button>
        <p>Welcome to the app </p>
      </div>
    );
  }
  function PageNotFound() {
    return (
      <div>
        <img
          height="600px"
          src="https://www.google.com/search?q=page+not+found&sxsrf=ALeKk02F4utcWfdSNDTo7RTV13I_MNS7_Q:1625632915752&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjuxunDktDxAhXV7HMBHZqaALEQ_AUoAXoECAEQAw&biw=1280&bih=657#imgrc=5Z08aMu_qP27tM"
        />
      </div>
    );
  }
  function Vote({ color, company, content, id }) {
    // console.log(props);
    // state - data - likes
    // ternary operator used
    // const bgStyle = { backgroundColor: likes >= dislikes ? "green" : "crimson" };
    const bgStyle = { backgroundColor: "#eee" };
    const history = useHistory();
    return (
      <div className="vote-system">
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/${id}`)}
        >
          <h4 style={{ color }}>{company}</h4>
          <Counter color="orchid" emoji="👍" type="primary" />
          {/* ctrl+/ */}
          {/* Task is to refactor the dislike button using Counter component */}
          <Counter color="crimson" emoji="👎" type="secondary" />
          <Content content={content} />
        </Card>
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
}
