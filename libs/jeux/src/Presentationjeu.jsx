import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

class Presentationjeu extends React.Component {
  constructor(props) {
    super(props);
  }
  toggleJouer() {
    this.props.toggleEtat(1);
  }
  toggleListe() {
    this.props.toggleEtat(2);
  }
  render() {
    let imgfile = "";
    if (
      typeof this.props.jeuEnCours.imagebf_imagedeb !== "undefined" &&
      this.props.jeuEnCours.imagebf_imagedeb != ""
    )
      imgfile =
        global.site + "/cache/image_" + this.props.jeuEnCours.imagebf_imagedeb;

    console.log("Presentation quiz en Cours", this.props.jeuEnCours.bf_titre);
    return (
      <span className="classQCQ">
        <p className="modeemploi">
          Présentation du quiz "{this.props.jeuEnCours.bf_titre}"
        </p>
        <fieldset>
          <legend className="trim-text">
            <span className="legendfieldset">
              {this.props.jeuEnCours.bf_titre}
            </span>
          </legend>
          <p className="enonce">{this.props.jeuEnCours.bf_debut}</p>
          {imgfile !== "" && (
            <img src={imgfile} alt={imgfile} className="imgTitreQuestion"></img>
          )}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => this.toggleJouer()}
            className="btnreponse"
          >
            Jouer
          </Button>
          &nbsp;
          <Button
            variant="secondary"
            size="lg"
            onClick={() => this.toggleListe()}
            className="btnreponse"
          >
            Revenir au sommaire
          </Button>
        </fieldset>
      </span>
    );
  }
}
export default Presentationjeu;
