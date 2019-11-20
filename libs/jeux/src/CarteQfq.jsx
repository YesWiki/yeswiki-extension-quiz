import React from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
class CarteQfq extends React.Component {
  constructor(props) {
    super(props);
    let arr = [];
    for (let i = 1; i < 6; i++) {
          let columns = [];
          for (let j = 1; j < 6; j++) {
              columns[j] = false;
          }
          arr[i] = columns;
      }
    this.state = {
      tabCheck:arr,
      status:'encours', // Status encours, gagne, perdu
    };

    this.checkResponse = this.checkResponse.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
       
  }

  toggleChange(i,j) {
    //console.log("index",i,'/',j);
    let arr2 = this.state.tabCheck;

    for (var lig = 1; lig < 6; lig++) {
          for (var col = 1; col < 6; col++) {
              if (i===lig&&j===col){
                arr2[i][j]=true;
              }
              if (i===lig && col!==j) {
                arr2[lig][col]=false;
              } 
              if (i!==lig && col===j) {
                arr2[lig][col]=false;
              }
          }
      }
      //console.log("toggle", arr2);
    this.setState({tabCheck:arr2});
  }

  checkResponse() {
    // console.log("CheckReponse");
    // alert(this.props);
    let ldata = this.props.data;
    let arr2 = this.state.tabCheck;
    let index1= this.props.data.listeListeBonneReponseListeBonneReponse_r1;
    let R1=false;if (ldata.bf_titre_r1.trim() === ""||arr2[1][index1]===true) R1=true;
    
    let index2= this.props.data.listeListeBonneReponseListeBonneReponse_r2;
    let R2=false;if (ldata.bf_titre_r2.trim() === ""||arr2[2][index2]===true) R2=true;

    let index3= this.props.data.listeListeBonneReponseListeBonneReponse_r3;
    let R3=false;if (ldata.bf_titre_r3.trim() === ""||arr2[3][index3]===true) R3=true;

    let index4= this.props.data.listeListeBonneReponseListeBonneReponse_r4;
    let R4=false;if (ldata.bf_titre_r4.trim() === ""||arr2[4][index4]===true) R4=true;

    let index5= this.props.data.listeListeBonneReponseListeBonneReponse_r5;
    let R5=false;if (ldata.bf_titre_r5.trim() === ""||arr2[5][index5]===true) R5=true;
      
    //console.log("Rs: ", R1,R2,R3,R4,R5)  
    if (R1&&R2&&R3&&R4&&R5) {
      this.setState({status:"gagne"});
      this.props.toggleMethod("success");
    }
    else
    {
      this.setState({status:"perdu"});
      this.props.toggleMethod("danger");
    }
    }


