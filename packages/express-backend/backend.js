// backend.js
import express from "express";

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};


const app = express();
const port = 8000;

app.use(express.json());

const deleteUserById = (id) => {
    const index = users.users_list.findIndex(user => user.id === id);

    if (index < 0) {
        return false;
    }

    users.users_list.splice(index, 1);
    return true;
};



const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

const findUserByName = (name) => {
  return users.users_list.filter(
    (user) => user.name === name
  );
};

const findUsersByNameAndJob = (name, job) => {
    const matches = users.users_list.filter(
        user => user.name === name && user.job === job
    );

    return matches;
};


app.get("/users", (req, res) => {
    const { name, job } = req.query;

    if (name !== undefined && job !== undefined) {
        const result = findUsersByNameAndJob(name, job);
        res.send({ users_list: result });
        return;
    }

    if (name !== undefined) {
        const result = findUserByName(name);
        res.send({ users_list: result });
        return;
    }

    res.send(users);
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const wasDeleted = deleteUserById(id);

    if (wasDeleted === false) {
        res.status(404).send("Resource not found.");
        return;
    }

    res.send();
});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});