import React from 'react';
import { isNoSubstitutionTemplateLiteral } from 'typescript';
class Header extends React.Component {
    render() {
    let encours = this.props.currentindex;    
    let targets = [];
    for (var idx in this.props.tabstatus ) {
        let index = idx;
        let item = this.props.tabstatus[idx];
        let idkey = "headerk"+index;
        let onclickstring ="onClick={()=>this.props.gotodirect("+index+")}";
        // console.log("HeaderTest ",idx," ", item,onclickstring);
        if (index==encours && item=="AJouer"){
            targets.push(   
                <span key={idkey}  className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/GrayQuestion_60x60.png" className="mesicones" alt="Essayez vous ..."></img> 
                        <span className="tooltiptext">{this.props.tabstitre[index]}
                        </span>
                    </span>
                </span>
                )
            }
        if (index==encours && item=="danger"){
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/RedLost_60x60.png" className="mesicones" alt="Dommage ..."></img> 
                        <span className="tooltiptext">{this.props.tabstitre[index]}
                        </span>
                    </span>    
                </span>
                )
            }
        if (index==encours && item=="success"){
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/GreenCheck_60x60.png" className="mesicones" alt="Respect ..."></img> 
                        <span className="tooltiptext">{this.props.tabstitre[index]}</span>
                    </span>
                </span>
                )
            }
        if (index!=encours && item=="AJouer"){
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="tooltip">
                        <img src="images/GrayQuestion_60x60.png" className="mesicones_d" alt="Essayez vous ..." onClick={()=>this.props.gotodirect(index)}></img> 
                        <span className="tooltiptext">{this.props.tabstitre[index]}
                        </span>
                    </span>
                </span>
                )
            }
        if (index!=encours && item=="danger"){
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/RedLost_60x60.png" className="mesicones_d" alt="Dommage ..." ></img> 
                        <span className="tooltiptext">{this.props.tabstitre[index]}
                        </span>
                    </span>    
                </span>
                )
            }
        if (index!=encours && item=="success"){
            targets.push(   
                <span key={idkey} className="spanheader">
                    <span className="waouh tooltip">
                        <img src="images/GreenCheck_60x60.png" className="mesicones_d" alt="Respect ..."></img> 
                        <span className="tooltiptext">{this.props.tabstitre[index]}
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
            </span>
            
            <button direction='right' className='nextButton' onClick={() => { this.props.next() }} ></button>
            </section>
        </header>
    )
    }
}

export default Header;