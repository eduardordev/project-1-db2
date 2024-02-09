import React from "react";
import {
  Button,
  Input,
  Table,
  Row,
  Col,
  FormGroup,
  Label
} from "reactstrap";
import Select from "react-select";

/** react-select style */
const customStyles = {
  input: (provided) => ({
    ...provided,
    color: '#e14eca'
  })
};

const fabricLine = {
  "line_id": 0,
  "id": 0,
  "dm": "",
  "dm_width": 70.0,
  "dm_pt": true,
  "priceWhite": 0.0,
  "priceMedium": 0.0,
  "priceDark": 0.0,
  "priceSpecial": 0.0,
  "priceWhiteC": 0.0,
  "priceMediumC": 0.0,
  "priceDarkC": 0.0,
  "priceSpecialC": 0.0,
  "fabricType": "S",
  "markerEfficiency": 0,
  "markerLong": 0,
  "markerWidth": 0,
  "pieceByMarker": 0,
  "Blong": 0,
  "Bwidth": 0,
  "weightBWashOriginal": 0,
  "weightBWashCalculated": 0,
  "yieldydslbs": 0,
  "lbsunit": 0,
  "lbsunitwaste": 0,
  "sqinchunit": 0,
  "ydsunit": 0,
  "show_name": "",
  "ydsXunit": 0,
  "lbsXunit": 0,
  "dm_updated_at": '',
}

const placements = [
  {value: 'S', label:'SELF'},
  {value: 'C1', label:'CONTRAST1'},
  {value: 'C2', label:'CONTRAST2'},
  {value: 'C3', label:'CONTRAST3'},
  {value: 'C4', label:'CONTRAST4'},
  {value: 'C5', label:'CONTRAST5'},
  {value: 'R', label:'RIB'},
  {value: 'R1', label:'RIB1'},
  {value: 'R2', label:'RIB2'},
  {value: 'R3', label:'RIB3'},
  {value: 'R4', label:'RIB4'},
  {value: 'J', label:'JERSEY'},
  {value: 'J1', label:'JERSEY1'},
  {value: 'J2', label:'JERSEY2'},
  {value: 'J3', label:'JERSEY3'},
  {value: 'W', label:'WOVEN'},
  {value: 'W1', label:'WOVEN1'},
  {value: 'WA', label:'WATTA'},
  {value: 'WA1', label:'WATTA1'},
  {value: 'M', label:'MESH'},
  {value: 'M1', label:'MESH1'},
  {value: 'A', label:'APLIQUE'},
  {value: 'A1', label:'APLIQUE1'},
  {value: 'I1', label:'INTERLINING'},
  {value: 'I2', label:'INTERLINING1'},
  {value: 'I3', label:'INTERLINING2'},
  {value: "WAF",label: "WAFFLE"},
  {value: "TRI",label: "TRICOT"},
  {value: "TAF",label: "TAFFETA"},
  {value: "TA1",label: "TAFFETA1"}
]

function customDateFormat(date){
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat(
      'en-US', {
          year: 'numeric', 
          month: '2-digit',
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit'
      }
  ).format(dateObj);
}

/**
 * 
 * @param {Object[]} fabricsCatalog
 * @param {Object} detail
 * @param {Object} styles
 * @param {Object} quickCosting
 * @callback helper
 */
export default class FabricsCardQC extends React.Component {
  Access = JSON.parse(localStorage.getItem('Access') || '{}');
  constructor(props){
    super(props)
    this.state= {
      //
    }
  }

  simpleFixElementValue = (value) => {
    let newvalue=0.00;
    if(value === null || value === undefined || value==="" || isNaN(value)){
      newvalue=0.00;
    }else{
      newvalue=parseFloat(value);
    }
    return newvalue;
  }

  FixElementValue = (value) => {
    let newvalue=0.00;
    if(value === null || value === undefined || value==="" || isNaN(value)){
      newvalue=0.00;
    }else{
      newvalue=parseFloat(value);
    }
    return newvalue.toFixed(2);
  }

