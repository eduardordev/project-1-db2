import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Row,
    Col
} from "reactstrap";

import LeftIconInput from '../CustomElements/LeftIconInput';

class EnbellishmentForm extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    Access = JSON.parse(localStorage.getItem('Access') || '{}');

    handleChange = (event) => {
        const theInput=event.target.getAttribute('name');
        const theValue=event.target.value;
        this.setState({[theInput]: theValue});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let formData= {
            name: this.state.name
        }
        this.props.onSubmit(this.props.action,formData);
    }

    componentWillReceiveProps(nextProps){
        if(Object.keys(nextProps.dataForm).length > 0){
            this.setState({
                name: nextProps.dataForm.name
            });
        }else{
            this.setState({
                name: ""
            });
        }
    }

    resetForm = (event) => {
        this.props.reset(event);
    }

    changeToInsert = () => {
        if(this.props.action==="update"){
            return <Button onClick={this.resetForm}>New</Button>
        }else{
            return <></>
        }
    }

    VisualizeElement = (action) => {
        if(action==="insert"){
            return this.Access.create;
        }
        if(action==="update"){
            return this.Access.edit;
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <h5 className="title">Embellishments</h5>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md="6">
                                <LeftIconInput name="name" 
                                    displayName="Name:"
                                    placeHolder="Embellishment name..." 
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    icon="icon-paper" 
                                />
                            </Col>
                        </Row>                        
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    {this.VisualizeElement(this.props.action) && 
                                    <Button className="btn-fill" color="primary" type="submit">
                                        {this.props.actionText}
                                    </Button>}
                                    {` `}
                                    {this.changeToInsert()}
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default EnbellishmentForm
