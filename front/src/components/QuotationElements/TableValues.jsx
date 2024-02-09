import React from 'react'
import {Table,Input,} from 'reactstrap'

export const TableValues = (props) => {
  let {
    CostingHeaderHelper,Access,detail,header
  } = props;
  let {
    drawcore,twillTape,clearElastic,lining,
    selfFabricTape,elastic,waistbandElastic
  } = detail;
  
  drawcore=drawcore?drawcore:"0/0";
  twillTape=twillTape?twillTape:"0/0";
  clearElastic=clearElastic?clearElastic:"0/0";
  lining=lining?lining:"0/0";
  selfFabricTape=selfFabricTape?selfFabricTape:"0/0";
  elastic=elastic?elastic:"0/0";
  waistbandElastic=waistbandElastic?waistbandElastic:"0/0";
  
  //const permision = props.quickCost ? Access.quick_costing : Access.quotation;
  const permision = header === "D" ?  true : (props.quickCost ? Access.quick_costing : Access.quotation);


  return (<>
    <Table>
      <thead>
        <tr>
        <th><b>&nbsp;</b></th>
        <th><b>width</b></th>
        <th><b>long</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Drawcord</td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={drawcore.split("/")[0]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"drawcore",position:0,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={drawcore.split("/")[1]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"drawcore",position:1,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
        </tr>
        <tr>
          <td>Twill Tape</td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={twillTape.split("/")[0]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"twillTape",position:0,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={twillTape.split("/")[1]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"twillTape",position:1,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
        </tr>
        <tr>
          <td>Clear Elastic</td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={clearElastic.split("/")[0]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"clearElastic",position:0,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={clearElastic.split("/")[1]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"clearElastic",position:1,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
        </tr>
        <tr>
          <td>Lining</td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={lining.split("/")[0]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"lining",position:0,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={lining.split("/")[1]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"lining",position:1,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
        </tr>
        <tr>
          <td>Hanger/Zipper Loop</td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={selfFabricTape.split("/")[0]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"selfFabricTape",position:0,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={selfFabricTape.split("/")[1]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"selfFabricTape",position:1,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
        </tr>
        <tr>
          <td>Elastic Hem</td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={elastic.split("/")[0]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"elastic",position:0,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
          <td>
            <Input type={"number"} 
              min={0} max={100}
              value={elastic.split("/")[1]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"elastic",position:1,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
        </tr>
        <tr>
          <td>Elastic Waistband</td>
          <td>
            <Input type={"number"} 
              min={0} max={100}
              value={waistbandElastic.split("/")[0]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"waistbandElastic",position:0,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
          <td>
            <Input type={"number"} 
              min={0} max={100} 
              value={waistbandElastic.split("/")[1]}
              onChange={e=>
                CostingHeaderHelper('detail',{key:"waistbandElastic",position:1,value:e.target.value})
              }
              disabled={permision.edit?false:true}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  </>)
} 