/*

*/
import React from "react";

// reactstrap components
import {
  Button,
  Input,
  Table,
  Row,Col
} from "reactstrap";
import Select from "react-select";

const customStyles = {
  input: (provided,) => ({
      ...provided,
      color: '#e14eca'
  })
}

const materialLine = {
  "line_id": 0,
  "id": null,
  "material": "",
  "unitPrice": "",
  "transport": 0.00,
}

class MaterialsCard extends React.Component {
  Access = JSON.parse(localStorage.getItem('Access') || '{}');
  constructor(props){
    super(props);
    this.state = {
      material:[],
      toEditLine: null,
      blocked: true,
      prices: []
    }
  }

  componentDidMount(){
    this.setState({
      blocked: !this.props.quickCosting
    })
  }

  FixElementValue(value){
    if(value === null || value === undefined || value===""){
      return '0';
    }
    return value;
  }

  /** fill materialsCatalog and materialsOptions */
  assembleMaterials = () => {
    let options = [];
    this.props.materialsCatalog.map( material => {
      material.realUnitPrice = parseFloat(material.unitPrice) + parseFloat(material.transport)
      options.push({
        "value": material.id, 
        "label": material.client + '/' + 
          material.name + '/' + material.season,
        "data": material
      })
      return material;
    });
    this.setState({
      material: [{
        line_id: 0,
        material:"",
        unitPrice: 0,
        select: null
      }],
      materialsCatalog: this.props.materialsCatalog,
      materialsOptions: options
    });
    this.assembleDefaultMaterials(options);
  }

  assembleDefaultMaterials = (options) => {
    if(this.props.defaultData!==undefined && this.props.defaultData.length>0){
      let tempMaterial=this.props.defaultData.map( (material,index) => {
        let obj = options.find(o => o.value === material.id);
        let realUnitPrice =material.unitPrice
        return {
          line_id: material.line_id,
          material: material.id,
          unitPrice: realUnitPrice,
          select: obj
        }
      });
      this.setState({material: tempMaterial});
      this.props.callBackData({
        'materials': tempMaterial,
        'finished': true
      },true)
      return true;
    }
  }

  addMaterial = (e) => {
    e.preventDefault();
    this.props.helper('newMaterial',materialLine);
  }

  /** send data to parent */
  sendData = () => {
    let data = {
      'materials': this.state.material
    }
    this.props.callBackData(data)
  }

  buildNewLine = (material,line,key) => {
    let newLine={
      ...line,
      id: material.data.id,
      material: material.data.show_name,
      unitPrice: parseFloat(material.data.unitPrice),
      transport: parseFloat(this.FixElementValue(material.data.transport))
    }
    return {materialIndex: key, line: newLine}
  }

  modLine = (index,key,value,line) => {
    let newLine={
      ...line,
      [key]: value
    }
    return {materialIndex: index, line: newLine}
  }

  calcPrice = (idx,val,key,value) => {
    let unitPrice=0.00;
    let transport=0.00;
    if(key==='unitPrice'){
      unitPrice=parseFloat(value);
      transport=parseFloat(document.getElementById('transport-'+idx).value);
    } else if(key==='transport'){
      transport=parseFloat(value);
      unitPrice=parseFloat(document.getElementById('unitPrice-'+idx).value);
    }
    this.props.helper(
      'selectMaterial',
      this.modLine(idx,'unitPrice',unitPrice+transport,val)
    )
  }

  render() {
    //const permision = this.props.quickCosting ? this.Access.quick_costing : this.Access.quotation;
    const permision = this.props.header === "D" ?  true : (this.props.quickCosting ? this.Access.quick_costing : this.Access.quotation);
    let options = this.props.materialsCatalog.map(material => {
      return {value: material.id, label: material.show_name, data: material};
    });
    let materialsData = this.props.detail.materials.length>0?this.props.detail.materials:[materialLine];
    return (<>
      <div style={{maxWidth:"30%"}}>
        <Row>
          <Col sm={5}>
            <label>Waste %</label>
          </Col>
          <Col sm={7}>
            <Input 
              name="fabricWaste" 
              type="number" 
              min="0" max="100" 
              step="1"
              value={this.props.detail.pmaterials?this.props.detail.pmaterials:0.00}
              onChange={event=>this.props.helper("pmaterials",event.target.value)}
              disabled={permision.edit?false:true}
            />
          </Col>
        </Row>
      </div>
      <Table className="tablesorter">
        <thead className="text-primary">
          <tr>
            <th>TRIM</th>
            <th>Price</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {materialsData.map( (val, idx) => {
            let selectedMaterial = options.find(o=>o.value===val.id);
            let unitPrice=parseFloat(this.FixElementValue(val.unitPrice));
            let transport=parseFloat(this.FixElementValue(val.transport));
            return (
              <tr key={idx} id={idx}>
                <td style={{width:"40%"}}>
                  <label>&nbsp;</label>
                  <Select
                    menuPortalTarget={document.body}
                    className="react-select"
                    classNamePrefix="react-select"
                    styles={customStyles}
                    placeholder="Choose Material"
                    options={options}
                    onChange={value => this.props.helper(
                      'selectMaterial',
                      this.buildNewLine(value,val,idx)
                    )}
                    value={selectedMaterial}
                    isDisabled={permision.edit?false:true}
                  />
                </td>
                <td>
                  <Row>
                    <Col xs={4}>
                      <label>Unit Price</label>
                      <Input 
                        type={'number'}
                        id={'unitPrice-'+idx}
                        min={0.00}
                        step={0.01}
                        value={unitPrice}
                        onChange={event=>{
                          this.props.helper(
                            'selectMaterial',
                            this.modLine(idx,'unitPrice',event.target.value,val)
                          )
                        }}
                        disabled={permision.edit?false:true}
                      />
                    </Col>
                    <Col xs={4}>
                      <label>Transport</label>
                      <Input 
                        type={'number'}
                        id={'transport-'+idx}
                        min={0.00}
                        step={0.01}
                        value={transport}
                        onChange={event=>{
                          this.props.helper(
                            'selectMaterial',
                            this.modLine(idx,'transport',event.target.value,val)
                          )
                        }}
                        disabled={permision.edit?false:true}
                      />
                    </Col>
                    <Col xs={4}>
                      <label>Price</label>
                      <Input disabled
                        type="number"
                        min="0"
                        max="999"
                        step="any"
                        value={(unitPrice+transport).toFixed(4)}
                      />
                    </Col>
                  </Row>
                </td>
                <td>
                  {permision.edit && <Button color="warning" className="btn-simple" size="sm"
                    onClick={() => this.props.helper('removeLine',idx)}
                  >
                    <i className="tim-icons icon-simple-remove"  />
                  </Button>}
                </td>
              </tr>
            )
          })}
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>              
              {permision.edit && <Button
                color="info"
                className="btn-simple"
                size="sm"
                onClick={e=>{
                  e.preventDefault();
                  this.props.helper('newMaterial',materialLine)
                }}
              >
                <i className="tim-icons icon-simple-add" />
              </Button>}
            </td>
          </tr>
        </tbody>
      </Table>
      <Table size="sm" className="tablesorter">
        <tbody>
          <tr>
            <td className="text-center" style={{width:"60%"}}>
              Materials Total (+{this.props.detail.pmaterials}%)
            </td>
            <td className="text-center" style={{width:"30%"}}>
              ${this.props.calcs.pricesMaterials.toFixed(2)}
            </td>
            <td className="text-center" style={{width:"10%"}}>
              &nbsp;
            </td>
          </tr>
        </tbody>
      </Table>
    </>)
  }

}

export default MaterialsCard;
