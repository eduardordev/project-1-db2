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
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import ReactTable from "react-table";
import style from "./PoPool.module.css";

const CheckStyle = {
  opacity: 100,
  visibility: "visible",
};

const customStyles = {
  input: (provided) => ({
    ...provided,
    color: "#e14eca",
  }),
};

const checkPageMode = () => {
  let pageMode = document.body.classList.contains("white-content");
  let bgclass;
  let headerclass;
  switch (pageMode) {
    case true:
      bgclass = "bg-ligh";
      headerclass = "";
      break;
    default:
      bgclass = "bg-dark";
      headerclass = "text-primary";
      break;
  }
  return { bg: bgclass, hc: headerclass };
};

export const POCard = ({
  index,
  color,
  onChange,
  onRemove,
  onDuplicate,
  colorsList,
  addMaterial,
  clientId,
  getStyles,
  selectedScale,
  getColors,
  colorStyleId,
  openModal,
  openModalStyle,
  openModalColor,
  openModalPrice,
  openModalColorClient,
  materialsList,
  removeMaterial,
  editMaterial,
  openModalScale,
  openModalPlace,
  materialDisabled,
  clientStyle,
  styleId,
  clientColor,
  unitprice,
  colorClient,
  openModalDateClient,
  selectedMonth,
  selectedDay,
  selectedYear,
  selectedColor,
  poDetail,
  id,
  CopyNewCard,
}) => {
  const colorsMod = checkPageMode();
  const Role = localStorage.getItem("role") || "";
  let year = selectedYear ? selectedYear.label : 1999;
  let month = selectedMonth ? selectedMonth.label : 1;
  let day = selectedDay ? selectedDay.label : 1;
  let date = new Date(year + "-" + month + "-" + day);
  let total = 0;
  date.setDate(date.getDate() - 7);

 
 // poDetail[id].id = id;
  return (
    <>
      <Card className={`${colorsMod.bg} border`}>
        <CardBody>
          <Row>
            {/* {"id" + id} */}
            {
              <>
                <Col xs={8}></Col>
                <Col xs={3}>
                  <Button
                    disabled={materialDisabled}
                    color="danger"
                    size={"sm"}
                    className="float-right"
                    onClick={() => {
                      onRemove(id);
                    }}
                  >
                    x
                  </Button>
                  {/* <Button
                    color="secondary"
                    size={"sm"}
                    className="float-right"
                    onClick={() => {
                      CopyNewCard(id);
                    }}
                  >
                    copy
                  </Button> */}
                </Col>
              </>
            }
          </Row>
          <br />
          <Row>
            <>
              <Col xs={12}>
                <Row>
                  <Col sm={4}>
                    <p className="card-category d-inline">
                      Client Style:{" "}
                      {poDetail[id] ? poDetail[id].styleClientpoDetail : ""}
                      <Button
                        color="info"
                        size="sm"
                        className="btn-icon btn-link"
                        onClick={() => {
                          openModalStyle(id);
                        }}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <br></br>
                      Style:{" "}
                      {poDetail[id] ? (
                        poDetail[id].stylepoDetail.name
                      ) : (
                        <>{style.style === null ? "None" : style.style}</>
                      )}
                      {
                        <Button
                          color="info"
                          size="sm"
                          className="btn-icon btn-link"
                          onClick={() => {
                            openModal(id);
                            getStyles(clientId);
                          }}
                        >
                          <i className="fa fa-edit" />
                        </Button>
                      }
                    </p>
                  </Col>
                  <Col sm={4}>
                    <p className="card-category d-inline">
                      Export Date Client:{" "}
                      {poDetail[id] && poDetail[id].exportDateClient}
                      <Button
                        color="info"
                        size="sm"
                        className="btn-icon btn-link"
                        onClick={() => {
                          openModalDateClient(id);
                        }}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <br></br>
                      Export Date:{" "}
                      {poDetail[id] && poDetail[id].exportDatepoDetail}
                      {/* <Button
                        color="info"
                        size="sm"
                        className="btn-icon btn-link"
                        onClick={() => {
                          //editedProcecss(idx);
                          //openModal(style.id);
                        }}
                      >
                        <i className="fa fa-edit" />
                      </Button> */}
                      <br></br>
                      Scale: {poDetail[id] && poDetail[id].scalepoDetail.label}
                      <Button
                        color="info"
                        size="sm"
                        className="btn-icon btn-link"
                        onClick={() => {
                          //editedProcecss(idx);
                          openModalScale(id);
                        }}
                      >
                        <i className="fa fa-edit" />:
                      </Button>
                    </p>
                  </Col>
                  {styleId && (
                    <>
                      <Col sm={4}>
                        <p className="card-category ">
                          Color Client:{" "}
                          {poDetail[id] ? poDetail[id].colorClientpoDetail : ""}
                          <Button
                            color="info"
                            size="sm"
                            className="btn-icon btn-link"
                            onClick={() => {
                              openModalColorClient(id);
                            }}
                          >
                            <i className="fa fa-edit" />
                          </Button>
                          <br></br>
                          Color:{" "}
                          {poDetail[id]
                            ? poDetail[id].colorpoDetail &&
                              poDetail[id].colorpoDetail.name
                            : ""}
                          <Button
                            color="info"
                            size="sm"
                            className="btn-icon btn-link"
                            onClick={() => {
                              openModalColor(id);
                              getColors(styleId.id);
                            }}
                          >
                            <i className="fa fa-edit" />
                          </Button>
                          {/* <br></br>
                      Unit Price: {unitprice? unitprice : ''} {style.unit_price}
                      <Button
                        color="info"
                        size="sm"
                        className="btn-icon btn-link"
                        onClick={() => {
                          openModalPrice()
                        }}
                      >
                        <i className="fa fa-edit" />
                      </Button> */}
                          <br></br>
                        </p>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </>
          </Row>
          <Row>
            {poDetail[id] &&
              (poDetail[id].scalepoDetail &&
                poDetail[id].scalepoDetail[0].sizes.map((size, idsize) =>
                  size.si_code !== "00" ? (
                    //console.log(poDetail,'idsize'),
                    poDetail[id].status === 'new'? (poDetail[id].scalepoDetail[0].sizes[idsize].quantity = 0) : (poDetail[id].scalepoDetail[0].sizes[idsize].quantity && poDetail[id].scalepoDetail[0].sizes[idsize].quantity),
                    poDetail[id].status === 'new'? (poDetail[id].scalepoDetail[0].sizes[idsize].unitprice = 0) : (poDetail[id].scalepoDetail[0].sizes[idsize].unitprice ? poDetail[id].scalepoDetail[0].sizes[idsize].unitprice : (poDetail[id].scalepoDetail[0].sizes[idsize].unitprice = 0)),
                    //poDetail[id].status = 'old',
                    <Col>
                      <hr />
                     {"id" + id} 
                      <p className="title"> {size.name}</p>
                      <Input
                        type="int"
                        pattern="[0-9]"
                        // maxLength="20"
                        defaultValue= {poDetail[id].scalepoDetail[0].sizes[idsize].quantity ?poDetail[id].scalepoDetail[0].sizes[idsize].quantity : 0}
                          // value={
                            
                          // }
                        onChange={
                          (e) =>
                            (poDetail[id].scalepoDetail[0].sizes[idsize].quantity =
                              e.target.value)
                          //this.state.poDetail[id].scalepoDetail.sizes[idsize].quantity = size.id
                          //this.state.poDetail[id].scalepoDetail.sizes[idsize].unitprice = size.id
                        }
                      />
                      <p className="title">Price</p>
                      <Input
                        type="number"
                        // maxLength="20"
                        // value={
                        //   poDetail[id].scalepoDetail.sizes[idsize].unitprice ?  poDetail[id].scalepoDetail.sizes[idsize].unitprice : 0
                        // }
                        defaultValue = {poDetail[id].scalepoDetail[0].sizes[idsize].unitprice ?  poDetail[id].scalepoDetail[0].sizes[idsize].unitprice : 0}
                        onChange={(e) => {
                          poDetail[id].scalepoDetail[0].sizes[idsize].unitprice =
                            e.target.value;
                          //this.state.poDetail[id].scalepoDetail.sizes[idsize].quantity = size.id
                          //this.state.poDetail[id].scalepoDetail.sizes[idsize].unitprice = size.id
                        }}
                      />
                    </Col>
                  ) : (
                    <></>
                  )
                ))}
            {poDetail[id].scalepoDetail && (
              <Col>
                <p className="title">Total</p>
                {poDetail[id].scalepoDetail &&
                  poDetail[id].scalepoDetail[0].sizes.map((size, idsize) => {
                    size.quantity && (total = total + parseInt(size.quantity));
                  })}
                <p className="text-muted">{total}</p>
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
