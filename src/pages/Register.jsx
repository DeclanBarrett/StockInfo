import React, { useState } from "react";
import { FormFeedback, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useLocation } from "react-router-dom";

import { SendRegister } from "../APIs/LoginAPI.js";

const APIURL = "http://131.181.190.87:3000";

// Return register page with title
export default function Register() {
  return (
    <div className="HeroSubtle">
      <h2> REGISTER </h2>
      <RegisterDiv />
    </div>
  );
}

// Return form for registering
function RegisterDiv() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Enable website navigation
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // Standard error responses
  const MissingError = "Missing Information";
  const UserError = "User Already Exists";
  const ConnectionError = "Server Unavailable: Please Check Connection";
  const EmailError = "Please provide a valid email address";

  // Handle errors and return associated responses
  function ErrorHandling() {
    if (error.includes("User")) { return UserError }
    else if (error.includes("incomplete")) { return MissingError }
    else if (error.includes("email bad")) { return EmailError }
    else { return ConnectionError }
  }

  // register form
  return (
    <div className="center-contents-flex">
      <div className="login-form-outer">
        <div className="login-form-inner">
          <Form >
            {/* Email Input with error warning */}
            <FormGroup row>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="Email" placeholder="email" value={email}
                onChange={event => { setEmail(event.target.value); setError(""); }} invalid={error !== ""} />
            </FormGroup>

            {/* Password Input with error warning */}
            <FormGroup row>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="Password" placeholder="password" value={password}
                onChange={event => { setPassword(event.target.value); setError(""); }} invalid={error !== ""} />
              <FormFeedback invalid>{ErrorHandling()}</FormFeedback>
            </FormGroup>

            {/* Button that passes data to an error checker */}
            <FormGroup row>
              <Button onClick={event => RequireEmail({ email, password, setError, history, from })} block>Register</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  )
}

// Checks if email is present before sending
function RequireEmail({ email, password, setError, history, from }) {
  if (email.includes("@") && email.includes(".")) {
    SendRegister({ email, password, setError, history, from })
  } else {
    setError("email bad")
  }
}


