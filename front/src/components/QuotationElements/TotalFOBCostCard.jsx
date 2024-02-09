import React from 'react';

import {
  Input,
  Table,
  Row,
  Col,
  Label
} from "reactstrap";

function TotalFOBCostCard ({...props}) {
  const Access = JSON.parse(localStorage.getItem('Access') || '{}');
  const {detail,helper,calcs,quickCost,header} = props;
  // const permision = quickCost ? Access.quick_costing : Access.quotation;
  const permision = header === "D" ?  true : (quickCost ? Access.quick_costing : Access.quotation);
  return (<>  
  <h6>Total Cost FOB</h6>
  <Table className="tablesorter" >
    <tbody>
      <tr>
        <td className="text-center">
          <p className="text-primary">Factoring %</p>
        </td>
        <td style={{width:"50%"}}>
          <Input
            type="number"
            placeholder="0"
            step="any"
            min="0"
            max="100"
            onChange={event => helper('factoring',event.target.value)}
            value={detail.factoring?detail.factoring:''}
            disabled={permision.edit?false:true}
          />
          <Row>
            <Col>
              <Label className="text-center text-primary">White</Label>
              <br/>
              ${calcs.factoringPrices.white.toFixed(2)}
            </Col>
            <Col>
              <Label className="text-center text-primary">Medium</Label>
              <br/>
              ${calcs.factoringPrices.medium.toFixed(2)}
            </Col>
            <Col>
              <Label className="text-center text-primary">Dark</Label>
              <br/>
              ${calcs.factoringPrices.dark.toFixed(2)}
            </Col>
            <Col>
              <Label className="text-center text-primary">Special</Label>
              <br/>
              ${calcs.factoringPrices.special.toFixed(2)}
            </Col>
          </Row>
        </td>
      </tr>
      <tr>
        <td className="text-center">
          <p className="text-primary">Profit %</p>
        </td>
        <td style={{width:"50%"}}>
          <Row>
            <Col>
              <label>White</label>
              <Input
                type="number"
                placeholder="0"
                step="any"
                min="0"
                max="100"
                onChange={event => helper('profitWhite',event.target.value)}
                value={detail.profitWhite?detail.profitWhite:''}
                disabled={permision.edit?false:true}
              />
              <div className="text-center text-primary">${calcs.profitValues.white.toFixed(2)}</div>
            </Col>
            <Col>
              <label>Medium</label>
              <Input
                type="number"
                placeholder="0"
                step="any"
                min="0"
                max="100"
                onChange={event => helper('profitMedium',event.target.value)}
                value={detail.profitMedium?detail.profitMedium:''}
                disabled={permision.edit?false:true}
              />
              <div className="text-center text-primary">${calcs.profitValues.medium.toFixed(2)}</div>
            </Col>
            <Col>
              <label>Dark</label>
              <Input
                type="number"
                placeholder="0"
                step="any"
                min="0"
                max="100"
                onChange={event => helper('profitDark',event.target.value)}
                value={detail.profitDark?detail.profitDark:''}
                disabled={permision.edit?false:true}
              />
              <div className="text-center text-primary">${calcs.profitValues.dark.toFixed(2)}</div>
            </Col>
            <Col>
              <label>Special</label>
              <Input
                type="number"
                placeholder="0"
                step="any"
                min="0"
                max="100"
                onChange={event => helper('profitSpecial',event.target.value)}
                value={detail.profitSpecial?detail.profitSpecial:''}
                disabled={permision.edit?false:true}
              />
              <div className="text-center text-primary">${calcs.profitValues.special.toFixed(2)}</div>
            </Col>
          </Row>
        </td>
      </tr>
      <tr>
        <td className="text-center">
          <p className="text-primary">Sales Commision %</p>
        </td>
        <td>
          <Input
            type="number"
            placeholder="0"
            step="any"
            min="0"
            max="100"
            onChange={event => helper('sell',event.target.value)}
            value={detail.sell?detail.sell:''}
            disabled={permision.edit?false:true}
          />
        </td>
      </tr>
      <tr>
        <td style={{width: '50%'}}>&nbsp;</td>
        <td style={{width: '50%'}}>
          <Row>
            <Col xs={3} className={'text-center'}>${calcs.totalValues.white.toFixed(2)}</Col>
            <Col xs={3} className={'text-center'}>${calcs.totalValues.medium.toFixed(2)}</Col>
            <Col xs={3} className={'text-center'}>${calcs.totalValues.dark.toFixed(2)}</Col>
            <Col xs={3} className={'text-center'}>${calcs.totalValues.special.toFixed(2)}</Col>
          </Row>
        </td>
      </tr>
    </tbody>
  </Table>
  </>);
}

export default TotalFOBCostCard;