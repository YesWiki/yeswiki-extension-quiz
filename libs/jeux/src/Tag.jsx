import React from 'react';
import Badge from 'react-bootstrap/Badge'

function Tag(props) {
    return (
        <Badge variant="danger" size="xs" key={this.props.cle} onClick={()=>props.clickTagFunction} >{props.proposition.bf_titre}&nbsp;{this.props.cpt}
        
        </Badge>
      
    );
  }

export default Tag;