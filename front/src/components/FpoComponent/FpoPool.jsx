import React from "react";
import style from './PoPool.module.css';
// reactstrap components
import {
  Col,
  Table,
  FormGroup,
  Card,
  CardBody,
  Button,
  Label,
  CardHeader,
  Row,
} from "reactstrap";



export const PoPool = ({
  OpenPO,
  poList,
  getStylesFromBOM
}) => {
  return <>
    <Card className="card-tasks text-left">
      <CardHeader>
        <p className="card-category d-inline">FPO No.</p>
      </CardHeader>
      <CardBody>
        <div className="table-responsive table-full-width">
          <Table>
            <tbody>
              {poList && poList.map((po) => {
                return (
                  <tr>

                    <td>
                      <p className="title">{po.po_number}</p>
                      <p className="text-muted">
                        {po.clients_style}
                        {/*po.delivery_place && po.delivery_place.name + ' ' + po.sizes.export_date*/}
                      </p>
                    </td>
                    <td className="td-actions text-right">
                      <Button
                        color="link"
                        type="button"
                        onClick={() => { OpenPO(po.id) }}>
                        <i className="tim-icons icon-zoom-split" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  </>
}

export const PoInfo = ({
  newStyle,
  selectedPO,
  approvePo,
  deliveryPlaceInfo,
  // StylesArray,
  //styles_in_po,
  getColorsForStyle,
  editedProcecss,
  openModal,
  openModalStyle,
  openModalColor,
  openModalPrice,
  getStylesFromBOM,
  getColorsFromStyle,
  openModalScale,
  openModalPlace,
  getColorFromPO
  //deletePO
}) => {
  console.log(selectedPO)
  return <>
    <Card >
      {/* console.log(selectedPO ) */}
      {selectedPO ?
        <CardBody>
          <FormGroup row>
            <Label for="exampleEmail" className="text-primary" sm={2}>No. FPO: </Label>
            <Col sm={3}>{selectedPO.po_number}</Col>
            <Label for="exampleEmail" className="text-primary" sm={3}>Client Delivery Place:</Label>
            <Col sm={4}>{selectedPO.clients_delivery_place}</Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" className="text-primary" sm={2}>Client:</Label>
            <Col sm={3}>{selectedPO.client.name}</Col>
            <Label for="exampleEmail" className="text-primary" sm={3}>Delivery Place:</Label>
            <Col sm={4}>{selectedPO.real_delivery_place_label ? selectedPO.real_delivery_place_label : deliveryPlaceInfo.name}
              <Button
                color="info"
                size="sm"
                className="btn-icon btn-link"
                onClick={() => {
                  openModalPlace(selectedPO.id)
                }}>
                <i className="fa fa-edit" />
              </Button>
            </Col>

          </FormGroup>

          <div className={`${style.sizeTable} `}
          >
            {selectedPO.details.map((style, idx) => {
              return (
                <div className={`${style.bordered} blockquote`}>
                  {
                    <Row>
                      <Col sm={4}>
                        <p className="card-category d-inline">
                          Client Style: {style.clients_style}
                          <br></br>
                          Style: {style.style_label ? style.style_label : <>{style.style === null ? 'None' : style.style}</>}
                          {<Button
                            color="info"
                            size="sm"
                            className="btn-icon btn-link"
                            onClick={() => {
                              editedProcecss(idx)
                              openModalStyle()
                            }}>
                            <i className="fa fa-edit" />
                          </Button>}
                        </p>
                      </Col>
                      <Col sm={4}>
                        <p className="card-category d-inline">
                          Export Date Client: {style.clients_export_date}
                          <br></br>
                          Export Date: {style.exportation_date ? style.exportation_date : 'None'}
                          <Button
                            color="info"
                            size="sm"
                            className="btn-icon btn-link"
                            onClick={() => {
                              editedProcecss(idx)
                              openModal(style.id)
                            }}>
                            <i className="fa fa-edit" />
                          </Button>
                          <br></br>
                          Scale: {style.scale_label ? style.scale_label : <>{style.scale === null ? 'None' : style.scale}</>}
                          <Button
                            color="info"
                            size="sm"
                            className="btn-icon btn-link"
                            onClick={() => {
                              editedProcecss(idx)
                              openModalScale(style.id)
                            }}>
                            <i className="fa fa-edit" />
                          </Button>
                        </p>
                      </Col>
                      <Col sm={4}>
                        <p className="card-category ">
                          Color Client: {style.clients_color}
                          <br></br>
                          Color: {style.color_label ? style.color_label : <>{style.color === null ? 'None' : style.color.name}</>}
                          <Button
                            color="info"
                            size="sm"
                            className="btn-icon btn-link"
                            onClick={() => {
                              let id_style = style.id_style;
                              if (newStyle.styleHasCHange===true && newStyle.newStyle !== null) {
                                id_style = newStyle.newStyle.id
                              }
                              getColorsFromStyle(id_style)
                              editedProcecss(idx)                             
                            }}>
                            <i className="fa fa-edit" />
                          </Button>
                          <br></br>
                          Unit Price: {style.unit_price}
                          <Button
                            color="info"
                            size="sm"
                            className="btn-icon btn-link"
                            onClick={() => {
                              editedProcecss(idx)
                              openModalPrice(style.id)
                            }}>
                            <i className="fa fa-edit" />
                          </Button>
                          <br></br>
                        </p>
                      </Col>
                    </Row>
                  }
                  <Table>
                    <tbody>
                      <tr>
                        {selectedPO.details[idx].sizes.map((size) => {
                          return (
                            <>
                              <td>
                                <p className="title">{size.clients_size}</p>
                                <p className="text-muted">
                                  {size.quantity}
                                </p>
                                <p className="title">Price</p>
                                <p className="text-muted">
                                  {size.clients_unit_price}
                                </p>
                              </td>
                            </>
                          )
                        })}
                        <td>
                          <p className="title">Total</p>
                          <p className="text-muted">
                              {selectedPO.details[idx].total}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              )
            })}
          </div>
          <Button
            color="primary"
            onClick={() => {
              approvePo(selectedPO.id)
            }}>
            Approve FPO
          </Button>

        </CardBody>
        :
        <CardBody>
          Please select a FPO
        </CardBody>}
    </Card>
  </>
}
