import React from "react";
import {
  Table
} from "reactstrap";

export default function orderMaterialCpo(props){
  let { po_number, total } = props; 
  return (<>
    <Table striped size={'sm'} style={{marginBottom: '0rem'}}>
      <tbody>
        <tr>
          <th style={{ textAlign: 'center'}}>CPO</th>
          <th style={{ textAlign: 'center'}}>ESTILO</th>
          <th style={{ textAlign: 'center'}}>COLOR</th>
          <th style={{ textAlign: 'center'}}>UNIDADES</th>
        </tr>

        <tr>
          <td style={{textAlign: 'center'}}>{po_number}</td>
          <td style={{textAlign: 'center'}}></td>
          <td style={{textAlign: 'center'}}></td>
          <td style={{textAlign: 'center'}}>{total}</td>
        </tr>
      </tbody>
    </Table>
  </>);
}