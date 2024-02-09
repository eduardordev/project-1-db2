import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Form
  } from "reactstrap";
import axios from 'axios';
import CustomTable from './CustomTable';
import LeftIconInput from './LeftIconInput';

function SearchItem({ ...props }) {
    const {
        title,
        displayName,
        placeHolder,
        term,
        model,
        column
    } = props;

    function SearchItem(term,model,column){
        const urlTerm=term!==''?term+'/':'';
        let data=[];
        let rows=[];
        axios.get('http://192.9.200.252:8000/api/v1/'+model+'/'+urlTerm).then(function (response) {
            const cells=[];
            if(urlTerm===''){
                response.data.map( (row) =>{
                    Object.keys(row).forEach( (cell,index) => {
                        let invisible=(cell===column)?false:true;
                        cells[cell]={
                            "value":row[cell],"invisible":invisible,
                        };            
                    } );
                    rows.push({"item":cells});
                    return rows;
                });
            }else{
                Object.keys(response.data).forEach( (cell,index) => {
                    let invisible=(cell===column)?false:true;
                    cells[cell]={
                        "value":response.data[cell],"invisible":invisible,
                    };            
                } );
                rows.push({"item":cells});
            }
            data={
                "Header":[
                    {"field":"DM","class":""}
                ],
                "Options": [
                    {"option": "can-edit"},
                    {"option": "can-delete"}
                ],
                "Data": rows
            }
            return(
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">{title}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <LeftIconInput 
                                name="term" 
                                displayName={displayName} 
                                placeHolder={placeHolder} 
                                icon="icon-zoom-split" 
                            />
                        </Form>
                        <CustomTable jsonData={data} />
                    </CardBody>
                </Card>
            );
        });
    }
    return (<>
        {SearchItem(term,model,column)}
        <div>pp</div>
    </>);
}

export default SearchItem;