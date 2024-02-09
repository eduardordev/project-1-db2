import React from "react";
import ReactTable from "react-table";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
} from "reactstrap";

let data=[];

function EngineeringTable({...props}) {
    const Access = JSON.parse(localStorage.getItem('Access') || '{}');
    data = props.dataTable.map( (prop, key) => {
        return {
            id: key,
            codigo: prop.id,
            client: prop.client.name,
            style: prop.style,
            season: prop.season.name,
            rowData: prop,
            actions: (
                <div className="actions-right" >
                    <FormGroup className="text-center">
                        {Access.engineering.edit && <Button
                            color="success"
                            size="sm"
                            className="btn-simple"
                            type="button"
                        >
                            <input 
                                type="file" 
                                onChange={props.handleFileChange} 
                                name="samFile"
                                id={`input_samFile_${prop.id}`}
                                data-detailid={prop.detail_id}
                                data-headerid={prop.id}
                                data-altcost={prop.altCost}
                            />
                            <i className="fas fa-upload" /> SAM
                        </Button>}
                    </FormGroup>
                </div>
            ),
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Pending CostSheets</CardTitle>
            </CardHeader>
            <CardBody>
                <ReactTable
                    data = {data}
                    filterable
                    columns = {[
                        {
                            Header: "Code",
                            accessor: "codigo",
                            width: 105,
                            minWidth: 105
                        },
                        {
                            Header: "Client",
                            accessor: "client"
                        },
                        {
                            Header: "Style",
                            accessor: "style"
                        },
                        {
                            Header: "Season",
                            accessor: "season"
                        },
                        {
                            Header: "Actions",
                            accessor: "actions",
                            sortable: false,
                            filterable: false,
                            width: 105,
                            minWidth: 105
                        }
                    ]}
                    defaultPageSize = {5}
                    showPaginationTop
                    showPaginationBottom = {false}
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

export default EngineeringTable;