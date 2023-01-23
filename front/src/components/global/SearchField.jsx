import React, { useState } from "react";
import { Nav, Form } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import {
  sendUserSearchAction,
  showUserSearchAction,
} from "../../redux/actions";

export default function SearchField() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  let usersArray = useSelector((state) => state.users.usersFromFetch);

  const handleChange = (e) => {
    setQuery(e.target.value);
    dispatch(showUserSearchAction());

    const filteredUsers = usersArray.filter((user) => {
      const userFullName = user.name + user.surname;
      return userFullName.toLowerCase().includes(query.toLowerCase());
    });

    dispatch(sendUserSearchAction(filteredUsers));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("--------------search submitted--------------", query);
    console.log("usersArray from search --->", usersArray);

    const filteredUsers = usersArray.filter((user) => {
      const userFullName = user.name + user.surname;
      return userFullName.toLowerCase().includes(query.toLowerCase());
    });

    dispatch(sendUserSearchAction(filteredUsers));
  };

  return (
    <div className="my-auto">
      <Nav className="me-auto d-none d-lg-block">
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            id="search-field"
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </Nav>
    </div>
  );
}
