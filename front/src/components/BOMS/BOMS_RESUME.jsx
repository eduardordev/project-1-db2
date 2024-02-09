import React from "react";
import ReactTable from "react-table";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

let tableData = [];

export default function ResumeTable ({ 
  tableHeaders,
  bomsHeaders,
  }) {
    return ( 
  <div className={style.tableContainer} >

        <div className="row">
          <div className="col-lg-12  bg-white rounded shadow">


            <div className="table-responsive">
              <table className={`col-lg-12 table ${style.tablefixed}`}>
                <thead>
                  <tr>
                    <th scope="col" className={style.code}>Code</th>
                    <th scope="col" className={style.description}>  Description</th>
                    <th scope="col" className={style.measure}>Unit Measure</th>
                    {tableHeaders.map((color, idx) => (
                        <th className={style.colors} scope="col">{color.Header}</th>
                    ))}
                    <th scope="col" className={style.actions}>actions</th>
                  </tr>
                </thead>
                <tbody>

                  {bomsHeaders.map((material, idx) => (
                    <tr>
                      <th className={style.code}>{material.id}</th>
                      <td className={style.description}>{material.description}</td>
                      <td className={style.measure}>{material.measure}</td>
                      {tableHeaders.map((colors,idx) => (
                        
                        <td className={style.colors}>{material.consumptions.map(color => (
                          <p>
                            {color.color === colors.Header ?

                              <>
                                {color.consumption}
                              </>
                              : (<p className='visibility: hidden'></p>)
                            }
                          </p>
                        ))}
                        </td>
                        ))}
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
        {/*<Table responsive>
          <tbody>
            <tr>
              <th> </th>
              <th>TOTALES</th>
              <th> </th>
              {_setLenght &&
                this.setArrayLenght(tableHeaders)}
              {_getConsumptionMaterials &&

                this.getConsumptionByColor(bomsHeaders, tableHeaders)}
              {tableHeaders.map(color => (
                <th scope="col">{color.Header}
                  <br></br>
                  {this.totales[color.id]}

                </th>
              ))}
              <th> </th>
            </tr>
          </tbody>
              </Table>*/}
      </div>)
}

export default ResumeTable;