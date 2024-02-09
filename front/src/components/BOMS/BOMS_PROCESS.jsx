import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Form,
  Button
} from "reactstrap";
import Select from "react-select";
import ReactTable from "react-table";

const CheckStyle = {
  opacity: 100,
  visibility: 'visible'
}

const customStyles = {
  input: (provided) => ({
      ...provided,
      color: '#e14eca'
  })
}

export const BOMS_PROCESS = () => {
  return (<Card>
    <CardBody>
      <CardTitle>Procesos</CardTitle>
      <Form>
        <Row>
          <Col sm={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" style={CheckStyle} checked />{' '}
                Corte
              </Label>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" style={CheckStyle} />{' '}
                Bordado
              </Label>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" style={CheckStyle} />{' '}
                Serigrafia
              </Label>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" style={CheckStyle} checked />{' '}
                Costura
              </Label>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" style={CheckStyle} />{' '}
                Sublima/Teñido
              </Label>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" style={CheckStyle} />{' '}
                Lavado
              </Label>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" style={CheckStyle} />{' '}
                Empaque
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>)
}

const checkPageMode = () => {
  let pageMode=document.body.classList.contains('white-content');
  let bgclass;
  let headerclass;
  switch(pageMode){
    case true:
      bgclass="bg-ligh";
      headerclass="";
      break;
    default:
      bgclass="bg-dark";
      headerclass="text-primary";
      break;
  }
  return {bg: bgclass,hc: headerclass};
}

export const ProcessColorCard = ({
  index,
  color,
  onChange,
  onRemove,
  onDuplicate,
  colorsList,
  addMaterial,
  materialsList,
  removeMaterial,
  editMaterial,
  materialDisabled
}) => {
  const colorsMod = checkPageMode();
  const selectedColor = colorsList.find(scolor => scolor.label===color.value);
  const Role = localStorage.getItem('role') || '';
  //console.log('material disabled', materialDisabled);
  return (
    <Card className={`${colorsMod.bg} border`}>
      <CardBody>
        <Row>
          {Role !== "Generacion" && Role !== 'Patronajes'?  (
            <>
              <Col xs={11}>
                <Select
                  isDisabled={materialDisabled}
                  options={colorsList}
                  styles={customStyles}
                  onChange={(option) =>
                    onChange(index, "color", option.value || selectedColor.id)
                  }
                  value={selectedColor}
                />
              </Col>

              <Col xs={1}>
                <Button
                  disabled={materialDisabled}
                  color="danger"
                  size={"sm"}
                  className="float-right"
                  onClick={() => {
                    onRemove(color.uid);
                  }}
                >
                  x
                </Button>
                <Button
                  color="secondary"
                  size={"sm"}
                  className="float-right"
                  onClick={() => {
                    onDuplicate(color);
                  }}
                >
                  copy
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Col xs={11}>
                <Select
                  isDisabled={true}
                  options={colorsList}
                  styles={customStyles}
                  onChange={(option) =>
                    onChange(index, "color", option.value || selectedColor.id)
                  }
                  value={selectedColor}
                />
              </Col>
            </>
          )}
        </Row>
        <br />
        <Row>
          {Role !== "Generacion" && Role !== 'Patronajes'? (
            <>
              <Col xs={5}>
                <Row>
                  <Col sm={12}>
                    <FormGroup row>
                      <Label sm={3}>Embroidery</Label>
                      <Col sm={9}>
                        <Input
                          disabled={materialDisabled}
                          type="text"
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "embroidery_description",
                              e.target.value
                            );
                          }}
                          value={color.embroidery_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Laser</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={materialDisabled}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "laser_description",
                              e.target.value
                            );
                          }}
                          value={color.laser_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Washed</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={materialDisabled}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "washed_description",
                              e.target.value
                            );
                          }}
                          value={color.washed_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Ironing</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={materialDisabled}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "ironing_description",
                              e.target.value
                            );
                          }}
                          value={color.ironing_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Serigraphy</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={materialDisabled}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "serigraphy_description",
                              e.target.value
                            );
                          }}
                          value={color.serigraphy_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Sublimate</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={materialDisabled}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "sublimate_description",
                              e.target.value
                            );
                          }}
                          value={color.sublimate_description}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col xs={7}>
                <Button
                  size={"sm"}
                  disabled={materialDisabled}
                  onClick={() => addMaterial(index)}
                >
                  Add Material
                </Button>
                <MaterialsTable
                  index={index}
                  materials={color.materials}
                  materialsList={materialsList}
                  onDelete={removeMaterial}
                  onEdit={editMaterial}
                  materialDisabled={materialDisabled}
                />
              </Col>
            </>
          ) : (
            <>
              <Col xs={10}>
                <Row>
                  <Col sm={12}>
                    <FormGroup row>
                      <Label sm={3}>Embroidery</Label>
                      <Col sm={9}>
                        <Input
                          disabled={true}
                          type="text"
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "embroidery_description",
                              e.target.value
                            );
                          }}
                          value={color.embroidery_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Laser</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={true}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "laser_description",
                              e.target.value
                            );
                          }}
                          value={color.laser_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Washed</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={true}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "washed_description",
                              e.target.value
                            );
                          }}
                          value={color.washed_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Ironing</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={true}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "ironing_description",
                              e.target.value
                            );
                          }}
                          value={color.ironing_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Serigraphy</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={true}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "serigraphy_description",
                              e.target.value
                            );
                          }}
                          value={color.serigraphy_description}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={3}>Sublimate</Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          disabled={true}
                          maxLength="70"
                          onChange={(e) => {
                            onChange(
                              index,
                              "sublimate_description",
                              e.target.value
                            );
                          }}
                          value={color.sublimate_description}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <></>
            </>
          )}
        </Row>
      </CardBody>
    </Card>
  );
}

