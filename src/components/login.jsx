import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Axios from "axios";
import {Redirect} from "react-router-dom";

class Login extends Component {
  state = {
    account: {
      Email: "",
      Password: "",
    },
    done:false,
    signup:false,
    errors: {},
  };
  schema = {
    Email: Joi.string().required().label("Email").email({ tlds: { allow: false } }),
    Password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const result = Joi.validate(this.state.account, this.schema, options);
    console.log(result);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    await Axios.post(process.env.URL+"login",this.state.account).then(res=>{
        this.setState({done:true});
    }).catch(err=>{
        alert("Wrong credentials")
    })
    {
        
    }
    console.log("Submitted");
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    // console.log(obj);
    const schema = { [name]: this.schema[name] };
    // console.log(schema);
    const result = Joi.validate(obj, schema);
    console.log(result);
    const { error } = result;
    console.log(error);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors: errors || {} });
  };
  handleSignup=()=>{
    this.setState({signup:true})
  }
  render() {
    const { account } = this.state;
    if(this.state.done)
    {
        return  <Redirect push to={{ pathname: '/allstory'}} />
    }
    else if(this.state.signup)
    {
        return  <Redirect push to={{ pathname: '/create'}} />
    }
    else{
    return (
      <React.Fragment>
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              id="Email"
              name={"Email"}
              label="E-Mail"
              type="email"
              value={account.Email}
              onChange={this.handleChange}
              error={this.state.errors.Email}
            />
            <Input
              id="Password"
              name={"Password"}
              label="Password"
              type="Password"
              value={account.Password}
              onChange={this.handleChange}
              error={this.state.errors.Password}
            />

            <button
              type="submit"
              disabled={this.validate()}
              className="btn btn-primary"
            >
              Login
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSignup}
            >
              SignUp
            </button>
          </form>
        </div>
      </React.Fragment>
    );
    }
  }
}

export default Login;
