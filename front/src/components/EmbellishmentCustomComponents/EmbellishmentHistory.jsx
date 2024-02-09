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

function EmbellishmentHistory({...props}) {
    const Access = JSON.parse(localStorage.getItem('Access') || '{}');
    
    function handleEditEmbellisment(event,data){
        props.editEmbellisment(event,data);
    }
    function handleDelete(event,data){
        props.removeEmbellisment(event,data);
    }
    Data=props.dataTable.map( (prop, key) => {
        return {                 
            id: prop.id,
            name: prop.name,
            actions: (
                <div className="actions-right" >
                    {Access.edit && <Button
                        onClick={(event) => {
                            let obj = Data.find(o => o.id === prop.id);
                            handleEditEmbellisment(event,obj);
                        }}
                        color="warning"
                        size="sm"
                        className="btn-icon btn-link edit"
                    >
                        <i className="fa fa-edit" />
                    </Button>}{" "}
                    {Access.delete && <Button
                        onClick={(event) => {
                            var data = Data;
                            data.find((o, i) => {
                                if (o.id === prop.id) {
                                    handleDelete(event,o.codigo)
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
                    </Button>}{" "}
                </div>
            )
        };
    });
    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Embellishments List</CardTitle>
            </CardHeader>
            <CardBody>
                <ReactTable
                    data={Data}
                    filterable
                    columns={[
                        {
                            Header: "ID",
                            accessor: "id"
                        },
                        {
                            Header: "Name",
                            accessor: "name"
                        },
                        {
                            Header: "Actions",
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
                            id: "id",
                            desc: true
                        }
                    ]}
                    className="-striped -highlight primary-pagination"
                />
            </CardBody>
        </Card>
    )
}

export default EmbellishmentHistory;