  render() {
    const ldata = this.props.data;
    const tabreponse = [];
    tabreponse[1]=ldata.bf_titre_r1;
    tabreponse[2]=ldata.bf_titre_r2;
    tabreponse[3]=ldata.bf_titre_r3;
    tabreponse[4]=ldata.bf_titre_r4;
    tabreponse[5]=ldata.bf_titre_r5;
    let imgfile = "";
    let imgfileconclusion = "";
    
    if (typeof(this.props.data.imagebf_image_q1) !== 'undefined'&& this.props.data.imagebf_image_q1 !="")
        imgfile = global.site+"/cache/image_"+this.props.data.imagebf_image_q1;
    if (typeof(this.props.data.imagebf_image_conclusion) !== 'undefined'&& this.props.data.imagebf_image_conclusion !="")
        imgfileconclusion = global.site+"/cache/image_"+this.props.data.imagebf_image_conclusion;
    if (this.state.status==="encours")
    return (
      
      <span className="classQFQ"  >
        <p className="modeemploi">
         Associez la bonne réponse à la bonne question... Une erreur suffit à vous perdre !!!
        </p>
        <fieldset>
        <legend className="trim-text widthauto"><span className="legendfieldset">{ldata.bf_titre}</span></legend>
        {/* Proposition 1 */}
        <p className="enonce">
          {ldata.bf_texte_q1}
        </p>
        {ldata.bf_titre_r1 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep11"
            checked={this.state.tabCheck[1][1]}
            onChange={() => this.toggleChange(1,1)}
          />
          &nbsp;{ldata.bf_titre_r1} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r2 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep12"
            checked={this.state.tabCheck[1][2]}
            onChange={() => this.toggleChange(1,2)}
          />
          &nbsp;{ldata.bf_titre_r2} &nbsp;
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r3 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep13"
            checked={this.state.tabCheck[1][3]}
            onChange={()=>this.toggleChange(1,3)}
          />
          &nbsp;{ldata.bf_titre_r3} &nbsp;
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r4 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep14"
            checked={this.state.tabCheck[1][4]}
            onChange={()=>this.toggleChange(1,4)}
          />
          &nbsp;{ldata.bf_titre_r4} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r5 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep15"
            checked={this.state.tabCheck[1][5]}
            onChange={()=>this.toggleChange(1,5)}
          />
          &nbsp;{ldata.bf_titre_r5} &nbsp; 
          <span className="checkmark"></span>
       </label> 
        }
        
{/* Proposition 2 */}
        <p className="enonce">
          {ldata.bf_texte_q2}
        </p>
        {ldata.bf_titre_r1 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep21"
            checked={this.state.tabCheck[2][1]}
            onChange={()=>this.toggleChange(2,1)}
          />
          &nbsp;{ldata.bf_titre_r1} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r2 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep22"
            checked={this.state.tabCheck[2][2]}
            onChange={()=>this.toggleChange(2,2)}
          />
          &nbsp;{ldata.bf_titre_r2} &nbsp;
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r3 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep23"
            checked={this.state.tabCheck[2][3]}
            onChange={()=>this.toggleChange(2,3)}
          />
          &nbsp;{ldata.bf_titre_r3} &nbsp;
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r4 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep24"
            checked={this.state.tabCheck[2][4]}
            onChange={()=>this.toggleChange(2,4)}
          />
          &nbsp;{ldata.bf_titre_r4} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r5 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep25"
            checked={this.state.tabCheck[2][5]}
            onChange={()=>this.toggleChange(2,5)}
          />
          &nbsp;{ldata.bf_titre_r5} &nbsp; 
          <span className="checkmark"></span>
       </label> 
        }
{/* Proposition 3 */}
        <p className="enonce">
          {ldata.bf_texte_q3}
        </p>
        {ldata.bf_titre_r1 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep31"
            checked={this.state.tabCheck[3][1]}
            onChange={()=>this.toggleChange(3,1)}
          />
          &nbsp;{ldata.bf_titre_r1} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r2 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep32"
            checked={this.state.tabCheck[3][2]}
            onChange={()=>this.toggleChange(3,2)}
          />
          &nbsp;{ldata.bf_titre_r2} &nbsp; 
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r3 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep33"
            checked={this.state.tabCheck[3][3]}
            onChange={()=>this.toggleChange(3,3)}
          />
          &nbsp;{ldata.bf_titre_r3} &nbsp;
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r4 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep34"
            checked={this.state.tabCheck[3][4]}
            onChange={()=>this.toggleChange(3,4)}
          />
          &nbsp;{ldata.bf_titre_r4} &nbsp; 
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r5 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep35"
            checked={this.state.tabCheck[3][5]}
            onChange={()=>this.toggleChange(3,5)}
          />
          &nbsp;{ldata.bf_titre_r5} &nbsp; 
          <span className="checkmark"></span>
       </label> 
        }
{/* Proposition 4 */}
        <p className="enonce">
          {ldata.bf_texte_q4}
        </p>
        {ldata.bf_titre_r1 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep41"
            checked={this.state.tabCheck[4][1]}
            onChange={()=>this.toggleChange(4,1)}
          />
          &nbsp;{ldata.bf_titre_r1} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r2 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep42"
            checked={this.state.tabCheck[4][2]}
            onChange={()=>this.toggleChange(4,2)}
          />
          &nbsp;{ldata.bf_titre_r2} &nbsp; 
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r3 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep43"
            checked={this.state.tabCheck[4][3]}
            onChange={()=>this.toggleChange(4,3)}
          />
          &nbsp;{ldata.bf_titre_r3} &nbsp;
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r4 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep44"
            checked={this.state.tabCheck[4][4]}
            onChange={()=>this.toggleChange(4,4)}
          />
          &nbsp;{ldata.bf_titre_r4} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r5 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep45"
            checked={this.state.tabCheck[4][5]}
            onChange={()=>this.toggleChange(4,5)}
          />
          &nbsp;{ldata.bf_titre_r5} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
{/* Proposition 5 */}
        <p className="enonce">
          {ldata.bf_texte_q5}
        </p>
        {ldata.bf_titre_r1 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep51"
            checked={this.state.tabCheck[5][1]}
            onChange={()=>this.toggleChange(5,1)}
          />
          &nbsp;{ldata.bf_titre_r1} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r2 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep52"
            checked={this.state.tabCheck[5][2]}
            onChange={()=>this.toggleChange(5,2)}
          />
          &nbsp;{ldata.bf_titre_r2} &nbsp;
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r3 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep53"
            checked={this.state.tabCheck[5][3]}
            onChange={()=>this.toggleChange(5,3)}
          />
          &nbsp;{ldata.bf_titre_r3} &nbsp;
          <span className="checkmark"></span>
       </label> 
        } 
        {ldata.bf_titre_r4 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep54"
            checked={this.state.tabCheck[5][4]}
            onChange={()=>this.toggleChange(5,4)}
          />
          &nbsp;{ldata.bf_titre_r4} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        {ldata.bf_titre_r5 !== "" &&
        <label className="contCB">
          <input type="checkbox"
            id="rep55"
            checked={this.state.tabCheck[5][5]}
            onChange={()=>this.toggleChange(5,5)}
          />
          &nbsp;{ldata.bf_titre_r5} &nbsp;
          <span className="checkmark"></span>
       </label> 
        }
        <Button variant="secondary" size="lg" onClick={this.checkResponse}  className="btnreponse" >
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
        <h2 className="classGagneLbl">Vous avez gagné !!!</h2>
        
        <h4> Les réponses sont: </h4><ul>
        {ldata.bf_titre_r1 && ldata.bf_titre_r1 !== "" &&
        <li>
        <h5 className="classGagne">
            {ldata.bf_titre_q1}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r1]}</i>
        </h5>
        </li>
        }  

        {ldata.bf_titre_r2 && ldata.bf_titre_r2 !== "" &&
        <li>
        <h5 className="classGagne">
            {ldata.bf_titre_q2}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r2]}</i>
        </h5>
        </li>
        } 

