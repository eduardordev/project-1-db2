import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardImg,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";

const customStyles = {
  input: (provided) => ({
      ...provided,
      color: '#e14eca'
  })
}

class CostingHeaderCard extends React.Component{
  Access = JSON.parse(localStorage.getItem('Access') || '{}');
  _defaultImageData="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22320%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_161650a55ea%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_161650a55ea%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.203125%22%20y%3D%2297.35%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  proto = [
    {value: 'CE', label: 'COSTING_EXERCISE'},
    {value: 'P1', label: 'PROTO1'},
    {value: 'P2', label: 'PROTO2'},
    {value: 'P3', label: 'PROTO3'},
    {value: 'S', label: 'SMS'},
    {value: 'B', label: 'BULK'},
  ]

  constructor(props){
    super(props);
    this.state = {
      imageData: this._defaultImageData,
      file: null,
      costingHeader: this.props.costingHeader
    }
  }

  componentDidMount(){
    this.setState({
      imageData: this.props.sketchData
    })
  }

  componentDidUpdate(prevProps){
    if (prevProps.costingHeader !== this.props.costingHeader ) {
      let file = "";
      if (this.props.sketchData !== "") {
        file = this.props.sketchData;
      } else {
        file = prevProps.sketchData;
      }
      this.setState({
        file: file,
        imageData: file,
        costingHeader: this.props.costingHeader,
      });
    }
  }

  handleDownloadTechpack = (event) => {
    event.preventDefault();
    if('documents' in this.props){
      this.props.helper("techPack",this.props.documents.pathToTechpack);
    }
  }

  handleDownloadPattern = (event) => {
    event.preventDefault();
    if('documents' in this.props){
      this.props.helper("pattern",this.props.documents.pathToPattern);
    }
  }

  handleDownloadMarker = (event) => {
    event.preventDefault();
    if('documents' in this.props) {
      this.props.helper("marker",this.props.documents.pathToMarker);
    }
  }

  handleDownloadSAM = (event) => {
    event.preventDefault();
    if('documents' in this.props){
      this.props.helper("SAM",this.props.documents.pathToSAM);
    }
  }

  onCallBackTemplate = (value) => {
    //console.log(value)
    this.props.helper("template",value)
  }

  handleFileChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imageData: reader.result
      });
      this.props.helper('onSketchChange',{"file":file,"data":reader.result})
    };
    reader.readAsDataURL(file);
  }

  handleTechPackChange = (event) => {
    event.preventDefault();
    this.props.helper('teckpack',event.target.files[0])
  }

  quickCostCard = () => {
    const options = this.props.templateInfo.map(template=>{
      return {
        "value": template.id, 
        "label": template.name, 
        "detail": template.templateId
      }
    });
    return (<Card className="card-primary">
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th>Select Template</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Select
                  className="react-select primary"
                  classNamePrefix="react-select"
                  name="singleSelect"
                  value={this.props.selectedTemplate}
                  onChange={value => this.onCallBackTemplate(value)}
                  options={options}
                  placeholder="Select Template"
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>          
    </Card>);
  }

  handleStyleChange = (event) => {
    const value = event.target.value;
    this.props.helper('style',value);
  }

  render(){
    //const permision = this.props.quickCost ? this.Access.quick_costing : this.Access.quotation;
    const permision = this.props.header === "D" ?  true : (this.props.quickCosting ? this.Access.quick_costing : this.Access.quotation);

    return (<Row>
      <Col md={5} xs={12}>
        <Card className="card-primary">
          <CardHeader>
            <CardTitle tag="h4">
              CostSheet Detail.
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={4} className="text-info">CostSheet:</Col>
              <Col xs={8}>
                <p>
                  <b>{this.state.costingHeader.id}</b>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={4} className="text-info">Client:</Col>
              <Col xs={8}>
                <p>
                  {this.state.costingHeader.client.name}{' '}
                  (<b>{this.state.costingHeader.client.abbreviation}</b>)
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={4} className="text-info">Season:</Col>
              <Col xs={8}>
                {this.props.seasons && <Select
                    styles = {customStyles}
                    className = "react-select primary"
                    classNamePrefix = "react-select"
                    name = "seasonSelect"
                    value = {this.state.costingHeader ? {
                      value: this.state.costingHeader.season.id,
                      label: this.state.costingHeader.season.name
                    } : null}
                    onChange = {value =>
                      this.props.helper('season',value)
                    }
                    options = {this.props.seasons.map(season => {
                        return {value: season.id, label: season.name}
                    })}
                    placeholder="Season"
                />}
              </Col>
            </Row>
            <FormGroup row>
              <Label xs={4} className="text-info">Style:</Label>
              <Col xs={8}>
                <Input type={'text'} 
                  value={this.props.costingHeader.style} 
                  onChange={this.handleStyleChange} 
                  disabled={permision.edit?false:true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label xs={4} className="text-info">Proto Status:</Label>
              <Col xs={8}>
                {permision.edit?<Select
                  options={this.proto}
                  defaultValue={{value:'CE',label:'COSTING_EXERCISE'}}
                  value={this.proto.find(o=>o.value===this.props.costingHeader.proto_status)}
                  onChange={value=>{
                    this.props.helper('proto_status',value.value)
                  }}
                />:<Input disabled value={this.proto.find(o=>o.value===this.props.costingHeader.proto_status).label} />}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label xs={4} className="text-info">New TechPack</Label>
              <Col xs={8}>
                {permision.edit && 
                <Button className="btn-simple" color="info" size="sm">
                  <input
                    type="file" 
                    onChange={this.handleTechPackChange}
                  />
                  <i className="tim-icons icon-cloud-upload-94" />
                  &nbsp;Re-upload Techpack
                </Button>}
              </Col>
            </FormGroup>
            <br></br>
            {!this.props.quickCost && <>
              <Row>
                <Col xs={3} className="text-info text-center">
                  TechPack: <br/>
                  <Button 
                    color="info"
                    className="btn-simple"
                    size="sm"
                    onClick={this.handleDownloadTechpack}
                  >
                    <i className="tim-icons icon-cloud-download-93" />
                  </Button>
                </Col>
                <Col xs={3} className="text-info text-center">
                  Pattern: <br/>
                  <Button 
                    color="info"
                    className="btn-simple"
                    size="sm"
                    onClick={this.handleDownloadPattern}
                  >
                    <i className="tim-icons icon-cloud-download-93" />
                  </Button>
                </Col>
                <Col xs={3} className="text-info text-center">
                  Marker:  <br/>
                  <Button 
                    color="info"
                    className="btn-simple"
                    size="sm"
                    onClick={this.handleDownloadMarker}
                  >
                    <i className="tim-icons icon-cloud-download-93" />
                  </Button>
                </Col>
                <Col xs={3} className="text-info text-center">
                  SAM: <br/>
                  <Button 
                    color="info"
                    className="btn-simple"
                    size="sm"
                    onClick={this.handleDownloadSAM}
                  >
                    <i className="tim-icons icon-cloud-download-93" />
                  </Button>
                </Col>
              </Row>
            </>}
            <br></br>
            <FormGroup>
              <Label>Colors</Label>
              <Input type={'textarea'} 
                value={this.props.detail.colors?this.props.detail.colors:''} 
                onChange={e=>this.props.helper('colors',e.target.value)}
                disabled={permision.edit?false:true}
              />
            </FormGroup>
            {this.props.quickCost && <Row>
              <Col xs={12}>
                {this.quickCostCard()}
              </Col>
            </Row>}
          </CardBody>
        </Card>
      </Col>
      {!this.props.quickCost && <Col md={7} xs={12}>    
        <Card className="card-primary">
          <CardHeader>
            <CardTitle tag="h4">
              Documents
            </CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-info">Sketch:</p>
            <Card style={{maxWidth: '20rem'}}>
              <CardImg top src={this.props.sketchData} 
                style={{maxHeight:"20rem",width:"auto"}} 
                alt="..." id="sketch"
              />
              <CardBody>
                <FormGroup>
                  {permision.edit && 
                  <Button className="btn-simple" color="info" size="sm">
                    <input
                      type="file" 
                      onChange={this.handleFileChange} 
                      name="sketch"
                    />
                    <i className="tim-icons icon-cloud-upload-94" />
                    &nbsp;Upload Sketch
                  </Button>}
                </FormGroup>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </Col>}
    </Row>)
  }
}

export default CostingHeaderCard;