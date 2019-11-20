import React from 'react';
import './App.css';

class CarteVerrouille extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const ldata = this.props.data;
    const tabcartes=this.props.tabcards;
    const lcardstitrecpt=this.props.lcardstitrecpt;
    let lpreds=[];
    
      if (ldata["checkboxfiche"+global.idcards]&&ldata.status=='Verrou'){
      let tabprec = (ldata["checkboxfiche"+global.idcards]).split(',');
      console.log("tabprec:",tabprec);
      tabprec.forEach( (prec)=>{
        if (tabcartes[lcardstitrecpt[prec]]){
          lpreds.push("question: "+ tabcartes[lcardstitrecpt[prec]].evkey+" -> "+tabcartes[lcardstitrecpt[prec]].bf_titre);
        }
        else {
          lpreds.push("question: "+ prec + " n'existe pas dans ce jeu");
        }
        })
      }
   
    return (
      <span className="classQCQ"  >
         <p className="modeemploi">
          Cette carte est vérouillée
        </p>
        <fieldset>
        <legend className="trim-text"><span className="legendfieldset">{ldata.bf_titre}</span></legend>
        <p className="enonce">
          Vous devez répondre à ces questions pour déverouiller cette carte:
        </p>
        <ul>
          {lpreds.map((prec,index) => 
            <li key={index}>{prec}</li>
          )}
        </ul>
       
        </fieldset>
      </span>
      )
    } 
        
}
export default CarteVerrouille;