export const MaterialsTable = ({
  index,
  materials,
  materialsList,
  onEdit,
  onDelete,
  materialDisabled
}) => {
  let dataTable = materials.map((material, i) => {
    const selectedMaterial = materialsList.find(m=>m.value===material.material_id);
    //console.log('se;ected mateiral', selectedMaterial);
    //console.log('MATERIAL',material);
    const materialSelectedP = selectedMaterial || material ;
    //console.log('materialSelectedP', materialSelectedP)
    return {
      ...material,
      material_name: materialSelectedP.label,
      actions: (<>
        <Button
          disabled={materialDisabled}
          size={"sm"} 
          color={"info"}
          onClick={()=>onEdit(index,{
            material: materialSelectedP,
            consumption: material.consumption,
            bom_material_id: 0,
            old_costing_id: material.old_costing_id,
            measure: material.measure
            //material_name: materialSelectedP.label,
            /*material: materialSelectedP,
            consumption: materialSelectedP.consumption,
            bom_material_id: 0,*/
          },i)}
        >Edit</Button>
        <Button
          disabled={materialDisabled}
          size={"sm"} 
          color={"danger"}
          onClick={()=>onDelete(index, material.material_id)}
        >x</Button>
      </>)
    }
  })
  return <ReactTable responsive
    data = {dataTable}
    filterable
    columns={[
      {
        Header: "Material",
        accessor: "material_name",
        sortable: false,
        filterable: false,
      },
      {
        Header: "Consumo",
        accessor: "consumption",
        sortable: false,
        filterable: false,
      },
      {
        Header: "Measure",
        accessor: "measure",
        sortable: false,
        filterable: false,
      },
      {
        Header: "Code",
        accessor: "old_costing_id",
        sortable: false,
        filterable: false,
      },
      {
        Header: "ACTION",
        accessor: "actions",
        sortable: false,
        filterable: false,
        width: 150
      }
    ]}
    defaultPageSize = {5}
  />
}