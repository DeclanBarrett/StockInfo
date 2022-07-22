import React, { useState } from "react";
import { FormFeedback, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useLocation } from "react-router-dom";
import { SendLogin } from "../APIs/LoginAPI.js";

//Displays page for logging in with dynamic heading
export default function Login(props) {
  return (
    <div className="HeroSubtle">
      <h2> LOG IN {TitleResponses(props)}
      </h2>
      <LoginDiv />
    </div>
  );
}

// Give title response based on url paramaters
function TitleResponses(props) {
  if (props != null) {
    const status = props.match.params.status;
    if (status === "success") {
      return "TO YOUR NEW ACCOUNT"
    } else if (status === "denied") {
      return "TO ACCESS CONTENT"
    } 
  } else {
    return ""
  }
  
}

//Displays the main login form
function LoginDiv() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Retrieves browser/ router information for navigation
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // Responses to errors
  const EmailPasswordError = "Invalid Username or Password";
  const MissingError = "Missing Login Information";
  const ConnectionError = "Server Unavailable: Please Check Connection";

  // Handle generic errors with appropriate responses
  function ErrorHandling() {
    if (error.includes("email") || error.includes("password")) { return EmailPasswordError }
    else if (error.includes("incomplete")) { return MissingError }
    else { return ConnectionError }
  }

  // Returns a centererd log in form
  return (
    <div className="center-contents-flex">
      <div className="login-form-outer">
        <div className="login-form-inner">
          <Form >
            {/* Email input with requiring @ pop up */}
            <FormGroup row>
              <Label for="Email">Email</Label>
              <Input type="email" name="email" id="Email" placeholder="email" value={email}
                onChange={event => { setEmail(event.target.value); setError(""); }} invalid={error !== ""} />
            </FormGroup>

            {/* Password Input which automatically hides it and responds with feedback */}
            <FormGroup row>
              <Label for="Password">Password</Label>
              <Input type="password" name="password" id="Password" placeholder="password" value={password}
                onChange={event => { setPassword(event.target.value); setError(""); }} invalid={error !== ""} />
              <FormFeedback invalid>{ErrorHandling()}</FormFeedback>
            </FormGroup>
            
            {/* Button that sends the request to login */}
            <FormGroup row>
              <Button onClick={event =>
                SendLogin(email, password, setError, history, from)} block >Log In</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  )
}