import Form from "./Form";
import Table from "./Table";
import React, { useState, useEffect } from "react";


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);


    function updateList(person) {
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          }
          throw new Error("Failed");
        })
        .then((newUser) => {
          setCharacters([...characters, newUser]);
        })
        .catch((error) => {
          console.log(error);
        });
    }





    function removeOneCharacter(index) {
      const userToDelete = characters[index];
      const id = userToDelete.id;

      fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.status === 204) {
            const updated = characters.filter((character, i) => i !== index);
            setCharacters(updated);
          } else if (response.status === 404) {
            console.log("User not found");
          } else {
            console.log("Delete failed. Status:", response.status);
          }
        })
        .catch((error) => console.log(error));
    }


    return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);



}

export default MyApp;
