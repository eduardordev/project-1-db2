import React from "react";
import ReactTable from "react-table";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle
} from "reactstrap";

let Data=[];

function FabricsHistory({...props}) {
    const Access = JSON.parse(localStorage.getItem('Access') || '{}');
    
    function handleEditFabric(data) {
        props.editFabric(data);
    }

    function handleDelete(data) {
        props.removeFabric(data);
    }

    Data = props.dataTable.map( (prop, key) => {
        //console.log(prop.id,key)
        return {                 
            id: key,
            codigo: prop.id,
            dm: prop.dm,
            show_name: prop.show_name,
            season: prop.season.name,
            client: prop.client.name,
            rowData: prop,
            actions: (
                <div className="actions-right" >
                    <Button
                        onClick={(event) => {
                            event.preventDefault();
                            handleEditFabric(prop);
                        }}
                        color = "warning"
                        size = "sm"
                        className = "btn-icon btn-link edit"
                    >
                        <i className = "fa fa-edit" />
                    </Button>
                    {" "}
                    {Access.fabrics.delete && <Button
                        onClick={(event) => {
                            event.preventDefault();
                            handleDelete(prop);
                        }}
                        color="danger"
                        size="sm"
                        className="btn-icon btn-link remove"
                    >
                        <i className="fa fa-times" />
                    </Button>}
                </div>
            )
        };
    })
    return (<>        
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Historico de Telas</CardTitle>
            </CardHeader>
            <CardBody>
                <ReactTable
                    data = {Data}
                    filterable
                    columns = {[
                        {
                            Header: "Codigo",
                            accessor: "codigo"
                        },
                        {
                            Header: "DM",
                            accessor: "dm"
                        },
                        {
                            Header: "nombre Tela",
                            accessor: "show_name"
                        },
                        {
                            Header: "Temporada",
                            accessor: "season"
                        },
                        {
                            Header: "Cliente",
                            accessor: "client"
                        },
                        {
                            Header: "Acciones",
                            accessor: "actions",
                            sortable: false,
                            filterable: false
                        }
                    ]}
                    defaultPageSize={props.itemsPages}
                    showPaginationTop
                    showPaginationBottom={false}
                    defaultSorted = {[
                        {
                            id: "codigo",
                            desc: true
                        }
                    ]}
                    className="-striped -highlight primary-pagination"
                />
            </CardBody>
        </Card>
    </>);
}

export default FabricsHistory;