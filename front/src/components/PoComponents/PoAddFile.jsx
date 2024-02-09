import React from "react";
import Select from "react-select";
// reactstrap components
import {
  Col,
  FormGroup,
  Button,
} from "reactstrap";

const customStyles = {
  input: (provided) => ({
    ...provided,
    color: '#e14eca'
  })
}

export const PoAddFile = ({
  //FileFunction,
  id,
  addClient,
  clientsOptions,
  uploadChangeFilePO,
  removePO
}) => {
  return <><Col sm={6}>
  <Select placeholder="Select Client"
    styles={customStyles}
    options={clientsOptions}
    onChange={e => {addClient(e) }}
  />
</Col>
<Col sm={4}>
  <FormGroup id='formGroup_pathToTechpack' className="text-center">
    <Button className="btn-simple" color="info" size="sm" >
      <input
        type="file"
        onChange={uploadChangeFilePO}
        name="pathToCP_POS"
        id="input_pathToTechpack"
      />
      <i className="tim-icons icon-cloud-upload-94" />
      &nbsp;Upload File
    </Button>
  </FormGroup>
</Col>
<Col sm={2}>
  <Button className="btn-simple" color="info" size="sm"
    onClick={() => removePO(id)}>
    x
  </Button>
</Col>
  </>
}