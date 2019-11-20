import React from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import {Animated} from "react-animated-css";

class CarteQcu extends React.Component {
  constructor(props) {
    super(props);
    this.toggleChange = this.toggleChange.bind(this);
    
    this.state = {
       status:'encours', // Status encours, gagne, perdu
       isChecked: false,
    };
  }
  toggleChange = () => {
    this.setState({isChecked:!this.state.isChecked})
    this.props.toggleMethod();
  }
  
  render() {
    const ldata = this.props.data;
    return (
      <span className="classQCQ"  >
        <fieldset>
        <legend className="trim-text"><span className="legendfieldset">Carte de test</span></legend>
        <p className="enonce">
          {ldata.bf_texte_q1}
        </p>
      
        <label className="container">
          <input type="checkbox"
            id="rep1"
            onChange={this.toggleChange}
            checked={this.state.isChecked}
          />
          &nbsp;{ldata.bf_titre_r1} &nbsp; 
          <span className="checkmark"></span>
        </label> 
        </fieldset>
      </span>
      )
    } 
        
}
export default CarteQcu;