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
    Col,
    Input
} from "reactstrap";

import Select from "react-select";
import InputNumber from '../CustomElements/InputNumber';

const customStyles = {
    input: (provided) => ({
        ...provided,
        color: '#e14eca'
    })
}

class MaterialsForm extends React.Component { 

    Access = JSON.parse(localStorage.getItem('Access') || '{}');
    
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            client: '',
            name: '',
            season: '',
            unitPrice: '0',
            transport: '0',
            min: '0',
            catalogClients: [],
            submitButton: '',
            errorClient: '',
            errorName: '',
            errorSeason: '',
            errorUnitPrice: '',
            errorTransport: '',
            errorMin: '',
            clientSelect: null,
            seasonSelect: null
        }
    }

    handleChange = (event) => {
        const theInput = event.target.getAttribute('name');
        const theValue = event.target.value;
        this.setState({
            [theInput]: theValue,
            [`error_${theInput}`]: ''
        });
    }

    formValidation = (formElements) => {
        let valid = true;
        Object.keys(formElements).map( (index) => {
            if(formElements[index].getAttribute('name') !== null) {
                const inputName = formElements[index].getAttribute('name');
                if(
                    this.state[inputName] === ""
                ) {
                    let errorClass = '';
                    if(inputName === "client" || 
                        inputName === "season"
                    ){
                        errorClass = "text-danger"
                    }else{
                        errorClass = "has-danger"
                    }
                    let propName = `error` + `${inputName}`.charAt(0).toUpperCase() + `${inputName}`.slice(1);
                    this.setState( { [propName]: errorClass } );
                    valid = false;
                }
            }
            return index;
        });
        return valid;
    }

    formErrorReset = () => {
        this.setState({
            errorClient: '',
            errorName: '',
            errorSeason: '',
            errorUnitPrice: '',
            errorTransport: '',
            errorMin: ''
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formValidation = this.formValidation(event.target.elements);
        if(formValidation) {
            let formData = {
                id: this.state.id,
                client: this.state.client,
                name: this.state.name,
                season: this.state.season,
                unitPrice: this.state.unitPrice,
                transport: this.state.transport,
                min: this.state.min,
                clientSelect: this.state.clientSelect
            }
            this.formErrorReset();
            this.props.onSubmit(event, this.props.action, formData);
        }else{
            this.props.notification(
                'warning',
                'Form is missing some fields.'
            )
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.dataForm.id !== prevProps.dataForm.id) {
            let Season_id = this.props.dataForm.season ? parseInt(this.props.dataForm.season.id) : 0;
            let Client_id = this.props.dataForm.client ? parseInt(this.props.dataForm.client.id) : 0;
            let selectedSeason = this.props.seasons.find(o => o.value === Season_id);
            let clientSelect = this.props.providers.find(o => o.value === Client_id);
            if(Object.keys(this.props.dataForm).length > 0) {
                this.setState({
                    id: this.props.dataForm.id,
                    client: this.props.dataForm.id_client,
                    name: this.props.dataForm.name,
                    season: this.props.dataForm.id_season,
                    unitPrice: this.props.dataForm.unitPrice,
                    transport: this.props.dataForm.transport,
                    min: this.props.dataForm.min,
                    clientSelect: clientSelect,
                    seasonSelect: selectedSeason
                });
                this.formErrorReset();
            }else{
                //let clientSelect = prevProps.providers.find(o => o.value === parseInt(prevProps.dataForm.id_client));
                this.setState({
                    id: 0,
                    client: '',
                    name: '',
                    season: '',
                    unitPrice: '0',
                    transport: '0',
                    min: '0',
                    clientSelect: null,
                    seasonSelect: null
                });
            }
        }
    }

    resetForm = (event) => {
        this.formErrorReset();
        this.props.reset(event);
    }

    changeToInsert = () => {
        if(this.props.action === "update"){
            return <Button onClick={this.resetForm}>Crear Nueva</Button>
        }else{
            return <></>
        }
    }

    VisualizeElement = (action) => {
        if(action==="insert"){
            return this.Access.materials.create;
        }
        if(action==="update"){
            return this.Access.materials.edit;
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <h5 className="title">Create Material</h5>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md="6">
                                <label 
                                    htmlFor="input_client" 
                                    className={this.state.errorClient}
                                >
                                    Client
                                </label>
                                <FormGroup id="formGroup_client">
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="client"
                                        id="input_client"
                                        styles={customStyles}
                                        value={this.state.clientSelect}
                                        onChange={value => {
                                            this.setState({ 
                                                clientSelect: value,
                                                client: value.value,
                                                errorClient: ''
                                            })
                                        }}
                                        options={this.props.providers}
                                        placeholder="Choose client"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <label htmlFor="input_name">Description:</label>
                                <FormGroup id="formGroup_name" 
                                    className={this.state.errorName}
                                >
                                    <Input name="name" 
                                        placeholder="descripcion del material"
                                        type="text" id="input_name"
                                        value={this.state.name}
                                        onChange={this.handleChange} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6">
                                <label htmlFor="input_season"
                                    className={this.state.errorSeason}
                                >
                                    Season
                                </label>
                                <FormGroup id="formGroup_season">
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="season"
                                        id="input_season"
                                        styles={customStyles}
                                        value={this.state.seasonSelect}
                                        onChange={value =>{
                                            this.setState({ 
                                                seasonSelect: value,
                                                season: value.value,
                                                errorSeason: ''
                                            })
                                        }}
                                        options={this.props.seasons}
                                        placeholder="Choose season"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <InputNumber displayName="Unit price:" 
                                    name="unitPrice"
                                    placeHolder="0.00" min="0" step="any"
                                    defaultValue={this.state.unitPrice}
                                    onChange={this.handleChange}
                                    className={this.state.errorUnitPrice}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6">
                                <InputNumber displayName="Transportation:" 
                                    name="transport"
                                    placeHolder="0.00" min="0" step="any"
                                    defaultValue={this.state.transport}
                                    onChange={this.handleChange}
                                    className={this.state.errorTransport}
                                />
                            </Col>
                            <Col md="6">
                                <InputNumber displayName="Min:" 
                                    name="min"
                                    placeHolder="0.00" min="0" step="any"
                                    defaultValue={this.state.min}
                                    onChange={this.handleChange}
                                    className={this.state.errorMin}
                                />
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col className="px-md-1" md="6">
                                <FormGroup>
                                    {this.VisualizeElement(this.props.action) && <Button className="btn-fill" color="primary" type="submit">
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

export default MaterialsForm
