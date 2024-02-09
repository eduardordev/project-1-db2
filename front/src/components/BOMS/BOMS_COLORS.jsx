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

export const ColorsTable = ({ colors, addColor }) => {
  tableData = colors.map((color, i) => {
    return {
      id: i,
      client: color.client,
      name: color.name,
      actions: (<Button
        disabled={color.blocked}
        size={"sm"}
        color={"info"}
        onClick={() => addColor(color)}
      >Add</Button>)
    }
  });

  

  return <ReactTable responsive
    data={tableData}
    filterable
    columns={[
      {
        Header: "CLIENT",
        accessor: "client",
        sortable: false,
        filterable: false,
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "ACTION",
        accessor: "actions",
        sortable: false,
        filterable: false,
        width: 100
      }
    ]}
    defaultPageSize={5}
  />
}

export const CostSheetData = ({
  selectedCostSheet,
  selectedStyle,
  //handleFileChangeTechPack,
  header,
  onChange,
  helper,
  nameFile
}) => {
  const Role = localStorage.getItem('role') || '';
  return <>
    {/*console.log('header', header)*/}
    <Card body outline color="primary">
      <CardBody>
        <CardTitle>CostSheet Info</CardTitle>
        <FormGroup row>
          <Label for="exampleEmail" className="text-primary" sm={4}>Client</Label>
          <Col sm={8}>{selectedCostSheet.client_name}</Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" className="text-primary" sm={4}>Style</Label>
          <Col sm={8}>{selectedCostSheet.style}</Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" className="text-primary" sm={4}>Season</Label>
          <Col sm={8}>{selectedCostSheet.season}</Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" className="text-primary" sm={4}>BOM Style</Label>
          <Col sm={8}>{selectedStyle.name ? selectedStyle.name : selectedStyle}</Col>
          {/*<Col sm={8}>
            <Input type="text"
              onChange={e => {
                onChange('bom_style', e.target.value)
              }}
              value={header.bom_style}
              disabled={header.return_flag}
            />
            </Col>*/}
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" className="text-primary" sm={4}>SMS flag</Label>
          <Col sm={8}>
            <Input type="checkbox"
              style={{ marginLeft: 0 }}
              disabled={Role !== 'Generacion' && Role !== 'Patronajes' ? false : true}
              checked={header.sms_flag}
              onChange={() => {
                onChange('sms_flag', !header.sms_flag)
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" className="text-primary" sm={4}>SMS multiplier</Label>
          <Col sm={8}>
            <Input type="number"
              onChange={e => {
                onChange('sms_multiplier', parseFloat(e.target.value))
              }}
              value={header.sms_multiplier}
              disabled={!header.sms_flag}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={4} className="text-primary">Description</Label>
          <Col sm={8}>

            <Input type="textarea"
              value={header.description}
              disabled={Role !== 'Generacion' && Role !== 'Patronajes' ? false : true}
              onChange={(e) => {
                onChange('description', e.target.value)
              }}
            />
          </Col>
        </FormGroup>
      </CardBody>
      {Role !== 'Generacion' && Role !== 'Patronajes' ?

      <>
      <Label sm={4} className="text-primary">Upload Techpack:</Label>
      <Col sm={8}>
        <FormGroup className="text-center">
          <Button
            color="info"
            className="btn-simple"
            size="sm"
          //disabled={header.id ? false:true}
          >
            <input
              type="file"
              //onChange={handleFileChangeTechPack}
              onChange={event => {
                event.preventDefault();
                helper({
                  techpack: event.target.files[0]!==undefined?event.target.files[0]:null,
                      formdata: {
                        key: 'pathToTechpack',
                        value: event.target.files[0]!==undefined?"techpack/"+event.target.files[0].name:null
                      }
                })
              }}
              name="techpackFile"
              id={`input_techpack_`}
            />
            <i className="tim-icons icon-cloud-upload-94" />
          &nbsp;techpack
        </Button>{` `}
        {/*console.log(nameFile)*/}
          <label>{nameFile ? `${nameFile.name ? nameFile.name: nameFile}` : ""}</label>
        </FormGroup>
      </Col>
      
      </>
      
      :
      <></>
    
    }
    </Card>
  </>
}

