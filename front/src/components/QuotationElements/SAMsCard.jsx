import React from 'react';

import {
  Input, Label, Row, Col, FormGroup
} from "reactstrap";

function fxNum(value) {
  if (value === null || value === undefined || value === "" || isNaN(value)) {
    return 0;
  }
  return parseFloat(value);
}

function SAMsCard({ ...props }) {
  let extraTime = 0.00
  if (props.detail.extraTime === null) {
    extraTime = 0.00
  } else if (props.detail.wtshirt) {
    if (props.detail.extra_time === 2.945) {
      //nuevo valor 
      extraTime = 2.945;
    } else {
      //viejo valor
      extraTime = 1.967;
    }
  } else if (props.detail.whodie) {
    if (props.detail.extra_time === 3.800) {
       //nuevo valor 
      extraTime = 3.800;
    } else {
       //viejo valor
      extraTime = 1.202;

    }
  } else if (props.detail.extra_time === 4.655) {
    extraTime = 4.655;
  } 


  const Access = JSON.parse(localStorage.getItem('Access') || '{}');
  const permision = props.header === "D" ? true : (props.quickCost ? Access.quick_costing : Access.quotation);
  //const permision = props.quickCost ? Access.quick_costing : Access.quotation;
  return (<>
    <tr>
      <td className="text-center" style={{ width: "50%" }}>
        <p className="text-primary">SAM</p>
      </td>
      <td className="text-center" style={{ width: "50%" }}>
        <Row>
          <Col xs={6}>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio" name="samRadio"
                  checked={props.detail.operation_flag}
                  value={true}
                  onChange={e => props.helper('operation_flag', e.target.value)}
                  disabled={permision.edit ? false : true}
                />
                Total Time
              </Label>
              <Input
                type="number"
                placeholder="0.00"
                step="0.01"
                onChange={event => props.helper("sam", event.target.value)}
                readOnly={!props.quickCost}
                value={fxNum(props.detail.totalTime)}
                disabled={permision.edit ? false : true}
              />
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio" name="samRadio"
                  checked={!props.detail.operation_flag}
                  value={false}
                  onChange={e => props.helper('operation_flag', e.target.value)}
                  disabled={permision.edit ? false : true}
                />
                Operation Time
              </Label>
              <Input
                type="number"
                placeholder="0.00"
                step="0.01"
                readOnly={!props.quickCost}
                value={fxNum(props.detail.production_time)}
                onChange={event => props.helper("production_time", event.target.value)}
                disabled={permision.edit ? false : true}
              />
            </FormGroup>
          </Col>
        </Row>
      </td>
    </tr>
    <tr>
      <td className="text-center" style={{ width: "50%" }}>
        <p className="text-primary">WASH</p>
      </td>
      <td className="text-center" style={{ width: "50%" }}>
        <Row>
          <Col xs={3}>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio" name="washRadio"
                  checked={props.detail.wtshirt}
                  value={props.detail.whodie}
                  onClick={e => props.helper('wash_flag', { wash: "wtshirt", value: e.target.value })}
                  disabled={permision.edit ? false : true}
                />
                T-SHIRT
              </Label>
            </FormGroup>
          </Col>
          <Col xs={3}>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio" name="washRadio"
                  checked={props.detail.whodie}
                  value={props.detail.whodie}
                  onClick={e => props.helper('wash_flag', { wash: "whodie", value: e.target.value })}
                  disabled={permision.edit ? false : true}
                />
                HOODIE
              </Label>
            </FormGroup>
          </Col>
          <Col xs={3}>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio" name="washRadio"
                  checked={props.detail.wcomplex}
                  value={props.detail.wcomplex}
                  onClick={e => props.helper('wash_flag', { wash: "wcomplex", value: e.target.value })}
                  disabled={permision.edit ? false : true}
                />
                COMPLEX
              </Label>
            </FormGroup>
          </Col>
          <Col xs={3}>
            <FormGroup check>
              <Label check>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  readOnly={true}
                  value={extraTime}
                  disabled={permision.edit ? false : true}
                />
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </td>
    </tr>
    <tr>
      <td className="text-center" style={{ width: "50%" }}>
        <p className="text-primary">Total SAM:</p>
      </td>
      <td className="text-center" style={{ width: "50%" }}>
        {props.detail.operation_flag ?
          fxNum(props.detail.totalTime) + extraTime :
          fxNum(props.detail.production_time) + extraTime
        }
      </td>
    </tr>
  </>);
}

export default SAMsCard;