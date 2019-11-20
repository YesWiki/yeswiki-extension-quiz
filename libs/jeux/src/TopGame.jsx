import React from "react";
import axios from "axios";
import Carte from "./Carte";
import Header from "./Header";
import Slider from "./slider";
import Choixjeu from "./Choixjeu";
import Presentationjeu from "./Presentationjeu";
import Conclusionjeu from "./Conclusionjeu";
import "./horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./styles.css";
global.site = window.site;
global.file2load = window.datapath;
global.svgfile = window.svgfile;
global.idjeux = window.idjeux;
global.idcards = window.idcards;
global.search = window.location.search;

class TopGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "none",
      etat: "0",
      statut: "expose",
      listecartes: null,
      cardstitre: [],
      currentindex: "0",
      jeuEnCours: "tata"
    };
    let arrayid = this.computeparameters(global.search);
    if (arrayid != "") {
      global.idjeux = arrayid[1];
      global.idcards = arrayid[0];
    }
    this.toggleCardstatus = this.toggleCardstatus.bind(this);
    this.toggleNext = this.toggleNext.bind(this);
    this.togglePrevious = this.togglePrevious.bind(this);
    this.toggleCurrentIndex = this.toggleCurrentIndex.bind(this);
    this.toggleGotodirect = this.toggleGotodirect.bind(this);
    this.onScroll2Top = this.onScroll2Top.bind(this);
    this.setJeu = this.setJeu.bind(this);
    this.getListe = this.getListe.bind(this);
    this.toggleEtat = this.toggleEtat.bind(this);
  }

  computeparameters(str) {
    var ret = "";
    console.log("str: ", str);
    if (str && str != "") {
      var ar2 = str.split("=");
      console.log("ar2: ", ar2);
      var ret = ar2[1].split(",");
      console.log("ret: ", ret);
    }
    return ret;
  }

  getSectionRef = el => {
    this.sectionRef = el;
  };

  onScroll2Top = e => {
    if (this.sectionRef) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  componentWillMount() {
    console.log("search: ", global.search);
    axios
      .post("../../../../../?BazaR/json&demand=entries&id=" + global.idjeux) // JSON File Path
      .then(response => {
        this.setState({ jeux: response.data });
        this.setState({ etat: 2 });
      })
      .catch(function(error) {
        console.log("error axios", error);
      });
  }

  toggleCardstatus(index, value) {
    console.log("toggleCardStatus:", index, value);
    let tabcartes = this.state.data;
    let termine = true;
    tabcartes[index].status = value;
    // console.log("TCS: ", index, value, tabcartes )
    // alert('index = '+index+ " / value = "+value)
    // alert(this.state.color);
    let lcardstitrecpt = this.state.lcardstitrecpt;
    tabcartes.forEach(lcarte => {
      if (
        lcarte["checkboxfiche" + global.idcards] &&
        lcarte.status == "Verrou"
      ) {
        let tabprec = lcarte["checkboxfiche" + global.idcards].split(",");
        let antecedant = true;
        tabprec.forEach(prec => {
          if (tabcartes[lcardstitrecpt[prec]]) {
            console.log(
              "Antécédant : ",
              tabcartes[lcardstitrecpt[prec]].status
            );
            if (
              tabcartes[lcardstitrecpt[prec]].status == "AJouer" ||
              tabcartes[lcardstitrecpt[prec]].status == "Verrou"
            ) {
              antecedant = false;
            }
          }
        });

        if (antecedant) {
          tabcartes[lcarte.evkey].status = "AJouer";
        } else {
          tabcartes[lcarte.evkey].status = "Verrou";
        }
        console.log("nouveau status: ", tabcartes[lcarte.evkey].status);
      }
    });
    this.setState({ data: tabcartes });
    tabcartes.forEach(lcarte => {
      if (lcarte.status == "AJouer" || lcarte.status == "Verrou") {
        termine = false;
      }
    });
  }

  setCarteStatus() {
    let wdata = this.state.data;
    let Cpt = 0;
    let lcardstitrecpt = [];
    wdata.forEach(lcarte => {
      lcardstitrecpt[lcarte.id_fiche] = Cpt;
      lcarte.status = "AJouer";
      lcarte.evkey = Cpt;
      console.log("carte: ", lcarte);
      if (lcarte["checkboxfiche" + global.idcards]) {
        lcarte.status = "Verrou";
        console.log("carte: ", lcarte.id_fiche, " status: ", lcarte.status);
      }
      Cpt++;
    });
    this.setState({ data: wdata });
    console.log("state.data: ", this.state.data);
    this.setState({ lcardstitrecpt: lcardstitrecpt });
  }

  setJeu() {
    alert("setJeu");
    axios
      .post("?PageJeu/json&demand=save_entry&page=PageJeu&id=64", {
        bf_titre: "Test2",
        id_typeannonce: "64",
        antispam: "1",
        bf_texte: "toto2",
        id_fiche: "Test23"
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    alert("fin setJeu");
  }

  /*
   Cherche les cartes du Jeu dont l'id est donné en paramêtre
   Appelé depuis ChoixJeu
  */
  getListe(idjeu) {
    let stringpost =
      "../../../../../?BazaR/json&demand=entries&id=" +
      global.idcards +
      "&query=listefiche" +
      global.idjeux +
      "=" +
      idjeu.keyName;
    axios.post(stringpost).then(response => {
      console.log("dans Response");
      let mydata = [];
      Object.entries(response.data).forEach(([cle, valeur]) =>
        mydata.push(valeur)
      );
      this.setState({ data: mydata });
      this.setCarteStatus();
      this.setState({ etat: 3 }); // Vers présentation du Jeu
      this.setState({ jeuEnCours: this.state.jeux[idjeu.keyName] });
      console.log(
        "Jeu en cours :",
        this.state.jeux[idjeu.keyName],
        this.state.jeuEnCours
      );
    });
    console.log("fin getliste", this.state.etat);
  }

  /*
  getListeJeux() {
    alert('getListeJeux');
    axios.post(global.site.location + "/../../../../../?BazaR/json&demand=entries&id=63").then(res=>{
      this.setState({data : response.data.T_JEUX});
    })
    alert('fin getListeJeux');
  }
  */

  toggleNext() {
    // TODO se protéger contre le suivant vérouillé
    this.slider.next();
  }

  togglePrevious() {
    // TODO se protéger contre le précédent vérouillé
    this.slider.previous();
  }

  toggleGotodirect(x) {
    this.slider.goTodirect(x);
  }

  toggleCurrentIndex(windex) {
    this.setState({ currentindex: windex });
  }

  toggleEtat(state) {
    this.setState({ etat: state });
  }

  render() {
    console.log(
      "Etat du composant ",
      this.state.etat,
      " data ",
      this.state.data
    );
    switch (this.state.etat) {
      case 0:
        return <h1>Initialisation</h1>;
        break;
      case 1:
        return (
          <span ref={this.getSectionRef}>
            <Header
              tabcards={this.state.data}
              next={this.toggleNext}
              previous={this.togglePrevious}
              gotodirect={this.toggleGotodirect}
              currentindex={this.state.currentindex}
              lcardstitrecpt={this.state.lcardstitrecpt}
              toggleEtat={this.toggleEtat}
              scrollToTop={this.onScroll2Top}
            />

            <div className="wrapper">
              <Slider
                ref={instance => {
                  this.slider = instance;
                }}
                setCurrenindex={this.toggleCurrentIndex}
                scrollToTop={this.onScroll2Top}
                className="slider-wrapper"
              >
                {this.state.data.map(lcarte => (
                  <div key={lcarte.evkey} className="slider-content">
                    <Carte
                      data={lcarte}
                      tabcards={this.state.data}
                      lcardstitrecpt={this.state.lcardstitrecpt}
                      key={lcarte.bf_titre}
                      toggleCardstatus={this.toggleCardstatus}
                      scrollToTop={this.onScroll2Top}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </span>
        );
        break;
      case 2:
        return (
          <h1>
            <Choixjeu
              datajeux={this.state.jeux}
              setJeu={this.setJeu}
              getListe={this.getListe}
              set
            ></Choixjeu>
          </h1>
        );
        break;
      case 3:
        return (
          <h1>
            <Presentationjeu
              toggleEtat={this.toggleEtat}
              jeuEnCours={this.state.jeuEnCours}
              set
            ></Presentationjeu>
          </h1>
        );
        break;
      case 4:
        return (
          <h1>
            <Conclusionjeu
              datajeux={this.state.jeux}
              toggleEtat={this.toggleEtat}
              jeuEnCours={this.state.jeuEnCours}
              set
            ></Conclusionjeu>
          </h1>
        );
        break;

      default:
        return <h1>Merci de patienter...</h1>;
        break;
    }
  }
}

export default TopGame;
