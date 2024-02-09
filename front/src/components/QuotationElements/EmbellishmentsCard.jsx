import React from "react";

// reactstrap components
import {
  Button,
  Input,
  Table,
} from "reactstrap";
import Select from "react-select";


/** react-select style */
const customStyles = {
  input: (provided) => ({
    ...provided,
    color: '#e14eca'
  })
}

const embLine = [
  { value: 'O', label: 'OTHER' },
  { value: 'B', label: 'BONDING' },
  { value: 'E', label: 'EMBROIDERY' },
  { value: 'A', label: 'APPLIQUE' },
  { value: 'EM', label: 'EMBOSSED' },
  { value: 'RS', label: 'ROLL_SUBLIMATION' },
  { value: 'S', label: 'SCREENPRINT' },
  { value: 'SU', label: 'SUBLIMATION' },
  { value: 'G', label: 'GARMENT_WASH' }
]

const newLine = {
  "id": 0,
  "name": "",
  "status": "A",
  "price": 0.0,
  "description": "",
  "margin": 0.0
}



function EmbellishmentsCard(props) {
  const Access = JSON.parse(localStorage.getItem('Access') || '{}');
  const dmArray = JSON.parse(localStorage.getItem('dms'));
  let sumEmbellishment = props.totalEmbellishments;
  let embellishmentData = props.detail.embellishments ? props.detail.embellishments : [newLine];
  const { quickCost, header } = props;
  //const permision = quickCost ? Access.quick_costing : Access.quotation;
  const permision = header === "D" ? true : (quickCost ? Access.quick_costing : Access.quotation);

  function dmSelector() {
    if (props.quickCost) {
      const dms = []
      /*eslint-disable-next-line*/
      props.detail.dms.map((val, idx) => {
        dms.push({ value: props.detail.dms[idx].dm, label: props.detail.dms[idx].dm })
      })
      return (dms)
    } else {
      const dms = []
      /*eslint-disable-next-line*/
      dmArray.map((val, idx) => {
        dms.push({ value: dmArray[idx].dm, label: dmArray[idx].dm })
      })
      return (dms)
    }
  }

  function buildNewLine(embellishment, line, key) {
    let newLine = {
      ...line,
      name: embellishment.value,
      price: 0.00,
      margin: 0.00,
      description: ''
    }
    return { embellishmentIndex: key, line: newLine }
  }

  function modLine(index, key, value, line) {
    let newvalue = key === "price" ? parseFloat(value) : value;
    let newLine = {
      ...line,
      [key]: newvalue
    }
    return { embellishmentIndex: index, line: newLine }
  }



  return (<Table className="tablesorter">
    <thead className="text-primary">
      <tr>
        <th>Embellishment</th>
        <th>DM</th>
        <th>Price</th>
        <th>Margin</th>
        <th>Description</th>
        <th>
          {permision.edit && <Button
            color="info"
            className="btn-simple"
            size="sm"
            onClick={event => { event.preventDefault(); props.helper('newEmbellishment', newLine) }}
          >
            <i className="tim-icons icon-simple-add" />
          </Button>}
        </th>
      </tr>
    </thead>
    <tbody>
      {
        embellishmentData.map((val, idx) => {
          let selectedName = embLine.find(o => o.value === val.name)
          return (
            <tr key={idx} id={idx}>
              <td style={{ width: "50%" }}>
                <Select
                  menuPortalTarget={document.body}
                  className="react-select"
                  classNamePrefix="react-select"
                  styles={customStyles}
                  placeholder="Choose embellishment"
                  options={embLine}
                  onChange={value => props.helper(
                    'selectEmbellishment',
                    buildNewLine(value, val, idx)
                  )}
                  value={selectedName}
                  isDisabled={permision.edit ? false : true}
                />
              </td>
              <td style={{ width: "10%" }}>
                <Select
                  options={dmSelector()}
                  styles={customStyles}
                  placeholder="DM" />
              </td>
              <td style={{ width: "10%" }}>
                <Input
                  type="number"
                  min="0"
                  max="999"
                  step="0.01"
                  value={val.price ? val.price : 0.00}
                  onChange={(event) => props.helper('selectEmbellishment', modLine(idx, 'price', event.target.value, val))}
                  disabled={permision.edit ? false : true}
                />
              </td>
              <td style={{ width: "10%" }}>
                <Input type={'number'}
                  value={val.margin ? val.margin : 0.00}
                  step="0.01"
                  onChange={
                    (event) => props.helper('selectEmbellishment', modLine(idx, 'margin', event.target.value, val))
                  }
                  disabled={permision.edit ? false : true}
                />
              </td>
              <td style={{ width: "25%" }}>
                <Input
                  type="text"
                  value={val.description}
                  onChange={(event) => props.helper('selectEmbellishment', modLine(idx, 'description', event.target.value, val))}
                  disabled={permision.edit ? false : true}
                />
              </td>
              <td style={{ width: "5%" }}>
                {permision.edit && <Button color="warning"
                  className="btn-simple"
                  size="sm"
                  onClick={() => props.helper('removeLine', idx)}
                >
                  <i className="tim-icons icon-simple-remove" />
                </Button>}
              </td>
            </tr>
          )
        })
      }
      <tr>
        <td className="text-center" colSpan={3}>
          <b>Total Embellishment</b>
        </td>
        <td className="text-center">${sumEmbellishment}</td>
      </tr>
    </tbody>
  </Table>);
}
export default EmbellishmentsCard;
