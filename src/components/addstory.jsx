import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Axios from "axios";
import {Redirect} from "react-router-dom";
import  NavBar  from "./navbar";

class Story extends Component {
  state = {
    account: {
      Title: "",
      Story: "",
    },
    done:false,
    errors: {},
  };
  schema = {
    Title: Joi.string().required().label("Title"),
    Story: Joi.string().required().label("Story"),
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
    await Axios.post(process.env.URL+"addstory",this.state.account).then(res=>{
        this.setState({done:true})
        }).catch(err=>{
            if(err)
            {
                alert("Something went wrong");
            }
        })
    
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
  render() {
    const { account } = this.state;
    if(this.state.done)
    {
      return  <Redirect push to={{ pathname: '/allstory'}} />
    }
    else{
    return (
      <React.Fragment>
        <div className="container">
          <NavBar/>
          <h1>Add Story</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              id="Title"
              name={"Title"}
              label="Title"
              type="text"
              value={account.Title}
              onChange={this.handleChange}
              error={this.state.errors.Title}
            />
            <Input
              id="Story"
              name={"Story"}
              label="Story"
              type="text"
              value={account.Story}
              onChange={this.handleChange}
              error={this.state.errors.Story}
            />

            <button
              type="submit"
              disabled={this.validate()}
              className="btn btn-primary"
            >
              Add Story
            </button>
          </form>
        </div>
      </React.Fragment>
    );
    }
  }
}

export default Story;
