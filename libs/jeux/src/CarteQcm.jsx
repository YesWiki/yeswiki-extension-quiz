import React from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import {Animated} from "react-animated-css";

class CarteQcm extends React.Component {
  constructor(props) {
    super(props);
    this.checkResponse = this.checkResponse.bind(this);
    
    this.state = {
      isChecked1: false,
      isChecked2: false,
      isChecked3: false,
      isChecked4: false,
      isChecked5: false,
      status:'encours', // Status encours, gagne, perdu
    };
  }
  toggleChange1 = () => {
    this.setState({
      isChecked1: !this.state.isChecked1,
    });
  }
  toggleChange2 = () => {
    this.setState({
      isChecked2: !this.state.isChecked2,
    });
  }
  toggleChange3 = () => {
    this.setState({
      isChecked3: !this.state.isChecked3,
    });
  }
  toggleChange4 = () => {
    this.setState({
      isChecked4: !this.state.isChecked4,
    });
  }
  toggleChange5 = () => {
    this.setState({
      isChecked5: !this.state.isChecked5,
    });
  }
  checkResponse() {
    // alert(this.props);
    this.props.scrollToTop();
    let R1 = (this.state.isChecked1===true && this.props.data.listeListeBonneReponseListeBonneReponse_r1==="true")
    ||(this.state.isChecked1===false&&this.props.data.listeListeBonneReponseListeBonneReponse_r1!=="true");
    let R2 = (this.state.isChecked2===true && this.props.data.listeListeBonneReponseListeBonneReponse_r2==="true")
    ||(this.state.isChecked2===false&&this.props.data.listeListeBonneReponseListeBonneReponse_r2!=="true");
    let R3= (this.state.isChecked3===true && this.props.data.listeListeBonneReponseListeBonneReponse_r3==="true")
    ||(this.state.isChecked3===false&&this.props.data.listeListeBonneReponseListeBonneReponse_r3!=="true");
    let R4= (this.state.isChecked4===true && this.props.data.listeListeBonneReponseListeBonneReponse_r4==="true")
    ||(this.state.isChecked4===false&&this.props.data.listeListeBonneReponseListeBonneReponse_r4==="false");
    let R5= (this.state.isChecked5===true && this.props.data.listeListeBonneReponseListeBonneReponse_r5==="true")
    ||(this.state.isChecked5===false&&this.props.data.listeListeBonneReponseListeBonneReponse_r5!=="true");
   

    if (R1&&R2&&R3&&R4&&R5){
      this.setState({status:"gagne"});
      this.props.toggleMethod("success");
    }
    else {
      this.setState({status:"perdu"});
      this.props.toggleMethod("danger");
      }
    
    }
  
  

