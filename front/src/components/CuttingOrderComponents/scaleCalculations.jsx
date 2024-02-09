import React from 'react';
import {
  Input,
  Table
} from "reactstrap";

function ScaleCalculations({ ...props }) {

  console.log('index',props.index, 'data', props.data1[props.index] && props.data1[props.index]);
  let count = 0
  let count2 = 0
  let count3 = 0
  let count4 = 0
  return (
    <div>
      <Table id={props.index} className="tablesorter" style={{ width: "2000px" }} responsive>
        <thead className="text-primary">
          <tr>
            <th style={{ width: "100px" }}>Scale</th>
            <th style={{ width: "100px" }}>Plies</th>
            {props.size.sizes.map((size, index) => {
              return (
                <th key={index} style={{ width: "100px" }}>
                  {size.clients_size}
                </th>
              );
            })}
            <th style={{ width: "100px" }}>Sizes</th>
            <th style={{ width: "100px" }}>Sizes per Plies</th>
            <th style={{ width: "100px" }}>Length (Yds)</th>
            <th style={{ width: "100px" }}>%</th>
            <th style={{ width: "100px" }}>Length + 2</th>
            <th style={{ width: "100px" }}>Total Length</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <Input
                id={`plies${props.index}`}
                type="number"
                defaultValue ={props.data1[props.index] && props.data1[props.index][0] && props.data1[props.index][0].row1.plies}
                onChange = {(e) => {props.data1[props.index] && (props.data1[props.index][0].row1.plies = parseInt(e.target.value)); console.log(props)}}
                  //props.data.row1.plies = parseInt(e.target.value)}
              >
              </Input>
            </td>
            {/* tallas*/}
            {props.size.sizes.map((size, index) => {
            return (
             <td key={index} style={{ width: "25px" }}>
               <Input
                 id={`${size.clients_size} ${index}`}
                  type="number"
               defaultValue={props.data1[props.index] && props.data1[props.index][0].row1.sizes[index]}
                    onChange = {(e) => props.data1[props.index][0].row1.sizes[index] = parseInt(e.target.value)}

                   >
                   </Input>
                 </td>
               );
             })}
            {/* sizes */}
            <td>
              {/* <Input
                id="sizes1"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row1.totalsizes}
                onChange = {(e) => props.data1[props.index][0].row1.totalsizes = parseInt(e.target.value)}
                
              >
              </Input> */}

              {props.data1[props.index] && props.data1[props.index][0].row1.sizes.map((index, key) =>{
                  count = parseInt(count) + parseInt(index)
                 
              })}
              { 
                    count
                  }
            </td>
            {/* per plies */}
            <td>
              {/* <Input
                id="sizesxplies1"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row1.sizeXplies}
                onChange = {(e) => props.data1[props.index][0].row1.sizeXplies = parseInt(e.target.value)}

              >
              </Input> */}
              {
                props.data1[props.index] &&  parseInt(props.data1[props.index][0].row1.plies) * count
              }
            </td>
            {/* length(yds) */}
            <td>
              <Input
                id="length1"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row1.len}
                onChange = {(e) => props.data1[props.index][0].row1.len = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* % */}
            <td>
              <Input
                id="percent1"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row1.percentage}
                onChange = {(e) => props.data1[props.index][0].row1.percentage = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* length + 2 */}
            <td>
              <Input
                id="lenP1"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row1.lenP2}
                onChange = {(e) => props.data1[props.index][0].row1.lenP2 = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* total length */}
            <td>
              <Input
                id="totalLen1"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row1.totalLen}
                onChange = {(e) => props.data1[props.index][0].row1.totalLen = parseInt(e.target.value)}

              >
              </Input>
            </td> 
          </tr>

          <tr>
            <td>2</td>
            <td>
              <Input
                id={`plies${props.index}`}
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row2.plies}
                onChange = {(e) => (props.data1[props.index] && (props.data1[props.index][0].row2.plies = parseInt(e.target.value)))}

              >
              </Input>
            </td>
            {/* tallas */}
            {props.size.sizes.map((size, index) => {
              return (
                <td key={index} style={{ width: "25px" }}>
                  <Input
                    id={`${size.clients_size} ${index}`}
                    type="number"
                    defaultValue={props.data1[props.index] && props.data1[props.index][0].row2.sizes[index]}
                    onChange = {(e) => props.data1[props.index][0].row2.sizes[index] = parseInt(e.target.value)}

                  >
                  </Input>
                </td>
              );
            })}
            {/* sizes */}
            <td>
              {/* <Input
                id="sizes2"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row2.totalsizes}
                onChange = {(e) => props.data1[props.index][0].row2.totalsizes = parseInt(e.target.value)}

              >
              </Input> */}
               {props.data1[props.index] && props.data1[props.index][0].row2.sizes.map((index, key) =>{
                  count2 = parseInt(count2) + parseInt(index)
                 
              })}
              { 
                    count2
                  }
            </td>
            {/* per plies */}
            <td>
              {/* <Input
                id="sizesxplies2"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row2.sizeXplies}
                onChange = {(e) => props.data1[props.index][0].row2.sizeXplies = parseInt(e.target.value)}

              >
              </Input> */}
              {
                props.data1[props.index] &&  parseInt(props.data1[props.index][0].row2.plies) * count2
              }
            </td>
            {/* length(yds) */}
            <td>
              <Input
                id="length2"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row2.len}
                onChange = {(e) => props.data1[props.index][0].row2.len = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* % */}
            <td>
              <Input
                id="percent2"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row2.percentage}
                onChange = {(e) => props.data1[props.index][0].row2.percentage = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* length + 2 */}
            <td>
              <Input
                id="lenP2"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row2.lenP2}
                onChange = {(e) => props.data1[props.index][0].row2.lenP2 = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* total length */}
            <td>
              <Input
                id="totalLen2"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row2.totalLen}
                onChange = {(e) => props.data1[props.index][0].row2.totalLen = parseInt(e.target.value)}

              >
              </Input>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>
              <Input
                id={`plies${props.index}`}
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row3.plies}
                onChange = {(e) => props.data1[props.index][0].row3.plies = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* tallas */}
            {props.size.sizes.map((size, index) => {
              return (
                <td key={index} style={{ width: "25px" }}>
                  <Input
                    id={`${size.clients_size} ${index}`}
                    type="number"
                    defaultValue={props.data1[props.index] && props.data1[props.index][0].row3.sizes[index]}
                    onChange = {(e) => props.data1[props.index][0].row3.sizes[index] = parseInt(e.target.value)}

                  >
                  </Input>
                </td>
              );
            })}
            {/* sizes */}
            <td>
              {/* <Input
                id="sizes3"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row3.totalsizes}
                onChange = {(e) => props.data1[props.index][0].row3.totalsizes = parseInt(e.target.value)}

              >
              </Input> */}
               {props.data1[props.index] && props.data1[props.index][0].row3.sizes.map((index, key) =>{
                  count3 = parseInt(count3) + parseInt(index)
                 
              })}
              { 
                    count3
                  }
            </td>
            {/* per plies */}
            <td>
              {/* <Input
                id="sizesxplies3"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row3.sizeXplies}
                onChange = {(e) => props.data1[props.index][0].row3.sizeXplies = parseInt(e.target.value)}

              >
              </Input> */}
              {
                props.data1[props.index] &&  parseInt(props.data1[props.index][0].row3.plies) * count3
              }
            </td>
            {/* length(yds) */}
            <td>
              <Input
                id="length3"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row3.len}
                onChange = {(e) => props.data1[props.index][0].row3.len = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* % */}
            <td>
              <Input
                id="percent3"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row3.percentage}
                onChange = {(e) => props.data1[props.index][0].row3.percentage = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* length + 2 */}
            <td>
              <Input
                id="lenP3"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row3.lenP2}
                onChange = {(e) => props.data1[props.index][0].row3.lenP2 = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* total length */}
            <td>
              <Input
                id="totalLen3"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row3.totalLen}
                onChange = {(e) => props.data1[props.index][0].row3.totalLen = parseInt(e.target.value)}

              >
              </Input>
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>
              <Input
                id={`plies${props.index}`}
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row4.plies}
                onChange = {(e) => props.data1[props.index][0].row4.plies = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* tallas */}
            {props.size.sizes.map((size, index) => {
              return (
                <td key={index} style={{ width: "25px" }}>
                  <Input
                    id={`${size.clients_size} ${index}`}
                    type="number"
                    defaultValue={props.data1[props.index] && props.data1[props.index][0].row4.sizes[index]}
                    onChange = {(e) => props.data1[props.index][0].row4.sizes[index] = parseInt(e.target.value)}

                  >
                  </Input>
                </td>
              );
            })}
            {/* sizes */}
            <td>
              {/* <Input
                id="sizes4"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row4.totalsizes}
                onChange = {(e) => props.data1[props.index][0].row4.totalsizes = parseInt(e.target.value)}

              >
              </Input> */}
               {props.data1[props.index] && props.data1[props.index][0].row4.sizes.map((index, key) =>{
                  count4 = parseInt(count4) + parseInt(index)
                 
              })}
              { 
                    count4
                  }
            </td>
            {/* per plies */}
            <td>
              {/* <Input
                id="sizesxplies4"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row4.sizeXplies}
                onChange = {(e) => props.data1[props.index][0].row4.sizeXplies = parseInt(e.target.value)}

              >
              </Input> */}
              {
                props.data1[props.index] &&  parseInt(props.data1[props.index][0].row4.plies) * count4
              }
            </td>
            {/* length(yds) */}
            <td>
              <Input
                id="length4"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row4.len}
                onChange = {(e) => props.data1[props.index][0].row4.len = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* % */}
            <td>
              <Input
                id="percent4"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row4.percentage}
                onChange = {(e) => props.data1[props.index][0].row4.percentage = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* length + 2 */}
            <td>
              <Input
                id="lenP4"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row4.lenP2}
                onChange = {(e) => props.data1[props.index][0].row4.lenP2 = parseInt(e.target.value)}

              >
              </Input>
            </td>
            {/* total length */}
            <td>
              <Input
                id="totalLen4"
                type="number"
                defaultValue={props.data1[props.index] && props.data1[props.index][0].row4.totalLen}
                onChange = {(e) => ((props.data1[props.index][0].row4.totalLen = parseInt(e.target.value)))}

              >
              </Input>
            </td>
          
          </tr>
          <tr>
            <td>
              TOTALES
            </td>
            <td>
              
            </td>
              {/* tallas */}
              <td>
              {
                ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[0]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[0]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[0])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[0])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[0])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[0])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[0])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[0])) ) : <></>
              }
              </td>
              <td>
              {
               ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[1]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[1]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[1])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[1])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[1])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[1])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[1])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[1])) ) : <></>
              }
              </td>
              <td>
              {
                ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[2]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[2]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[2])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[2])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[2])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[2])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[2])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[2])) ) : <></>
              }
              </td>
              <td>
              {
              ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[3]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[3]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[3])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[3])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[3])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[3])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[3])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[3])) ) : <></>

              }
              </td>
              <td>
              {
              ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[4]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[4]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[4])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[4])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[4])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[4])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[4])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[4])) ) : <></>

              }
              </td>
              <td>
              {
              ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[5]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[5]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[5])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[5])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[5])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[5])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[5])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[5])) ) : <></>

              }
              </td>
              <td>
              {
              ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[6]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[6]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[6])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[6])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[6])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[6])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[6])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[6])) ) : <></>

              }
              </td>
              <td>
              {
              ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[7]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[7]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[7])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[7])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[7])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[7])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[7])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[7])) ) : <></>

              }
              </td>
              <td>
              {
               ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[8]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[8]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[8])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[8])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[8])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[8])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[8])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[8])) ) : <></>

              }
              </td>
              <td>
              {
              ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[9]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[9]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[9])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[9])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[9])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[9])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[9])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[9])) ) : <></>

              }
              </td>
              <td>
              {
              ((props.data1[props.index] && props.data1[props.index][0].row1.sizes[10]) || (props.data1[props.index] && props.data1[props.index][0].row2.sizes[10]) || (props.data1[props.index] && props.data1[props.index][0].row3.sizes[10])|| (props.data1[props.index] && props.data1[props.index][0].row4.sizes[10])) ? (((props.data1[props.index] && props.data1[props.index][0].row1.plies) * (props.data1[props.index] && props.data1[props.index][0].row1.sizes[10])) + ((props.data1[props.index] && props.data1[props.index][0].row2.plies) * (props.data1[props.index] && props.data1[props.index][0].row2.sizes[10])) + ((props.data1[props.index] && props.data1[props.index][0].row3.plies) * (props.data1[props.index] && props.data1[props.index][0].row3.sizes[10])) + ((props.data1[props.index] && props.data1[props.index][0].row4.plies) * (props.data1[props.index] && props.data1[props.index][0].row4.sizes[10])) ) : <></>

              }
              </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
              {props.size.sizes.map((size, index) => {
              return (
                <td key={index} style={{ width: "25px" }}>
                  {
                   Math.round((size.quantity * (props.tolerance / 100)) + size.quantity)
                  }
                </td>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ScaleCalculations;