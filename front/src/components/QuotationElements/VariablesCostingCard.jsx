import React from 'react';

import {
  Table
} from "reactstrap";

function VariablesCostingCard ({ ...props }){

  let TotalWhite = parseFloat(props.sumWhite)
  let TotalMedium = parseFloat(props.sumMedium)
  let TotalDark = parseFloat(props.sumDark)
  let TotalSpecial = parseFloat(props.sumSpecial)

  return (<Table className="tablesorter" style={{width: '100%'}}>
    <thead className="text-primary">
      <tr style={{textAlign: 'center'}}>
        <td><b>Total White cost</b></td>
        <td><b>Total Medium cost</b></td>
        <td><b>Total Dark cost</b></td>
        <td><b>Total Special cost</b></td>
      </tr>
    </thead>
    <tbody>
      <tr style={{textAlign: 'center'}}>
        <td> {'$'+(TotalWhite.toFixed(2))} </td>
        <td> {'$'+(TotalMedium.toFixed(2))} </td>
        <td> {'$'+(TotalDark.toFixed(2))} </td>
        <td> {'$'+(TotalSpecial.toFixed(2))} </td>
      </tr>
    </tbody>
  </Table>);
}

export default VariablesCostingCard;