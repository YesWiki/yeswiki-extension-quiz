import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

class Conclusionjeu extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleListe() {
    this.props.toggleEtat(2);
  }

  render() {
    let imgfile = "";
    if (
      typeof this.props.jeuEnCours.imagebf_imagefin !== "undefined" &&
      this.props.jeuEnCours.imagebf_imagedeb != ""
    )
      imgfile =
        global.site + "/cache/image_" + this.props.jeuEnCours.imagebf_imagefin;

    console.log("Conclusion du quiz", this.props.jeuEnCours.bf_titre);
    return (
      <span className="classQCQ">
        <p className="modeemploi">
          Conclusion du quiz "{this.props.jeuEnCours.bf_titre}"
        </p>
        <fieldset>
          <legend className="trim-text">
            <span className="legendfieldset">
              {this.props.jeuEnCours.bf_titre}
            </span>
          </legend>
          <p className="enonce">{this.props.jeuEnCours.bf_fin}</p>
          {imgfile !== "" && (
            <img src={imgfile} alt={imgfile} className="imgTitreQuestion"></img>
          )}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => this.toggleListe()}
            className="btnreponse"
          >
            Revenir au choix des quiz
          </Button>
        </fieldset>
      </span>
    );
  }
}
export default Conclusionjeu;
