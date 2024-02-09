import React from "react";
import ReactTable from "react-table";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup
} from "reactstrap";

let data=[];

function PatternTable({...props}) {

    const Access = JSON.parse(localStorage.getItem('Access') || '{}');
    function onDownloadPattern(event){
        const target=event.target;
        const detail_id = target.dataset.detailid;
        props.handleFileChangePatternDownload(detail_id)
    }

    data = props.dataTable.map( (prop, key) => {
        return {
            id: key,
            codigo: prop.id,
            client: prop.client.name,
            style: prop.style,
            season: prop.season.name,
            rowData: prop,
            actions: (
                // we've added some custom button actions
                <div className="actions-right" >
                    <FormGroup className="text-center">
                        {/* use this button to upload Pattern */}
                        {Access.pattern.edit && <Button
                            color="success"
                            size="sm"
                            className="btn-simple"
                            type="button"
                        >
                            <input 
                                type="file" 
                                onChange={props.handleFileChangePatternUpload} 
                                name="patternFile" 
                                id={`input_patternFile_${prop.id}`}
                                data-detailid={prop.detail_id}
                                data-headerid={prop.id}
                            />
                            <i className="fas fa-upload" /> Pattern
                        </Button>}
                        {/* use this button to download Pattern */}
                        {
                            Access.pattern.edit && prop.patternFlag &&
                            <Button
                                color="success"
                                size="sm"
                                className="btn-simple"
                                type="button"
                                onClick={onDownloadPattern}
                                data-detailid={prop.detail_id}
                            >
                                <i className="fas fa-download" /> Pattern
                            </Button>
                        }
                        <br/>
                        {
                            Access.pattern.edit && (
                                prop.patternFlag && !prop.markerFlag
                            ) &&
                            <Button
                                color="success"
                                size="sm"
                                className="btn-simple"
                                type="button"
                            >
                                <input 
                                    type="file" 
                                    onChange={props.handleFileChangeMarkerUpload} 
                                    name="markerFile" 
                                    id={`input_markerFile_${prop.id}`}
                                    data-detailid={prop.detail_id}
                                    data-headerid={prop.id}
                                />
                                <i className="fas fa-upload" /> Marker
                            </Button>
                        }
                        <Button
                            color="warning"
                            size="sm"
                            className="btn-simple"
                            type="button"
                            onClick={e=>props.handleRemoveTaks(prop.id)}
                        >
                            <i className="fas fa-times" /> Cancel Tasks
                        </Button>
                    </FormGroup>
                </div>
            )
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
                            accessor: "codigo"
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
                            width: 350,
                            minWidth: 350
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

export default PatternTable;