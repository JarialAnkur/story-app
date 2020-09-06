import React, { Component, useState } from "react";
import axios from "axios";
import Story from "./addstory";
import { Redirect } from "react-router-dom";
import { render } from "@testing-library/react";
import  NavBar  from "./navbar";

class Storyid extends Component {
        
       
            state={
                Story:{
                    _id:"",
                   
                    Title:"",
                    Story:""
                    
                },
                all:false,
                
            }
                
        
        
        
        componentDidMount(){
            
            
                   
                        
        console.log(this.props.id);
            axios.get(process.env.URL+`story/${this.props.match.params.id}`)
                .then(res=>{
                    
                const Story= res.data.Story;
                this.setState({Story})
            });
            
        }
    //    componentWillUnmount(){
    //        console.log("willunmount");
    //        this._ismount=true;
    //        console.log(this._ismount);
    //    }
        handleClick=()=>{
            this.setState({all:true})
            
        }
    render(){
        if(this.state.all)
        {
            return <Redirect push to={{ pathname: "/allstory" }} />;
        }
    return (
      <div className="container" >
          <NavBar/>
          
    <h1>{this.state.Story.Title}</h1>
        <p>{this.state.Story.Story}</p>
        
      </div>
    );
    }
}
export default Storyid;