  buildNewLine = (fabric,line,key) => {
    let newLine={
      ...line,
      id: fabric.data.id,
      dm: fabric.data.dm,
      dm_width: fabric.data.width,
      weightBWashOriginal: fabric.data.weight,
      dm_pt: fabric.data.pt,
      markerWidth: fabric.data.widthMark,
      priceWhite: fabric.data.priceWhite,
      priceMedium: fabric.data.priceMedium,
      priceDark: fabric.data.priceDark,
      priceSpecial: fabric.data.priceSpecial,
      show_name: fabric.data.show_name,
      Bwidth: this.simpleFixElementValue(line.Bwidth),
      Blong: this.simpleFixElementValue(line.Blong),
      dm_updated_at: fabric.data.dm_updated_at,
    }
    return {dmIndex: key, line: newLine}
  }

  modLine = (index,key,value,line) => {
    let newLine={
      ...line,
      [key]: value
    }
    return {dmIndex: index, line: newLine}
  }

  calcCostWhite = (priceWhite, lbsXunit, lbsunit, fabricKey) => {
    let costWhite = ((12*lbsunit) * priceWhite) /12;
    return costWhite ? costWhite : 0;
  }

  calcCostMedium = (priceMedium, lbsXunit, lbsunit, fabricKey) => {
    /*let costMedium = (priceMedium * (lbsXunit + lbsunit));
    let newFabric = this.props.detail.dms[fabricKey]?this.props.detail.dms[fabricKey]:{};
    newFabric.costMedium = costMedium;*/    
    let costMedium = ((12*lbsunit) * priceMedium) /12;
    return costMedium ? costMedium : 0;
  }

  calcCostDark = (priceDark, lbsXunit, lbsunit, fabricKey) => {
    /*let costDark = (priceDark * (lbsXunit + lbsunit));
    let newFabric = this.props.detail.dms[fabricKey]?this.props.detail.dms[fabricKey]:{};
    newFabric.costDark = costDark;*/
    let costDark = ( (12*lbsunit) * priceDark ) / 12
    return costDark ? costDark : 0;
  }

  calcCostSpecial = (priceSpecial, lbsXunit, lbsunit, fabricKey) => {
    /*let costSpecial = (priceSpecial * (lbsXunit + lbsunit));
    let newFabric = this.props.detail.dms[fabricKey]?this.props.detail.dms[fabricKey]:{};
    newFabric.costSpecial = costSpecial;*/
    let costSpecial = ( (12*lbsunit) * priceSpecial ) / 12
    return costSpecial ? costSpecial : 0;
  }

