import React from "react";
import ReactTable from "react-table";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";

let Data=[];

function MaterialsHistory({...props}) {
    const Access = JSON.parse(localStorage.getItem('Access') || '{}');

    function handleEditMaterial(event,data){
        event.preventDefault();
        props.editMaterial(data);
    }
    function handleDelete(event,data){
        event.preventDefault();
        props.removeMaterial(data);
    }
    Data=props.dataTable.map( (prop, key) => {
        return {                 
            id: key,
            codigo: prop.id,
            client: prop.client.name,
            name: prop.name,
            season: prop.season.name,
            unitPrice: prop.unitPrice,
            rowData: prop,
            actions: (
                <div className="actions-right" >
                    {Access.materials.edit && <Button
                        onClick={(event) => {
                            let obj = Data.find(o => o.id === key);
                            handleEditMaterial(event,obj.rowData);
                        }}
                        color="warning"
                        size="sm"
                        className="btn-icon btn-link edit"
                    >
                        <i className="fa fa-edit" />
                    </Button>}
                    {" "}
                    {Access.materials.delete && <Button
                        onClick={(event) => {
                            var data = Data;
                            data.find((o, i) => {
                                if (o.id === key) {
                                    handleDelete(event,o)
                                    return true;
                                }
                                return false;
                            });
                        }}
                        color="danger"
                        size="sm"
                        className="btn-icon btn-link remove"
                    >
                        <i className="fa fa-times" />
                    </Button>}
                    {" "}
                </div>
            )
        };
    });
    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Materials</CardTitle>
            </CardHeader>
            <CardBody>
                <ReactTable
                    data={Data}
                    filterable
                    columns={[
                        {
                            Header: "Code",
                            accessor: "codigo"
                        },
                        {
                            Header: "Client",
                            accessor: "client"
                        },
                        {
                            Header: "Description",
                            accessor: "name"
                        },
                        {
                            Header: "Season",
                            accessor: "season"
                        },
                        {
                            Header: "Unit price",
                            accessor: "unitPrice"
                        },
                        {
                            Header: "Accions",
                            accessor: "actions",
                            sortable: false,
                            filterable: false
                        }
                    ]}
                    defaultPageSize = {props.itemsPages}
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
    )
}

export default MaterialsHistory;