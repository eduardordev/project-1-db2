import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Input,
  Row,
  Col,
  Button,
  FormGroup
} from "reactstrap";
import Select from "react-select";

export default function FabricsForm({...props}){
  const Access = JSON.parse(localStorage.getItem('Access') || '{}');

  const customStyles = {
    input: (provided) => ({
      ...provided,
      color: '#e14eca',
    })
  }

  const pt = [
    {value: true, label: "Plies"},
    {value: false, label: "Tubular"},
  ];

  let {dataForm} = props;
  let parts = dataForm.composition ? dataForm.composition.split("/") : [0,0,0,0,0,0];
  let sumParts = 0.00;
  parts.map(part => {
    sumParts+=parseFloat(part?part:0);
    return part;
  });

  function getComposition(position){
    return parts[position] ? parts[position]: 0;
  }

  function submitForm(event){
    event.preventDefault();
    if(sumParts===100.00){
      if(
        typeof dataForm.fabric_type==='object' &&
        typeof dataForm.season==='object' &&
        typeof dataForm.client==='object' &&
        typeof dataForm.pt==='object'
      ){
        props.helper({submit: true})
      }else{
        props.helper({error: 'Please Choose fabric name, season, client and plies/tubular'});
      }
    }else{
      props.helper({error: 'Fabric Composition needs to be 100%'});
    }
  }

  function VisualizeElement(action){
    if(action==="insert"){
      return Access.fabrics.create;
    }
    if(action==="update"){
      return Access.fabrics.edit;
    }
  }

  function changeToInsert(){
    if(props.action === "update"){
      return <Button type={"button"} onClick={
        event => {
          event.preventDefault();
          props.helper({resetForm: true})
        }
      }>
        New Fabric
      </Button>
    }else{
      return <></>
    }
  }

  function updateComposition(position,event){
    let currentParts = parts;
    currentParts[position]=event.target.value;
    let newComposition = currentParts.join("/");
    props.helper({formdata: {key: 'composition', value: newComposition}})
  }

  return (<Card>
    <CardHeader>
      <CardTitle tag="h4"><b>New Fabrics</b></CardTitle>
    </CardHeader>
    <CardBody>
      <Form onSubmit={event => submitForm(event)}>
        <Row>
          <Col md="6">
            <label htmlFor="dm">DM</label>
            <Input id="dm" placeholder="DM" type="text" 
              value={dataForm.dm ? dataForm.dm : ''} required
              onChange={event => props.helper({
                formdata: {key: 'dm', value: event.target.value}
              })} 
              disabled={Access.fabrics.edit?false:true}
            />
          </Col>
          <Col md="6">
            {/*console.log(dataForm.fabric_type)*/}
            <label htmlFor="fabric_type">Fabric Name</label>
            <Select id="fabric_type" required="required"
              styles={customStyles}
              value={dataForm.fabric_type?dataForm.fabric_type:null}
              onChange={value => {
                props.helper({formdata: {key: 'fabric_type', value: value}})
              }}
              options={props.fabricNames}
              placeholder="Choose fabric name"
              isDisabled={Access.fabrics.edit?false:true}
            />
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <label htmlFor="weight">Weight</label>
            <Input id="weight" placeholder="weight" type="number" 
              value={dataForm.weight ? dataForm.weight : ''} required
              onChange={event => props.helper(
                {formdata: {key: 'weight', value: event.target.value}}
              )}
              disabled={Access.fabrics.edit?false:true}
            />
          </Col>
          <Col md="4">
            <label htmlFor="width">Width</label>
            <Input id="width" placeholder="width" type="number" 
              value={dataForm.width ? dataForm.width : ''} required
              onChange={event => props.helper(
                {formdata: {key: 'width', value: event.target.value}}
              )} 
              disabled={Access.fabrics.edit?false:true}
            />
          </Col>
          <Col md="4">
            <label htmlFor="widthMark">Width Mark</label>
            <Input id="widthMark" placeholder="widthMark" type="number" 
              value={dataForm.widthMark ? dataForm.widthMark : ''} required
              onChange={event => props.helper(
                {formdata: {key: 'widthMark', value: event.target.value}}
              )} 
              disabled={Access.fabrics.edit?false:true}
            />            
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label htmlFor="priceWhite">Price White</label>
            <Input id="priceWhite" placeholder="priceWhite" type="number" 
              value={dataForm.priceWhite ? dataForm.priceWhite : ''} required
              onChange={event => props.helper({formdata: {key: 'priceWhite', value: event.target.value}})} 
              disabled={Access.fabrics.edit?false:true}
            />
          </Col>
          <Col md="6">
            <label htmlFor="priceMedium">Price Medium</label>
            <Input id="priceMedium" placeholder="priceMedium" type="number" 
              value={dataForm.priceMedium ? dataForm.priceMedium : ''} required
              onChange={event => props.helper({formdata: {key: 'priceMedium', value: event.target.value}})} 
              disabled={Access.fabrics.edit?false:true}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label htmlFor="priceDark">Price Dark</label>
            <Input id="priceDark" placeholder="priceDark" type="number" 
              value={dataForm.priceDark ? dataForm.priceDark : ''} required
              onChange={event => props.helper({formdata: {key: 'priceDark', value: event.target.value}})} 
              disabled={Access.fabrics.edit?false:true}
            />
          </Col>
          <Col md="6">
            <label htmlFor="priceSpecial">Price Special</label>
            <Input id="priceSpecial" placeholder="priceSpecial" type="number" 
              value={dataForm.priceSpecial ? dataForm.priceSpecial : ''} required
              onChange={event => props.helper({formdata: {key: 'priceSpecial', value: event.target.value}})} 
              disabled={Access.fabrics.edit?false:true}
            />            
          </Col>
        </Row>        
        <Row>
          <Col md="6">
            <label htmlFor="season">Season</label>
            <div style={{marginBottom: '20px'}}>
              <Select id="season" required
                styles={customStyles}
                value={dataForm.season?dataForm.season:null}
                onChange={option => {
                  props.helper({formdata: {key: 'season', value: option}})
                }}
                options={props.seasons}
                placeholder="Choose Season"
                isDisabled={Access.fabrics.edit?false:true}
              />
            </div>
          </Col>
          <Col md="6">
            <label htmlFor="client">Client</label>
            <Select id="client" required
              styles={customStyles}
              value={dataForm.client?dataForm.client:null}
              onChange={value => {
                props.helper({formdata: {key: 'client', value: value}})
              }}
              options={props.clients}
              placeholder="Choose Client"
              isDisabled={Access.fabrics.edit?false:true}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label htmlFor="pt">Plies/Tubular</label>
            <div style={{marginBottom: '20px'}}>
              <Select id="pt" required
                styles={customStyles}
                value={dataForm.pt?dataForm.pt:null}
                onChange={value => {
                  props.helper({formdata: {key: 'pt', value: value}})
                }}
                options={pt}
                placeholder="Choose type"
                isDisabled={Access.fabrics.edit?false:true}
              />
            </div>
          </Col>
          <Col md="6">
            <label htmlFor="pathToCertificate">Upload DM (pdf, Doc, Docx)</label>
            <FormGroup id='formGroup_pathToCertificate'>                               
              <Button className="btn-simple btn btn-info btn-sm">
                <input type="file"
                  onChange={event => {
                    event.preventDefault();
                    props.helper({
                      certificate: event.target.files[0]!==undefined?event.target.files[0]:null,
                      formdata: {
                        key: 'pathToCertificate',
                        value: event.target.files[0]!==undefined?"certificate/"+event.target.files[0].name:null
                      }
                    })
                  } }
                  name="pathToCertificate" 
                  id="input_pathToCertificate"
                  disabled={Access.fabrics.edit?false:true}
                />
                <i className="tim-icons icon-cloud-upload-94"></i>
              </Button>{` `}
              <label>{dataForm.pathToCertificate}</label>
            </FormGroup>
          </Col>
        </Row>
        <fieldset style={{padding: '10px', border: '1px solid black', marginBottom: '20px'}}>
          <legend style={{width: 'auto'}}>Composition:</legend>
          <Row>
            <Col md="4">
              <label htmlFor="POLYESTER">POLYESTER</label>
              <Input id="POLYESTER" placeholder="POLYESTER" type="number" 
                value={getComposition(0)} required
                onChange={event => updateComposition(0,event)}
                disabled={Access.fabrics.edit?false:true}
              />
            </Col>
            <Col md="4">
              <label htmlFor="RAYON">RAYON</label>
              <Input id="RAYON" placeholder="RAYON" type="number" 
                value={getComposition(1)} required
                onChange={event => updateComposition(1,event)}
                disabled={Access.fabrics.edit?false:true}
              />
            </Col>
            <Col md="4">
              <label htmlFor="COTTON">COTTON</label>
              <Input id="COTTON" placeholder="COTTON" type="number" 
                value={getComposition(2)} required
                onChange={event => updateComposition(2,event)}
                disabled={Access.fabrics.edit?false:true}
              />
            </Col>
            <Col md="4">
              <label htmlFor="SPANDEX">SPANDEX</label>
              <Input id="SPANDEX" placeholder="SPANDEX" type="number" 
                value={getComposition(3)} required
                onChange={event => updateComposition(3,event)}
                disabled={Access.fabrics.edit?false:true}
              />
            </Col>
            <Col md="4">
              <label htmlFor="RECYCLED POLYESTER">RECYCLED POLYESTER</label>
              <Input id="RECYCLED POLYESTER" placeholder="RECYCLED POLYESTER" type="number" 
                value={getComposition(4)} required
                onChange={event => updateComposition(4,event)}
                disabled={Access.fabrics.edit?false:true}
              />
            </Col>
            <Col md="4">
              <label htmlFor="NYLON">NYLON</label>
              <Input id="NYLON" placeholder="NYLON" type="number" 
                value={getComposition(5)} required
                onChange={event => updateComposition(5,event)}
                disabled={Access.fabrics.edit?false:true}
              />
            </Col>
          </Row>
        </fieldset>
        <fieldset style={{padding: '10px', border: '1px solid black', marginBottom: '20px'}}>
          <legend style={{width: 'auto'}}>Yarns:</legend>
          <Row>
            <Col md="6">
              <label htmlFor="yarn1">Yarn 1</label>
              <Input id="yarn1" placeholder="yarn1" type="text" 
                value={dataForm.yarn1 ? dataForm.yarn1 : ''} 
                onChange={event => props.helper(
                  {formdata: {key: 'yarn1', value: event.target.value}}
                )}
                disabled={Access.fabrics.edit?false:true}
              />            
            </Col>
            <Col md="6">
              <label htmlFor="yarn2">Yarn 2</label>
              <Input id="yarn2" placeholder="yarn2" type="text" 
                value={dataForm.yarn2 ? dataForm.yarn2 : ''} 
                onChange={event => props.helper(
                  {formdata: {key: 'yarn2', value: event.target.value}}
                )}
                disabled={Access.fabrics.edit?false:true}
              />            
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <label htmlFor="yarn3">Yarn 3</label>
              <Input id="yarn3" placeholder="yarn3" type="text" 
                value={dataForm.yarn3 ? dataForm.yarn3 : ''} 
                onChange={event => props.helper(
                  {formdata: {key: 'yarn3', value: event.target.value}}
                )}
                disabled={Access.fabrics.edit?false:true}
              />            
            </Col>
            <Col md="6">
              <label htmlFor="yarn4">Yarn 4</label>
              <Input id="yarn4" placeholder="yarn4" type="text" 
                value={dataForm.yarn4 ? dataForm.yarn4 : ''} 
                onChange={event => props.helper(
                  {formdata: {key: 'yarn4', value: event.target.value}}
                )}
                disabled={Access.fabrics.edit?false:true}
              />            
            </Col>
          </Row>
        </fieldset>
        <Row>
          <Col className="px-md-1" md="6">
            {Access.fabrics.edit && <FormGroup>
              {VisualizeElement(props.action) && <Button 
                className="btn-fill" 
                color="primary" 
                name="insert"
                type="submit"
              >
                {props.actionText}
              </Button>}
              {` `}
              {changeToInsert()}
            </FormGroup>}
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>);
}