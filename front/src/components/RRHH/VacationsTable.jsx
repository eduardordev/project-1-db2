import React from "react";
import {
    Table,
    Input
} from "reactstrap";

export default function VacationsTable(props) {
    console.log(props.props);

    return (<>
        <Table striped size={'sm'} >
            <tbody>
                <tr>
                    
                    <th style={{ textAlign: 'center', width: '25%' }}>CODIGO</th>
                    <th style={{ textAlign: 'center', width: '25%' }}>FECHA</th>
                    <th style={{ textAlign: 'center', width: '25%' }}>CICLO</th>
                    <th style={{ textAlign: 'center', width: '25%' }}>MONTO</th>
                </tr>

                {props.props.map((data) => {
                    return (
                        <tr>

                            <td style={{ textAlign: 'center', width: '20%' }}>{data.CODIGO}</td>
                            <td style={{ textAlign: 'center', width: '20%' }}>{data.FECHA}</td>
                            <td style={{ textAlign: 'center', width: '20%' }}>{data.CICLO}</td>
                            <td style={{ textAlign: 'center', width: '20%' }}>{data.MONTO}</td>

                        </tr>
                    )
                })}



            </tbody>
        </Table>
    </>);
}