        {ldata.bf_titre_r3 && ldata.bf_titre_r3 !== "" &&
        <li>
        <h5 className="classGagne">
            {ldata.bf_titre_q3}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r3]}</i>
        </h5>
        </li>
        } 

        {ldata.bf_titre_r4 && ldata.bf_titre_r4 !== "" &&
        <li>
        <h5 className="classGagne">
            {ldata.bf_titre_q4}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r4]}</i>
        </h5>
        </li>
        } 

        {ldata.bf_titre_r5 && ldata.bf_titre_r5 !== "" &&
        <li>
        <h5 className="classGagne">
            {ldata.bf_titre_q5}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r5]}</i>
        </h5>
        </li>
        } 
        </ul>
        <h4>Explication:</h4> 
        {ldata.bf_texte_consclusion}
        //console.log({ldata.imagebf_image_conclusion});imgfileconclusio
        { imgfileconclusion !== "" &&
                  <img src={imgfileconclusion} alt={imgfileconclusion} className="imgTitreQuestion"></img>
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
       <h2 className="classGagneLbl">Dommage: Vous avez perdu !!!</h2>
        
        <h4> Les réponses sont: </h4><ul>
        {ldata.bf_titre_r1 && ldata.bf_titre_r1 !== "" &&
        <li>
        <h5 className="classPerdu">
            {ldata.bf_titre_q1}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r1]}</i>
        </h5>
        </li>
        }  

        {ldata.bf_titre_r2 && ldata.bf_titre_r2 !== "" &&
        <li>
        <h5 className="classPerdu">
            {ldata.bf_titre_q2}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r2]}</i>
        </h5>
        </li>
        } 

        {ldata.bf_titre_r3 && ldata.bf_titre_r3 !== "" &&
        <li>
        <h5 className="classPerdu">
            {ldata.bf_titre_q3}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r3]}</i>
        </h5>
        </li>
        } 

        {ldata.bf_titre_r4 && ldata.bf_titre_r4 !== "" &&
        <li>
        <h5 className="classPerdu">
            {ldata.bf_titre_q4}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r4]}</i>
        </h5>
        </li>
        } 

        {ldata.bf_titre_r5 && ldata.bf_titre_r5 !== "" &&
        <li>
        <h5 className="classPerdu">
            {ldata.bf_titre_q5}
            <br/>
            <i>{tabreponse[ldata.listeListeBonneReponseListeBonneReponse_r5]}</i>
        </h5>
        </li>
        } 
        </ul>
        <h4>Explication:</h4> 
        {ldata.bf_texte_consclusion}
        { imgfileconclusion !== "" &&
          <img src={imgfileconclusion} alt={imgfileconclusion} className="imgTitreQuestion"></img>
        }
        </fieldset>
      </span>
    );
  }
}
export default CarteQfq;