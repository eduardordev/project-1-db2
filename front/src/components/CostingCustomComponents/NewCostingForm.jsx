import React from "react";
import Select from "react-select";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

const customStyles = {
    input: (provided) => ({
        ...provided,
        color: '#e14eca'
    })
}

function NewCostingForm (props){
    const Role = localStorage.getItem('role') || '';
    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">New CostSheet</CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={e=>e.preventDefault()}>
                    <Row>
                        <Col md={{size: 3, offset: 1}}>
                            <Select
                                styles = {customStyles}
                                className = "react-select primary"
                                classNamePrefix = "react-select"
                                name = "clientSelect"
                                value = {props.formData.client?props.formData.client:null}
                                onChange = {value => props.handleForm('client',value)}
                                options = {props.clients.map(client => {
                                    return {value: client.id, label: client.name}
                                })}
                                placeholder="Clients"
                            />
                        </Col>
                        <Col md="2">
                            <FormGroup id='formGroup_pathToTechpack' className="text-center">
                                <Button className="btn-simple" color="info" size="sm">
                                    <input 
                                        type="file" 
                                        onChange={event => {
                                            let file = null;
                                            let path = ''
                                            if(event.target.files[0]!==undefined){
                                                file = event.target.files[0];
                                                path = "techpack/"+event.target.files[0].name
                                            }
                                            props.handleForm('techpack',{
                                                file: file,
                                                path: path
                                            })
                                        } }
                                        name="pathToTechpack" 
                                        id="input_pathToTechpack"
                                    />
                                    <i className="tim-icons icon-cloud-upload-94" />
                                    &nbsp;techpack
                                </Button>
                                <label>{props.formData.techpack ? props.formData.techpack.path : ''}</label>
                            </FormGroup>
                        </Col>
                        <Col md="2">
                            <Input
                                type="text"
                                onChange = {event =>
                                    props.handleForm('style',event.target.value)
                                }
                                value={props.formData.style ? props.formData.style : ''}
                                placeholder="Style..."
                            />
                        </Col>
                        <Col md="3">
                            <Select
                                styles = {customStyles}
                                className = "react-select primary"
                                classNamePrefix = "react-select"
                                name = "seasonSelect"
                                value = {props.formData.season ? props.formData.season : null}
                                onChange = {value =>
                                    props.handleForm('season',value)
                                }
                                options = {props.seasons.map(season => {
                                    return {value: season.id, label: season.name}
                                })}
                                placeholder="Season"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size: 4}}></Col>
                        <Col md={{size: 4}}>
                            <Button 
                                color="primary" 
                                name="insert" 
                                type="button"
                                onClick={e=>{
                                    e.preventDefault();
                                    props.QuickCost();
                                }}
                            >
                                Create Quick Cost.
                            </Button>
                        </Col>
                        {Role!=="QuickCosting" && <Col md={{size: 4}}>
                            <Button 
                                color="primary" 
                                name="insert" 
                                type="button" 
                                onClick={(e)=>{
                                    e.preventDefault();
                                    props.onSubmit();
                                }}
                            >
                                Create Cost Sheet.
                            </Button>
                        </Col>}
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default NewCostingForm;