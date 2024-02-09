import React from "react";
import {Table,Button,Card,CardHeader,CardBody} from 'reactstrap';

function CustomTable({ ...props }) {
    const {
      jsonData
    } = props;
    function onclickButton(event,id,rowData){
        props.editPopulate(id,rowData);
    }
    function onClickDelete(event,id){
        props.removeFabric(event,id);
    }
    function assembleTable(data){
        let TableJsx;
        TableJsx=data.Title ? <CardHeader>{data.Title}</CardHeader> : <></>;
        let Header;
        let Body;
        function buildOptions(id,rowData){
            let cellOptions=<td></td>;
            if(data.Options){
                let optionButton;
                const cellOps=data.Options.map( (item,index)=>{
                    switch(item.option){
                        case 'can-edit':
                            optionButton= (<span key={index}>
                                <Button color="success" className="btn-simple" size="sm" 
                                    onClick={event=>onclickButton(event,id,rowData)}>
                                    <i className="tim-icons icon-pencil" />
                                </Button>{` `}
                            </span>);
                        break;
                        case 'can-update':
                            optionButton= (<span key={index}>
                                <Button className="btn-icon" color="info" size="sm">
                                    <i className="fa fa-user"></i>
                                </Button>{` `}
                            </span>);
                        break;
                        case 'can-delete':
                            optionButton= (<span key={index}>
                                <Button color="danger" className="btn-simple" size="sm"
                                    onClick={event=>onClickDelete(event,id.value)}>
                                    <i className="tim-icons icon-trash-simple" />
                                </Button>{` `}
                            </span>);
                        break;
                        default:
                            optionButton= <></>;
                        break;
                    }
                    return optionButton;
                });
                cellOptions=<td className="text-right">{cellOps}</td>;
            }
            return cellOptions;
        }
        if(data.Header){
            const headers=data.Header.map( (hcell,index) => 
                <th key={index} className={hcell.class}>{hcell.field}</th>
            );
            Header=<thead><tr>{headers}<th></th></tr></thead>;
        }
        if(data.Data){
            const bodydata  = data.Data.map( (row,index) => {
                const cells=[];
                Object.keys(row.item).forEach( (cell,index) => {
                    if(row.item[cell].invisible===false){
                        cells.push(<td key={cell} className="text-center">{row.item[cell].value}</td>);
                    }                    
                } );
                return (<tr key={index}>
                    {cells}
                    {buildOptions(row.item["id"],row.item)}
                </tr>)
            } );
            Body=(
                <tbody>
                    {bodydata}
                </tbody>
            );
        }
        return (
            <Card>
                {TableJsx}
                <CardBody>
                    <Table responsive>
                        {Header}
                        {Body}
                    </Table>
                </CardBody>
            </Card>
        );
    }
    return (<>
        {assembleTable(jsonData)}
    </>);
  }

export default CustomTable;