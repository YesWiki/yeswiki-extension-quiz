import React from "react";
import Button from "react-bootstrap/Button";

class Choixjeu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ljeux: this.props.datajeux
    };
    this.setJeu = this.props.setJeu.bind(this);
    this.getListe = this.props.getListe.bind(this);
    console.log("pass2", this.props.datajeux);
  }

  render() {
    // let ljeux = Object.entries(this.state.ljeux);
    let ljeux = this.state.ljeux;
    return (
      <span className="classListeJeu">
        <h2>Choix du quiz</h2>
        <fieldset>
          <ol>
            {Object.keys(ljeux).map(keyName => (
              <li
                className="travelcompany-input"
                key={keyName}
                onClick={() => this.props.getListe({ keyName })}
              >
                <span key={keyName} className="spanheader">
                  <span className="waouh tooltip">
                    <span>{ljeux[keyName].bf_titre} </span>
                    <span className="tooltiptext">
                      {ljeux[keyName].bf_debut}
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </fieldset>
      </span>
    );
  }
}

export default Choixjeu;
