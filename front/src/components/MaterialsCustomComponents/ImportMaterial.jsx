import React from 'react';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Row,
  Col,
  Input
} from "reactstrap";
//import Select from "react-select";

export default function ImportMaterial(props) {
  //const Access = JSON.parse(localStorage.getItem('Access') || '{}');
  const {
    ID,
    onChange,
    onSubmit,
  } = props;
  return (<>
    <Card>
      
      <CardBody>
        <Form onSubmit={e => {
          e.preventDefault();
          onSubmit(ID)
        }}>
          <FormGroup id="formGroup_name">
           
            <Row>
              <Col sm={12} md={4}>
              <label htmlFor="input_name">ID:</label>
                <Input name="oldID"
                  placeholder="Old material id"
                  type="text" id="oldID"
                  value={ID ? ID : ''}
                  onChange={e => onChange(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col className="px-md-1" md="6">
                <FormGroup>
                  <Button className="btn-fill" color="primary" type="submit">
                    Search
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  </>)
}