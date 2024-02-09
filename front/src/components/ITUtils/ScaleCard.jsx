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
import style from "../PoComponents/PoPool.module.css";

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

const scaleList = [
  { label: "T1", size: "", si_code: "" },
  { label: "T2", size: "", si_code: "" },
  { label: "T3", size: "", si_code: "" },
  { label: "T4", size: "", si_code: "" },
  { label: "T5", size: "", si_code: "" },
  { label: "T6", size: "", si_code: "" },
  { label: "T7", size: "", si_code: "" },
  { label: "T8", size: "", si_code: "" },
  { label: "T8", size: "", si_code: "" },
  { label: "T0", size: "", si_code: "" },
];

export const ScaleCard = ({
  scaleName,
  isActive,
  toggleActive,
  getScaleToCreate,
}) => {
  return (
    <>
      <Card>
        <CardBody>
          <Col>
            <h2>Scale Name: {scaleName ? scaleName : ""}</h2>
            <hr />
          </Col>
          <Row>
            <>
              <Col xs={12}>
                <Row>
                  {scaleList.map((index, key) => {
                    return (
                      <>
                        <Col>
                          <p>{index.label} Size:</p>
                          <Input
                            type="text"
                            disabled={isActive}
                            style={{
                              marginBottom: "1vh",
                              textTransform: "uppercase",
                            }}
                            onChange={(e) =>
                              (scaleList.at(key).size = e.target.value.toUpperCase())
                            }
                          />
                          <p>SI CODE:</p>
                          <Input
                            type="text"
                            maxlength="2"
                            disabled={isActive}
                            style={{ marginBottom: "1vh" }}
                            onChange={(e) =>
                              (scaleList.at(key).si_code = e.target.value)
                            }
                          />
                        </Col>
                      </>
                    );
                  })}
                </Row>
                <Button
                  color="primary"
                  onClick={() => {
                    toggleActive();
                    console.log(scaleList);
                    getScaleToCreate(scaleList);
                  }}
                >
                  Save Scale
                </Button>
              </Col>
            </>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
