import React,{ Component } from 'react';

import TechItem from './TechItem'

class TechList extends Component{
  state = {
    newTech:'',
    techs:[]
  };
  //Component lifecycle

  //Execute when component render
  componentDidMount(){
    const techs = localStorage.getItem('techs');

    if(techs){
      this.setState({techs:JSON.parse(techs)});
    }
  }

  //Execute always you have a change
  componentDidUpdate(prevProps, prevState){
    //this.props, this.state
    if (prevState.techs !== this.state.techs){
      localStorage.setItem('techs',JSON.stringify(this.state.techs));
    }
  }

  //Execute when destroy component
  componentWillUnmount(){

  }

  //get input value.To use this, i need to create arrow function inside of class. 
  handleInputChange = e =>{
    this.setState({ newTech: e.target.value });
  }

  handleSubmit = e =>{
    e.preventDefault();
    this.setState({
      techs:[...this.state.techs,this.state.newTech],
      newTech:''
    });
  }

  //filter return all techs (t) be different of tech, ex: tech is Node.js, t return reactJS and react native cause this techs is different of tech state sent
  handleDelete = (tech) =>{
    this.setState({ techs: this.state.techs.filter( t => t !== tech) })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (<TechItem key={tech} tech={tech} onDelete={() => this.handleDelete(tech)}/>))}
          
        </ul>
        <input 
          type="text" 
          onChange={this.handleInputChange} 
          value={this.state.newTech}/>
          <button type="submit">Enviar</button>
      </form>
      
    );
  }
}

export default TechList;