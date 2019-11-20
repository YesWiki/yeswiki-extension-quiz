import React from 'react';
import CarteQcu from './CarteQcu';
import CarteQcm from './CarteQcm';
import CarteQfq from './CarteQfq';
import CarteVerrouille from './CarteVerrouille';

class Carte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status:'encours', // Status encours, gagne, perdu
      statusResult:'secondary',
      cpt:this.props.data.evkey
    };
    this.statusResultMethod = this.statusResultMethod.bind(this);
  }
  statusResultMethod(resultStatus) {
    let lstatusResult= this.state.statusResult;
    lstatusResult = resultStatus;
    this.setState({statusResult:lstatusResult});
    this.props.toggleCardstatus(this.state.cpt,resultStatus);
    //alert(this.state.color);
  }

  render() {
    const ldata = this.props.data;
    // console.log(ldata.evkey);
    if (ldata.status == "Verrou")
    return (
      <CarteVerrouille
        data={ldata}
        scrollToTop= {this.props.scrollToTop}
        tabcards={ this.props.tabcards}
        lcardstitrecpt ={this.props.lcardstitrecpt}
      ></CarteVerrouille>
  );
    if (ldata.listeListeTypequestion==='QCU')
    return (
        <CarteQcu
          data={ldata}
          toggleMethod={this.statusResultMethod}
          scrollToTop= {this.props.scrollToTop}
        ></CarteQcu>
    ); 
    if (ldata.listeListeTypequestion==='QCM')
    return (
        <CarteQcm
          data={ldata}
          toggleMethod={this.statusResultMethod}
          scrollToTop= {this.props.scrollToTop}
        ></CarteQcm>
    ); 
    if (ldata.listeListeTypequestion==='QFQ')
    return (
      <span>
        <CarteQfq
          data={ldata}
          toggleMethod={this.statusResultMethod}
          scrollToTop= {this.props.scrollToTop}
        ></CarteQfq>
        </span>
    ); 
    return(<h1>Gros bug</h1>) 
  }
}

export default Carte;