  render(){
    const yardsStyle = {fontSize:"12px",color:"grey",textAlign:"center",marginBottom:"0"};
    const hasMarker = this.props.header.markerFlag ? this.props.markerBlock : true
    const options = this.props.fabricsCatalog.map(fabric => {
      return {"value": fabric.id, "label": fabric.show_name, "data": fabric};
    });
    let dmsData = this.props.detail.dms.length>0?this.props.detail.dms:[fabricLine];
    //console.log(this.props.calcs)
    if(!dmsData){
      return null;
    }
    const permision = this.props.quickCosting ? this.Access.quick_costing : this.Access.quotation;
    return (<>
     
      {this.props.header.markerFlag && 
      permision.edit && 
      <FormGroup check>
        <Label check>
          <Input type="checkbox" 
            checked={this.props.markerBlock} 
            onChange={()=>this.props.helper('markerBlock',null)}
          />
          {' '}Enable Fabric change? Marker already uploaded.
          <span className="form-check-sign">
            <span className="check"></span>
          </span>
        </Label>
      </FormGroup>}
      <br/>
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
              value={this.props.detail.pfabrics?this.props.detail.pfabrics:0}
              onChange={event=>this.props.helper('pfabrics',event.target.value)}
              disabled={permision.edit?false:true}
            />
          </Col>
        </Row>
      </div>

      <Table size="sm" className="tablesorter">
        <thead className="text-primary">
          <tr>
            <th style={{width:"34%"}}>DM</th>
            <th style={{width:"16%"}}>Style</th>
            <th style={{width:"7.5%"}}>P. White</th>
            <th style={{width:"7.5%"}}>P. Medium</th>
            <th style={{width:"7.5%"}}>P. Dark</th>
            <th style={{width:"7.5%"}}>Special</th>
            <th style={{width:"7.5%"}}>Bies Width</th>
            <th style={{width:"7.5%"}}>Bies Length</th>
            <th style={{width:"5%"}}>
              {permision.edit && <Button
                color="info"
                className="btn-simple"
                size="sm"
                onClick={() => this.props.helper('newFabric',fabricLine)}
              >
                <i className="tim-icons icon-simple-add" />
              </Button>}
            </th>
          </tr>
        </thead>
        <tbody>
        {
          dmsData.map( (val, idx) => {
            let selectedFabricType = placements.filter(o=>o.value===val.fabricType);
            const selectedFabric = val.id>0?{"value": val.id, "label": val.show_name}:null;
            const disabledInput = permision.edit?!hasMarker:true;
            const fabricOption = selectedFabric && options ? options.find(fabric=>fabric.value===selectedFabric.value): null;
            const fabricData = fabricOption ? fabricOption.data: {width: 0};
            const ydsUnit= selectedFabric? this.FixElementValue(
              (parseFloat(val.Bwidth)*parseFloat(val.Blong)) / 
              (36*fabricData.width*(fabricData.pt?1:2))
            ): 0.00;
            return (<tr key={idx} id={idx}>
              <td>
                <Select
                  menuPortalTarget={document.body}
                  className="react-select"
                  classNamePrefix="react-select"
                  styles={customStyles}
                  placeholder="Choose DM"
                  options={options}
                  onChange={value => this.props.helper('selectDM',this.buildNewLine(value,val,idx))}
                  value={selectedFabric}
                  isDisabled={disabledInput}
                />
                <p style={yardsStyle}>Updated at: {val.dm_updated_at ? customDateFormat(val.dm_updated_at): ''}</p>
              </td>
              <td>
                <Select
                  menuPortalTarget={document.body}
                  className="react-select"
                  classNamePrefix="react-select"
                  styles={customStyles}
                  placeholder="Choose placement"
                  options={placements}
                  value={selectedFabricType}
                  onChange={value => this.props.helper(
                    'selectDM',this.modLine(idx,'fabricType',value.value,val)
                  )}
                  isDisabled={disabledInput}
                />
                <p style={yardsStyle} className={'text-primary'}>
                  {selectedFabricType[0].label}
                </p>
              </td>
              <td>
                <Input
                  type="number"
                  min="0"
                  max="999"
                  step="any"
                  value={val.priceWhite}
                  onChange={ (event) => this.props.helper(
                    'selectDM',this.modLine(idx,'priceWhite',event.target.value,val)
                  ) }
                  disabled={disabledInput}
                  
                />
                <p style={yardsStyle} className={'text-primary'}>
                  {this.FixElementValue(
                    (parseFloat(val.priceWhite) / 
                    parseFloat(val.yieldydslbs))
                  )}
                </p>
              </td>
              <td>
                <Input
                  type="number"
                  min="0"
                  max="999"
                  step="any"
                  value={val.priceMedium}
                  onChange={ (event) => this.props.helper(
                    'selectDM',this.modLine(idx,'priceMedium',event.target.value,val)
                  ) }
                  disabled={disabledInput}
                />
                <p style={yardsStyle} className={'text-primary'}>
                  {this.FixElementValue(
                    parseFloat(val.priceMedium)/parseFloat(val.yieldydslbs)
                  )}
                </p>
              </td>
              <td>
                <Input
                  type="number"
                  value={val.priceDark}
                  min="0"
                  max="999"
                  step="any"
                  onChange={ (event) => this.props.helper(
                    'selectDM',this.modLine(idx,'priceDark',event.target.value,val)
                  ) }
                  disabled={disabledInput}

                />
                <p style={yardsStyle} className={'text-primary'}>
                  {this.FixElementValue(
                    parseFloat(val.priceDark)/parseFloat(val.yieldydslbs)
                  )}
                </p>
              </td>
              <td>
                <Input
                  type="number"
                  value={val.priceSpecial}
                  min="0"
                  max="999"
                  step="any"
                  onChange={ (event) => this.props.helper(
                    'selectDM',this.modLine(idx,'priceSpecial',event.target.value,val)
                  ) }
                  disabled={disabledInput}
                />
                <p style={yardsStyle} className={'text-primary'}>
                  {this.FixElementValue(
                    parseFloat(val.priceSpecial)/parseFloat(val.yieldydslbs)
                  )}
                </p>
              </td>
              <td>
                <Input 
                  type="number"
                  min="0.00"
                  max="999"
                  step="any"
                  value={val.Bwidth?val.Bwidth:0.00}
                  onChange={ (event) => this.props.helper(
                    'selectDM',this.modLine(idx,'Bwidth',event.target.value,val)
                  ) }
                  disabled={disabledInput}
                />
                <p style={yardsStyle} className={'text-primary'}>
                  Yds*u:{ydsUnit}
                </p>
              </td>
              <td>
                <Input  
                  type="number"
                  min="0.00"
                  max="999"
                  step="any"
                  value={val.Blong?val.Blong:0.00}
                  onChange={ (event) => this.props.helper(
                    'selectDM',this.modLine(idx,'Blong',event.target.value,val)
                  ) }
                  disabled={disabledInput}
                />
                <p style={yardsStyle} className={'text-primary'}>
                  Lbs*u:{this.FixElementValue(
                    parseFloat(ydsUnit) / parseFloat(val.yieldydslbs)
                  )}
                </p>
              </td>
              <td>
                {permision.edit && <Button color="warning" className="btn-simple" size="sm"
                  onClick={() => this.props.helper('removeLine',idx)}
                >
                  <i className="tim-icons icon-simple-remove"  />
                </Button>}
              </td>
            </tr>)
          })
        }
        </tbody>
      </Table>
      <Table size="sm" className="tablesorter" >
        <tbody>
        {dmsData.map( (val, idx) => {
          let certificate="";
          if(val.id>0){
            const option = options.find(fabric=>fabric.value===val.id);
            if(option){
              certificate=options.find(fabric=>fabric.value===val.id).data.pathToCertificate;
            }
          }
          return (<tr key={idx}>
            <td style={{width: '5%'}}>
              <Button
                onClick={e => {
                  e.preventDefault();
                  if(certificate!==""){
                    this.props.helper('downloadDM',certificate)
                  }
                }}
                color="danger"
                size="sm"
                className="btn-icon btn-link remove"
              >
                <i className="fa fa-download"></i>
              </Button>
            </td>
            <td style={{width:'45%'}}>
              <p className="text-primary text-center">
                {val.show_name}
              </p>
            </td>
            <td style={{width:'7.5%'}}>
              <p className="text-center">{
                this.calcCostWhite(
                  val.priceWhite,
                  val.lbsXunit,
                  val.lbsunit,
                  idx
                ).toFixed(2)
              }</p>
            </td>
            <td style={{width:'7.5%'}}>
              <p className="text-center">{
                this.calcCostMedium(
                  val.priceMedium,
                  val.lbsXunit,
                  val.lbsunit,
                  idx
                ).toFixed(2)
              }</p>
            </td>
            <td style={{width:'7.5%'}}>
              <p className="text-center">{
                this.calcCostDark(
                  val.priceDark,
                  val.lbsXunit,
                  val.lbsunit,
                  idx
                ).toFixed(2)
              }</p>
            </td>
            <td style={{width:'7.5%'}}>
              <p className="text-center">{
                this.calcCostSpecial(
                  val.priceSpecial,
                  val.lbsXunit,
                  val.lbsunit,
                  idx
                ).toFixed(2)
              }</p>
            </td>
            <td className="text-center" style={{width:"20%"}}>&nbsp;</td>
          </tr>);
        })}
        </tbody>
      </Table>
      
      <Table size="sm" className="tablesorter">
        <tbody>
          <tr>
            <td className="text-center" style={{width:"50%"}}>
              Fabrics Total (+{this.props.detail.pfabrics}%)
            </td>
            <td className="text-center" style={{width:"7.5%"}}>
              ${this.props.calcs.pricesFabrics.white.toFixed(2)}
            </td>
            <td className="text-center" style={{width:"7.5%"}}>
              ${this.props.calcs.pricesFabrics.medium.toFixed(2)}
            </td>
            <td className="text-center" style={{width:"7.5%"}}>
              ${this.props.calcs.pricesFabrics.dark.toFixed(2)}
            </td>
            <td className="text-center" style={{width:"7.5%"}}>
              ${this.props.calcs.pricesFabrics.special.toFixed(2)}
            </td>
            <td className="text-center" style={{width:"20%"}}>
              &nbsp;
            </td>
          </tr>
        </tbody>
      </Table>
    </>);
  }
}