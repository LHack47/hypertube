import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const SigninComponent = (props) => {
  const error = {};
  props.error.forEach((field) => {
    error[field.param] = field.msg;
  });

	const oauth = (url) => window.location.replace(`${url}?next=http://localhost:3000`);

  return (
    <div>
      <div className="homepage-background" />
      <div className="homepage-container">
        <form
          onSubmit={props.handleSubmit}
          onChange={props.handleChange}
        >
          <h2 className="homepage-title">
            Log in to
            <span className="homepage-hypertube-title"> Hypertube</span>
          </h2>
          <TextField
            hintText="Your email"
            name="email"
            errorText={error.email}
            floatingLabelText="Email"
          />
          <br />
          <TextField
            hintText="Your password"
            type="password"
            name="password"
            errorText={error.password}
            floatingLabelText="Password"
          />
          <br />
          <RaisedButton className="homepage-submit" type="submit" name="submit" label="Enter" />
          <br />
          <span
            onClick={() => oauth('/api/auth/google')}
          >
            Google Auth
          </span>
          <br />
          <span
            onClick={() => oauth('/api/auth/42')}
          >
            42 Auth
          </span>
          <br />
          <Link to="/forgot" className="homepage-linkto">Forgot password?</Link>
          <br />
          <Link to="/signup" className="homepage-linkto">Sign up?</Link>
        </form>
      </div>
    </div>
  );
};

SigninComponent.PropTypes = {
  error: PropTypes.array.required,
  handleSubmit: PropTypes.func.required,
  handleChange: PropTypes.func.required,
};

export default SigninComponent;
