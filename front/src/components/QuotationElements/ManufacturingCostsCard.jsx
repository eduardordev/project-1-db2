import React from 'react';

import {
  Input,Row,Col
} from "reactstrap";

function ManufacturingCostsCard ({...props}){
  const Access = JSON.parse(localStorage.getItem('Access') || '{}');
  const {detail,calcs,helper,quickCost,header} = props;
  //const permision = quickCost ? Access.quick_costing : Access.quotation;
  const permision = header === "D" ?  true : (quickCost ? Access.quick_costing : Access.quotation);

  return (<>
    <tr>
      <td className="text-center">
        <p className="text-primary">Cost per Minute ($)</p>
      </td>
      <td style={{width:"50%"}}>
        <Input
          type="number"
          placeholder="0.00"
          step="any"
          min="0"
          max="999"
          onChange={event=>helper("cxm",event.target.value)}
          value={detail.cxm?detail.cxm:''}
          disabled={permision.edit?false:true}
        />
      </td>
    </tr>
    <tr>
      <td className="text-center">
        <p className="text-primary">Sewing Costs ($)</p>
      </td>
      <td style={{width:"50%"}}>
        <Input
          type="number"
          placeholder="0.00"
          step="any"
          min="0"
          readOnly
          value={calcs.sewing?(calcs.sewing).toFixed(2):''}
        />
      </td>
    </tr>
    <tr>
      <td className="text-center">
        <p className="text-primary">Cutting Costs ($)</p>
      </td>
      <td>
        <Input
          type="number"
          placeholder="0.00"
          step="any"
          min="0"
          max="999"
          onChange={event=>helper("cutting",event.target.value)}
          value={detail.cutting?detail.cutting:''}
          disabled={permision.edit?false:true}
        />
      </td>
    </tr>
    <tr>
      <td className="text-center">
        <p className="text-primary">Total Cut & Sewing</p>
      </td>
      <td className="text-center"  style={{width:"50%"}}>
        ${calcs.manufacturing.toFixed(2)}
      </td>
    </tr>
    <tr>
      <td className="text-center">
        <p className="text-primary">IR Reserve %</p>
      </td>
      <td style={{width:"50%"}}>
        <Input name="IrReserve"
          type="number"
          min="0" max="100" step="1"
          value={detail.pir?detail.pir:''}
          onChange={e=>helper('pir',e.target.value)}
          disabled={permision.edit?false:true}
        />
        <Row>
          <Col xs={3} className={'text-center text-primary'}>${calcs.IrPrices.white.toFixed(2)}</Col>
          <Col xs={3} className={'text-center text-primary'}>${calcs.IrPrices.medium.toFixed(2)}</Col>
          <Col xs={3} className={'text-center text-primary'}>${calcs.IrPrices.dark.toFixed(2)}</Col>
          <Col xs={3} className={'text-center text-primary'}>${calcs.IrPrices.special.toFixed(2)}</Col>
        </Row>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>&nbsp;</td>
      <td style={{width: '50%'}}>
        <Row>
          <Col xs={3} className={'text-center text-primary'}>${calcs.manufacturingPrices.white.toFixed(2)}</Col>
          <Col xs={3} className={'text-center text-primary'}>${calcs.manufacturingPrices.medium.toFixed(2)}</Col>
          <Col xs={3} className={'text-center text-primary'}>${calcs.manufacturingPrices.dark.toFixed(2)}</Col>
          <Col xs={3} className={'text-center text-primary'}>${calcs.manufacturingPrices.special.toFixed(2)}</Col>
        </Row>
      </td>
    </tr>
  </>);
}

export default ManufacturingCostsCard;