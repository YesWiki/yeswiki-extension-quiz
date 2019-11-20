import React from 'react';
import { isNoSubstitutionTemplateLiteral } from 'typescript';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
    let encours = this.props.currentindex;    
    let lcardstitrecpt =this.props.lcardstitrecpt;
    let targets = [];
    let termine = true;
    let nbquestion = 0;
    let nbbonnereponse = 0;
    
    for (var idx in this.props.tabcards ) {
        let donnet = false;
        
        let index = idx;
        let item = this.props.tabcards[idx];
        let idkey = "headerk"+index;
        let onclickstring ="onClick={()=>this.props.gotodirect("+index+")}";
        console.log("HeaderTest ",idx," ", item);
        
        if (index==encours && item.status=="AJouer"){
            donnet=true;
            nbquestion ++;
            termine = false;
            targets.push(   
                <span key={idkey}  className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/GrayQuestion_60x60.png" className="mesicones" alt="Essayez vous ..."></img> 
                        <span className="tooltiptext">{this.props.tabcards[index].bf_titre}
                        </span>
                    </span>
                </span>
                )
            }
        if (index==encours && item.status=="danger"){
            donnet=true;
            nbquestion ++;
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/RedLost_60x60.png" className="mesicones" alt="Dommage ..."></img> 
                        <span className="tooltiptext">{this.props.tabcards[index].bf_titre}
                        </span>
                    </span>    
                </span>
                )
            }
        if (index==encours && item.status=="success"){
            donnet=true;
            nbbonnereponse ++;
            nbquestion ++;
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/GreenCheck_60x60.png" className="mesicones" alt="Respect ..."></img> 
                        <span className="tooltiptext">{this.props.tabcards[index].bf_titre}</span>
                    </span>
                </span>
                )
            }
        if (index!=encours && item.status=="AJouer"){
            donnet=true;
            termine = false;
            nbquestion ++;
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="tooltip">
                        <img src="images/GrayQuestion_60x60.png" className="mesicones_d" alt="Essayez vous ..." onClick={()=>this.props.gotodirect(index)}></img> 
                        <span className="tooltiptext">{this.props.tabcards[index].bf_titre}
                        </span>
                    </span>
                </span>
                )
            }
        if (index!=encours && item.status=="Verrou"){
            donnet=true;
            termine = false;
            nbquestion ++;
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/OrangeVerrou_60x60.png" className="mesicones_d" alt="Patience ..." ></img> 
                        <span className="tooltiptext">{this.props.tabcards[index].bf_titre}
                        </span>
                    </span>
                </span>
                )
            }
        if (index==encours && item.status=="Verrou"){
            donnet=true;
            termine = false;
            nbquestion ++;
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/OrangeVerrou_60x60.png" className="mesicones" alt="Patience ..." ></img> 
                        <span className="tooltiptext">{this.props.tabcards[index].bf_titre}
                        </span>
                    </span>
                </span>
                )
            }
        if (index!=encours && item.status=="danger"){
            donnet=true;
            nbquestion ++;
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/RedLost_60x60.png" className="mesicones_d" alt="Dommage ..." ></img> 
                        <span className="tooltiptext">{this.props.tabcards[index].bf_titre}
                        </span>
                    </span>    
                </span>
                )
            }
        if (index!=encours && item.status=="success"){
            donnet=true;
            nbbonnereponse ++;
            nbquestion ++;
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/GreenCheck_60x60.png" className="mesicones_d" alt="Respect ..."></img> 
                        <span className="tooltiptext">{this.props.tabcards[index].bf_titre}
                        </span>
                    </span>
                </span>
                )
            }
      
        if (!donnet){
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/BlackCheck_60x60.png" className="mesicones_d" alt="Respect ..."></img> 
                        <span className="tooltiptext">[{item.status}],{index},{encours}
                        </span>
                    </span>
                </span>
                )
            }
        }
    return(
        <header>
           
            <section>
            <button direction='left' className='previousButton'  onClick={() => { this.props.previous() }}></button>
            <span className="HeaderCenter">
            {targets}
            {termine && <span className="topMsg"  onClick={() => { this.props.toggleEtat(4) }} >&nbsp;Le jeu est terminé. Score: {nbbonnereponse} / {nbquestion} 
            </span> }
            </span>
            
            <button direction='right' className='nextButton' onClick={() => { this.props.next() }} ></button>
            </section>
        </header>
    )
    }
}

export default Header;