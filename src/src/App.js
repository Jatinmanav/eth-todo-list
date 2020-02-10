import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Web3 from "web3";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import { abi, address } from "./config";
import {
  Grid,
  Button,
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItem
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  text: {
    marginTop: theme.spacing(5),
    backgroundColor: "#fff"
  },
  appbar: {
    alignItems: "center"
  },
  button: {
    padding: "15px",
    marginTop: theme.spacing(5),
    backgroundColor: "#eee",
    [theme.breakpoints.up("xs")]: {
      maxHeight: theme.spacing(15)
    }
  },
  list: {
    width: "100%",
    backgroundColor: "#eee",
    marginTop: "5%"
  }
}));

function App() {
  const [account, setAccount] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  let web3 = new Web3("http://localhost:7545" || Web3.givenProvider);
  const contract = new web3.eth.Contract(abi, address);
  const classes = useStyles();

  useEffect(() => {
    const getTasks = async () => {
      let tempTasks = [];
      const acc = await web3.eth.getAccounts();
      setAccount(acc[0]);
      const taskCount = await contract.methods.taskCount().call();
      for (let i = 1; i <= taskCount; i++) {
        const task = await contract.methods.tasks(i).call();
        tempTasks = [...tempTasks, task];
      }
      setTasks(tempTasks);
    };
    getTasks();
  }, [account]);

  const handleChange = e => {
    setNewTask(e.target.value);
  };

  const handleComplete = (index, id) => {
    console.log(index, id);
    contract.methods
      .completeTask(id)
      .send({ from: account })
      .once("receipt", receipt => {
        setAccount(null);
      });
    setTasks([...tasks, (tasks[index].completed = true)]);
  };

  const handleSumbit = async e => {
    e.preventDefault();
    contract.methods
      .createTask(newTask)
      .send({ from: account })
      .once("receipt", receipt => {
        setAccount(null);
      });
    setNewTask("");
  };

  return (
    <div className="App">
      <CssBaseline />
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h6">Todo List</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <form
          onSubmit={handleSumbit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                className={classes.text}
                id="task"
                label="Task"
                variant="filled"
                fullWidth={true}
                value={newTask}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                type="submit"
                className={classes.button}
                variant="outlined"
                fullWidth={true}
              >
                Add Task
              </Button>
            </Grid>
            <Grid item xs={12}>
              <List className={classes.list}>
                {tasks.map(x =>
                  x.completed ? null : (
                    <Fragment key={x.id}>
                      <ListItem>
                        <ListItemIcon>
                          <CancelIcon
                            name={"test"}
                            onClick={() =>
                              handleComplete(tasks.indexOf(x), x.id)
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={x.content} />
                      </ListItem>
                      {tasks.indexOf(x) + 1 === tasks.length ? null : (
                        <Divider variant="fullWidth" component="li" />
                      )}
                    </Fragment>
                  )
                )}
              </List>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default App;
