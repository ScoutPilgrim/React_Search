import React from 'react';
import './Produce.css';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';

class Produce extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="produceDiv">
                <Card>
                    <CardImg top width="100" src={this.props.img} alt=""/>
                    <CardBody>
                        <CardTitle><h3>{this.props.title}</h3></CardTitle>
                        <CardSubtitle>{this.props.description}</CardSubtitle>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Produce;