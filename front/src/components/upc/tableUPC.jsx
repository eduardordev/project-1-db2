import React from "react";
import {
  Table
} from "reactstrap";

export default function UPCResume(props){
  return (<>
  {console.log(props.data, 'table')}
    <Table striped size={'sm'} style={{marginBottom: '0rem'}}>
      <tbody>
        <tr>
          <th style={{ textAlign: 'center'}}>Size</th>
          <th style={{ textAlign: 'center'}}>UPC No.</th>
        </tr>
            {props.data && props.data.sizes.map((index)=>(

                <>
                <tr>
                    <td style={{ textAlign: 'center'}}>{index.size_name}</td>
                    <td style={{ textAlign: 'center'}}> {index.upc}</td>
                </tr>
                </>
            ))}
      </tbody>
    </Table>
  </>);
}