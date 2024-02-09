import React from 'react';

import {
  Input,
  Table,
  Row,
  Col
} from "reactstrap";

function FOBCostCard ({...props}){
  const Access = JSON.parse(localStorage.getItem('Access') || '{}');
  const {detail,calcs,helper,quickCost,header} = props;
  //const permision = quickCost ? Access.quick_costing : Access.quotation;
  const permision = header === "D" ?  true : (quickCost ? Access.quick_costing : Access.quotation);

  return (<>
  <h6>Cost FOB Guatemala</h6>
  <Table className="tablesorter" >
    <tbody>
      <tr>
        <td className="text-center">
          <p className="text-primary">Insurance</p>
        </td>
        <td style={{width:"50%"}}>
          <Input
            type="number"
            placeholder="0"
            step="any"
            min="0"
            max="999"
            onChange={event=>helper('broker',event.target.value)}
            value={detail.broker?detail.broker:''}
            disabled={permision.edit?false:true}
          />
        </td>
      </tr>
      <tr>
        <td className="text-center">
          <p className="text-primary">Freight</p>
        </td>
        <td>
          <Row>
            <Col>
              <label>Price</label>
              <Input
                type="number"
                placeholder="0"
                step="any"
                min="0"
                max="10000"
                onChange={event=>helper('freightPrice',event.target.value)}
                value={detail.freightPrice?detail.freightPrice:''}
                disabled={permision.edit?false:true}
              />
            </Col>
            <Col>
              <label>Units</label>
              <Input
                type="number"
                placeholder="0"
                step="any"
                min="0"
                max="10000"
                onChange={event=>helper('freightQuantity',event.target.value)}
                value={detail.freightQuantity?detail.freightQuantity:''}
                disabled={permision.edit?false:true}
              />
            </Col>
            <Col>
              <label>Unit Price</label>
              <Input
                type="number"
                placeholder="0"
                step="any"
                min="0"
                readOnly
                value={calcs.freightTotal.toFixed(4)}
                disabled={permision.edit?false:true}
              />
            </Col>
          </Row>
        </td>
      </tr>
    </tbody>
  </Table>  
  <Table className="tablesorter" >
    <thead>
      <tr>
        <th style={{width: '50%'}}>&nbsp;</th>
        <th>White</th>
        <th>Medium</th>
        <th>Dark</th>
        <th>Special</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{width: '50%'}}>&nbsp;</td>
        <td>${calcs.logisticsPrices.white.toFixed(2)}</td>
        <td>${calcs.logisticsPrices.medium.toFixed(2)}</td>
        <td>${calcs.logisticsPrices.dark.toFixed(2)}</td>
        <td>${calcs.logisticsPrices.special.toFixed(2)}</td>
      </tr>
    </tbody>
  </Table>
  </>);
}
export default FOBCostCard;