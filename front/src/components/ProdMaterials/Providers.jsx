import React from 'react';
import {
  Button,
  Modal, 
  ModalBody, 
  ModalFooter,  
  FormGroup,
  Label,
  Form,
  Input,
} from "reactstrap";
import ReactTable from 'react-table';
import Select from "react-select";

/*const customStyles = {
  input: (provided) => ({
    ...provided,
    color: '#e14eca'
  })
};*/

export const ListTable = ({
    data,
    headers,
    toggleEditModal,
    onDelete,
}) => {
  const dataActions = data.map(dataLine=>{
    let rowData = dataLine.allData ? dataLine.allData: dataLine
    if(rowData.client){
      rowData ={
        ...rowData,
        client: {
          value: rowData.client.id,
          label: rowData.client.name,
          abbreviation: rowData.client.abbreviation,
        }
      }
    }
    if(rowData.company){
      rowData = {
        ...rowData,
        company: {
          value: rowData.company.id,
          label: rowData.company.name,
          abbreviation: rowData.company.abbreviation,
        }
      }
    }
    /*if(rowData.sizes){
      rowData = {
        ...rowData,
        sizes: {

        }
      }
      console.log(rowData)
    }*/
    return {
      ...dataLine,
      actions: (<>
        <Button
          color="info"
          size="sm"
          className="btn-icon btn-link"
          onClick={(e) => {
            e.preventDefault();
            toggleEditModal(rowData);
          }}
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          color="danger"
          size="sm"
          className="btn-icon btn-link"
          onClick={(e) => {
            e.preventDefault();
            onDelete(dataLine.id);
          }}
        >
          <i className="fa fa-times" />
        </Button>
      </>)
    }
  })
  return (
    <ReactTable 
      responsive
      data = {dataActions}
      filterable
      columns = {headers}
      defaultPageSize = {5}
      showPaginationTop
      showPaginationBottom = {false}
    />
  );
}

export const MeasuresModal = ({
  values,
  onChange,
}) => (<Form onSubmit={e=>e.preventDefault()}>
  <FormGroup>
    <Label for="inputName">Name:</Label>
    <Input 
      type="text" 
      id="inputName"
      value={values.name}
      onChange={e=>onChange('name',e.target.value)}
    />
  </FormGroup>
</Form>)

export const ProvidersModal = ({
  values,
  companies,
  onChange,
}) => (<Form onSubmit={e=>e.preventDefault()}>
  <FormGroup>
    <Label for="Name">Name:</Label>
    <Input 
      type="text" 
      id="Name"
      value={values.name}
      onChange={e=>onChange('name',e.target.value)}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Abbreviation">Abbreviation:</Label>
    <Input 
      type="text" 
      id="Abbreviation"
      value={values.abbreviation}
      onChange={e=>onChange('abbreviation',e.target.value)}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Address">Address:</Label>
    <Input 
      type="text" 
      id="Address"
      value={values.address}
      onChange={e=>onChange('address',e.target.value)}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Phone">Phone:</Label>
    <Input 
      type="number" 
      id="Phone"
      value={values.phone}
      onChange={e=>onChange('phone',e.target.value)}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Contact">Contact:</Label>
    <Input 
      type="text" 
      id="Contact"
      value={values.contact}
      onChange={e=>onChange('contact',e.target.value)}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Time">Time:</Label>
    <Input 
      type="text" 
      id="Time"
      value={values.time}
      onChange={e=>onChange('time',e.target.value)}
    />
  </FormGroup>
  <FormGroup>
    <Label for="companies">Companies:</Label>{console.log(values.company)}
    <Select 
      options={companies} 
      value={values.company ? values.company : {}}
      onChange={option=>onChange('company',option)}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Currency">Currency:</Label>
    <Input 
      type="text" 
      id="Currency"
      value={values.currency}
      onChange={e=>onChange('currency',e.target.value)}
    />
  </FormGroup>
</Form>)

export const SizesModal = ({
  values,
  onChange,
}) => (<Form onSubmit={e=>e.preventDefault()}>
  <FormGroup>
    <Label for="inputName">Name:</Label>
    <Input 
      type="text" 
      id="inputName"
      value={values.name}
      onChange={e=>onChange('name',e.target.value)}
    />
     <Label for="inputSi">Sistemas Integrados code:</Label>
     {/*console.log(values)*/}
    <Input 
      type="text" 
      id="inputCode"
      maxLength="2"
      value={values.si_code}
      onChange={e=>onChange('si_code',e.target.value)}
    />
  </FormGroup>
</Form>)

export const ScalesModal = ({
  values,
  sizes,
  onChange,
}) => (<Form onSubmit={e=>e.preventDefault()}>
  <FormGroup>
    <Label for="inputName">Name:</Label>
    <Input 
      type="text" 
      id="inputName"
      value={values.name}
      onChange={e=>onChange('name',e.target.value)}
    />
    <Label for="exampleSelectMulti1">
     <b>Hold control and click to check/uncheck options</b><br></br>
     Sizes assignated to this scale:
    </Label>
    <Input 
      type="select" 
      name="selectMulti" 
      id="exampleSelectMulti1" 
      multiple
      value={values.sizes}
      //ref={this.createService}
      onChange={e=>onChange('sizes',e)}
      style={{height: '200px'}}
    > 
      {sizes.map((size, idx) => 
          <option key={idx} value={size.id}>
            {size.id} / {size.name}
          </option>
      )}
   </Input>
  </FormGroup>
</Form>)

export const BaseModal = ({
  title,
  isOpen,
  toggle,
  onSubmit,
  form,
  values,
  onChange,
  clients,
  companies,
  sizes,
}) => {
  return (<>
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggle}>
          <i className="tim-icons icon-simple-remove"></i>
        </button>
        <h5 className="modal-title">{title}</h5>
      </div>
      <ModalBody>
        {form==='measures' && <MeasuresModal values={values} onChange={onChange} />}
        {form==='providers' && <ProvidersModal values={values} onChange={onChange} companies={companies} />}
        {form==='sizes' && <SizesModal values={values} onChange={onChange} />}
        {form==='types' && <MeasuresModal values={values} onChange={onChange} />}
        {form==='scale' && <ScalesModal values={values} onChange={onChange} sizes={sizes} />}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
        <Button color="primary" onClick={event=>{
          event.preventDefault();
          onSubmit(values);
        }}>
          SAVE
        </Button>
      </ModalFooter>
    </Modal>
  </>)
}

export const SizesTable = ({
  data,
  headers,
  toggleEditModal,
  onDelete,
}) => {
  return <ListTable 
    data={data.map(size=>{
      return {
        id: size.id, 
        name: size.name, 
        client: size.client? size.client.name: '', 
        allData: size
      }
    })}
    headers={headers}
    toggleEditModal={toggleEditModal}
    onDelete={onDelete}
  />
}

export const ScaleTable = ({
  data,
  headers,
  toggleEditModal,
  onDelete,
}) => {
  //console.log(data)
  return <ListTable 
    data={data.map(scale=>{
      return {
        id: scale.id, 
        name: scale.name, 
        client: scale.client? scale.client.name: '', 
        allData: scale
      }
    })}
    headers={headers}
    toggleEditModal={toggleEditModal}
    onDelete={onDelete}
  />
}

export const ProvidersTable = ({
  data,
  headers,
  toggleEditModal,
  onDelete,
}) => {
  return <ListTable 
    data={data.map(provider=>{
      return {
        ...provider,
        company: provider.company.name,
        allData: provider,
      }
    })}
    headers={headers}
    toggleEditModal={toggleEditModal}
    onDelete={onDelete}
  />
}