import React from "react";
import { Table } from "reactstrap";

export default function InfileResume(props) {
    console.log(props);
    // Ensure that props.data is an array before using the map function
    if (!Array.isArray(props.data)) {
        return <div>No data to display.</div>;
    }

    return props.data.map((index) => (
        <React.Fragment key={index.id}>
            <h4>Detalles de Factura: {index.id}</h4>
            <hr />
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>Cliente: {index.name}</div>
                    <div>Nit: {index.nit}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>Fecha: {index.date}</div>
                </div>
            </div>
            <br />

            <Table striped size={"sm"} style={{ marginBottom: "0rem" }}>
                <tbody>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Producto</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Monto</th>
                    </tr>

                    {index.detail && index.detail.map((detail) => {

                        return (<>

                            <tr key={detail.id}>
                                <td style={{ width: "20%" }}></td>
                                <td style={{ width: "20%" }}>{detail.products.name}</td>
                                <td style={{ width: "20%" }}>{detail.products.description}</td>
                                <td style={{ width: "20%" }}>{detail.quantity}</td>
                                <td style={{ width: "20%" }}>{detail.total_amount}</td>
                            </tr>
                        </>)

                    })}
                </tbody>
            </Table>
            <hr>
            </hr>
            <h3 style={{float:'right', marginRight:'3vh', fontWeight:'bold'}}>Total: {index.total}</h3>
            <br />
            <hr />
        </React.Fragment>
    ));
}