  render() {
    const ldata = this.props.data;
    let imgfile="";
    let imgfileconclusion="";
    
    if (typeof(this.props.data.imagebf_image_q1) !== 'undefined'&& this.props.data.imagebf_image_q1 !="")
        imgfile = global.site+"/cache/image_"+this.props.data.imagebf_image_q1;
    // console.log("imagetitre1" ,this.props.data.imagebf_image_q1);
    if (typeof(this.props.data.imagebf_image_conclusion) !== 'undefined'&& this.props.data.imagebf_image_conclusion !="")
        imgfileconclusion = global.site+"/cache/image_"+this.props.data.imagebf_image_conclusion;

    if (this.state.status==="encours")
    return (
      <span className="classQCQ"  >
         <p className="modeemploi">
          Question à choix multiple: Choisissez une (ou plusieurs) réponses et valider pour vérifier... Courage !!!
        </p>
        <fieldset>
        <legend className="trim-text widthauto"><span className="legendfieldset">{ldata.bf_titre}</span></legend>
        <p className="enonce">
          {ldata.bf_texte_q1}
        </p>
        {imgfile !==""  &&
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <img src={imgfile} alt={imgfile} className="imgTitreQuestion"></img>
        </Animated>
        }
               {ldata.bf_titre_r1 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep1"
            checked={this.state.isChecked1}
            onChange={this.toggleChange1}
          />
          &nbsp;{ldata.bf_titre_r1} &nbsp; 
          <span className="checkmark"></span>
       </label> 
        } 
        
        { ldata.bf_titre_r2 !== "" &&
        <label  className="contCB">
          <input type="checkbox"
            id= "rep2"
            checked={this.state.isChecked2}
            onChange={this.toggleChange2}
          />
          &nbsp;{ldata.bf_titre_r2}&nbsp; 
          <span className="checkmark"></span>
          </label> 
        } 
        { ldata.bf_titre_r3 !== "" &&
        <label  className="contCB">
          <input type="checkbox"
            id= "rep3"
            checked={this.state.isChecked3}
            onChange={this.toggleChange3}
          />
          &nbsp;{ldata.bf_titre_r3}&nbsp;
          <span className="checkmark"></span>
          </label> 
        } 
         { ldata.bf_titre_r4 !== "" &&
        <label  className="contCB">
          <input type="checkbox"
            id= "rep4"
            checked={this.state.isChecked4}
            onChange={this.toggleChange4}
          />
          &nbsp;{ldata.bf_titre_r4} &nbsp; 
          <span className="checkmark"></span>
          </label> 
        } 
          { ldata.bf_titre_r5.trim() !== "" &&
        <label  className="contCB">
          <input type="checkbox"
            id= "rep5"
            checked={this.state.isChecked5}
            onChange={this.toggleChange5}
          />
          &nbsp;{ldata.bf_titre_r5} &nbsp; 
          <span className="checkmark"></span>
          </label> 
        } 
         <Button variant="secondary" size="lg" onClick={this.checkResponse} className="btnreponse" >
          C'est votre dernier mot ?
        </Button>
        </fieldset>
      </span>
    );
    if (this.state.status==="gagne")
    return (
      <span className="classGagne"  >
        <fieldset>
        <legend className="trim-text widthauto"><span className="legendfieldset">{ldata.bf_titre}</span></legend>
        <p className="enonce">
          {ldata.bf_texte_q1}
        </p>
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}><h2 className="classGagneLbl">Vous avez gagné !!!</h2></Animated>
        
        {ldata.imagebf_image_q1 !== "" &&
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <img src={imgfile} alt={imgfile} className="imgTitreQuestion"></img>
        </Animated>
        }
        <h4> La bonne réponse est: </h4>
          { ldata.listeListeBonneReponseListeBonneReponse_r1 && ldata.listeListeBonneReponseListeBonneReponse_r1 === "true" &&
          <h2 className="bonneReponse"><i>1) {ldata.bf_texte_r1}</i></h2>       
          }
           { ldata.listeListeBonneReponseListeBonneReponse_r2 && ldata.listeListeBonneReponseListeBonneReponse_r2 === "true" &&
          <h2 className="bonneReponse"><i>2) {ldata.bf_texte_r2}</i></h2>       
          }
          { ldata.listeListeBonneReponseListeBonneReponse_r3 && ldata.listeListeBonneReponseListeBonneReponse_r3 === "true" &&
          <h2 className="bonneReponse"><i>3) {ldata.bf_texte_r3}</i></h2>       
          }
          { ldata.listeListeBonneReponseListeBonneReponse_r4 && ldata.listeListeBonneReponseListeBonneReponse_r4 === "true" &&
          <h2 className="bonneReponse"><i>4) {ldata.bf_texte_r4}</i></h2>       
          }
          { ldata.listeListeBonneReponseListeBonneReponse_r5 && ldata.listeListeBonneReponseListeBonneReponse_r5 === "true" &&
          <h2 className="bonneReponse"><i>5) {ldata.bf_texte_r5}</i></h2>       
          }
        <h4>Explication:</h4> 
        {ldata.bf_texte_consclusion}
        {imgfileconclusion !== "" &&
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <img src={imgfileconclusion} alt={imgfileconclusion} className="imgTitreQuestion"></img>
        </Animated>
        }
        </fieldset>
      </span>
    );
    if (this.state.status==="perdu")
    return (
      <span className="classPerdu"  >
        <fieldset>
        <legend className="trim-text widthauto"><span className="legendfieldset">{ldata.bf_titre}</span></legend>
        <p className="enonce">
          {ldata.bf_texte_q1}
        </p>
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}><h2 className="classPerduLbl">Perdu !!!</h2></Animated>
        
        {ldata.imagebf_image_q1 !== "" &&
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <img src={imgfile} alt={imgfile} className="imgTitreQuestion"></img>
        </Animated>
        }
       <h4> La bonne réponse est: </h4>
          { ldata.listeListeBonneReponseListeBonneReponse_r1 && ldata.listeListeBonneReponseListeBonneReponse_r1 === "true" &&
          <h2 className="bonneReponse"><i>1) {ldata.bf_texte_r1}</i></h2>       
          }
           { ldata.listeListeBonneReponseListeBonneReponse_r2 && ldata.listeListeBonneReponseListeBonneReponse_r2 === "true" &&
          <h2 className="bonneReponse"><i>2) {ldata.bf_texte_r2}</i></h2>       
          }
          { ldata.listeListeBonneReponseListeBonneReponse_r3 && ldata.listeListeBonneReponseListeBonneReponse_r3 === "true" &&
          <h2 className="bonneReponse"><i>3) {ldata.bf_texte_r3}</i></h2>       
          }
          { ldata.listeListeBonneReponseListeBonneReponse_r4 && ldata.listeListeBonneReponseListeBonneReponse_r4 === "true" &&
          <h2 className="bonneReponse"><i>4) {ldata.bf_texte_r4}</i></h2>       
          }
          { ldata.listeListeBonneReponseListeBonneReponse_r5 && ldata.listeListeBonneReponseListeBonneReponse_r5 === "true" &&
          <h2 className="bonneReponse"><i>5) {ldata.bf_texte_r5}</i></h2>       
          }
         
        <h4>Explication:</h4>
        {ldata.bf_texte_consclusion}
        {imgfileconclusion !== "" &&
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <img src={imgfileconclusion} alt={imgfileconclusion} className="imgTitreQuestion"></img>
        </Animated>
        }
        </fieldset>
      </span>
    );
  }
}
export default CarteQcm;