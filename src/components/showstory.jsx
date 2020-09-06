import React, { Component } from "react";
import axios from "axios";
import Story from "./addstory";
import { Redirect } from "react-router-dom";
import Storyid from "./storyid";
import Navbar from "./navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,ListGroup,ListGroupItem} from "react-bootstrap";

class Showstory extends Component {
  state = {
    Storys: [],
    done: false,
    show: false,
    storyid: "",
  };
  componentDidMount() {
    axios.get("http://127.0.0.1:5000/allstory").then((res) => {
      console.log(res.data.Story);
      const Storys = res.data.Story;
      this.setState({ Storys });
      console.log(Storys[0]._id);
    });
  }
  handleClick = () => {
    this.setState({ done: true });
  };
  showStory = (id1) => {
    console.log(id1);
    this.setState(
      {
        storyid: id1,
        show: true,
      },
      () => {
        console.log(this.state.storyid);
      }
    );
  };
  render() {
    if (this.state.done) {
      return <Redirect push to={{ pathname: "/addstory" }} />;
    } else if (this.state.show) {
      return (
        <div>
          {/* <Storyid id={this.state.storyid}/> */}
          <Redirect push to={{ pathname: `/storyid/${this.state.storyid}` }} />;
        </div>
      );
    } else {
      return (
        <div className="container">
          <Navbar />

          <ListGroup>
              {this.state.Storys.map((Story)=>(
                  <ListGroup.Item action href="" onClick={() => this.showStory(Story._id)}>
                  {Story.Title}
                  </ListGroup.Item>
              ))}
            
            </ListGroup>

          {/* <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
                {this.state.Storys.map((Story)=>(
                    <ListGroup.Item>{Story.Title} <button onClick={() => this.showStory(Story._id)}>Show</button></ListGroup.Item>
                ))}
              

            </ListGroup>
          </Card> */}


          {/* <ul>
            {this.state.Storys.map((Story) => (
              <li>
                {Story.Title}
                <button onClick={() => this.showStory(Story._id)}>Show</button>
              </li>
            ))}
          </ul> */}
          <button className="btn btn-primary" onClick={this.handleClick}> Add Story</button>
        </div>
      );
    }
  }
}
export default Showstory;
