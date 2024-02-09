import React from "react";
import Select from "react-select";

import {
  Col,
  Table,
  FormGroup,
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  CardHeader,
  Row,
} from "reactstrap";

import ReactTable from "react-table";
import axios from "axios";
import { POCard } from "../components/PoComponents/POCard";
import { matchSorter } from "match-sorter";
import NotificationAlert from "react-notification-alert";
import ConsumptionCard from "../components/QuotationElements/ConsumptionCard";
import { number } from "prop-types";

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let today = day + "-" + month + "-" + year;

const customStyles = {
  input: (provided) => ({
    ...provided,
    color: "#e14eca",
  }),
};


class InfilesCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      openModal: false,
      product: null,
      nit: 0,
      name: '',
      prodSelected: 0,
      products: [],
      prodsToSend:[],
      productsinDetail: [],
      quantitys: [],
      quantity: 0,
      sum: '0.00',
    };

    let detail = {
      product: "",
      price: " "
    }




  }
  userToken = localStorage.getItem("userToken") || "";
  user_name = localStorage.getItem('user_name');
  Access = JSON.parse(localStorage.getItem("Access") || "{}");
  Role = localStorage.getItem("role") || "";
  infileURL = process.env.REACT_APP_IP;





  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  getProductById = (prodId) => {
    this.toggleLoading();
    axios
      .get(this.infileURL + `/products/get_product_by_id/?id=${prodId}`, {
        headers: {
          Authorization: "Token " + this.userToken,
        },
      })
      .then(
        function (response) {

          response.data.map((index) => {
            let productDetail = {
              id: index.id,
              name: index.name,
              description: index.description,
              price: index.price,
              quantity: this.state.quantity,
              totalAmount: index.price * this.state.quantity,
            }
            this.state.productsinDetail.push(productDetail)

            this.state.sum = this.state.productsinDetail.reduce((accumulator, currentObject) => {
              return accumulator + currentObject.totalAmount;
            }, 0);
          })

          this.toggleLoading();
        }.bind(this)
      )
      .catch(
        function (error) {
          this.toggleLoading();
          this.handleError(error, "products failed");
        }.bind(this)
      );
  };
  
  CreateInfile = () => {
    this.toggleLoading();
    const formData = new FormData();
    formData.append("nit", this.state.nit);
    formData.append("name", this.state.name);
    formData.append("date", today);
    formData.append("products", this.state.prodsToSend.join(','))
    formData.append("quantitys", this.state.quantitys.join(','))
    formData.append("total", this.state.sum.toFixed(2))
    axios
      .post(this.infileURL + `/infile/`, formData, {
        headers: {
          Authorization: "Token " + this.userToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        function () {
          this.toggleLoading();
          this.notify("tr", "success", "Factura creada!");
          this.componentDidMount();
        }.bind(this)
      )
      .catch(
        function (error) {
          this.handleError(error, "Error al crear factura!");
        }.bind(this)
      );
  };

  _typesLoaded = false;
  getProducts = () => {
    this.toggleLoading();
    axios
      .get(this.infileURL + "/products/get_products/", {
        headers: {
          Authorization: "Token " + this.userToken,
        },
      })
      .then(
        function (response) {
          this._typesLoaded = true;
          this._isMounted &&
            this.setState({
              products: response.data.map((prod) => {
                return {
                  value: prod.id,
                  label: prod.name,

                };
              }),
            });
          this.toggleLoading();
        }.bind(this)
      )
      .catch(
        function (error) {
          this.toggleLoading();
          this.handleError(error, "Products");
        }.bind(this)
      );
  };


  componentDidMount() {
    this._isMounted = true;
    this.getProducts();


  }

  handleError = (error, task = "unknown") => {
    let response = error.response ? error.response : {};
    let message = error.message ? error.message : "";
    if (response.status !== undefined && response.status === 401) {
      this.logOut();
    } else {
      let errors = "";
      if (response.data !== undefined) {
        for (let [key, value] of Object.entries(response.data)) {
          errors += `${key}: ${value}\t`;
        }
      } else {
        errors = message;
      }
      this.notify("tr", "warning", errors);
    }
  };

  checkPageMode = () => {
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

  notify = (place, type, msg) => {
    let options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{msg}</div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    let notificationContainer = document.getElementsByClassName(
      "react-notification-alert-container"
    );
    // If the container child element is not clear then don't
    // push any other notification.
    if (
      notificationContainer[0].innerHTML === "<div></div>" &&
      this._isMounted
    ) {
      this._isMounted && this.refs.notificationAlert.notificationAlert(options);
    }
  };

  toggleEditModal = (id) => {
    this.setState({
      editModal: !this.state.editModal,
      cardSelected: id,
    });
  };

  toggleLoading = () => {
    this._isMounted &&
      this.setState({
        loading: !this.state.loading,
      });
  };
  render() {
    const {
      loading,
      editModal,
    } = this.state;
    const pageMode = this.checkPageMode();
    let inverted = pageMode.bg === "bg-ligh" ? "inverted" : "";
    console.log(this.state.poDetail, 'detatils')
    return (
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div
          className="blackdiv"
          id="blackdiv"
          style={loading ? { display: "" } : { display: "none" }}
        >
          <div className="ui segment">
            <div className={`ui active transition ${inverted} visible dimmer`}>
              <div className="content">
                <div className="ui text loader">Loading</div>
              </div>
            </div>
            <div style={{ minHeight: 400 }}>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          modalClassName={this.checkPageMode().mc}
        >
          <ModalBody>
            <Col>
              <FormGroup row>
                <Label for="exampleEmail" className="text-primary" sm={6}>
                  Cantidad:
                  <Input
                    type="number"
                    onChange={(e) => {
                      this.setState({ quantity: e.target.value })
                      this.state.quantitys.push(e.target.value)
                      console.log(e.target.value)
                    }}
                  >
                  </Input>
                </Label>
              </FormGroup>
            </Col>

            <ModalFooter>
              <Button
                color="info"
                onClick={() => {
                  this.toggleModal();

                }}
              >
                Close
              </Button>
              <Button
                color="info"
                onClick={() => {
                  this.getProductById(this.state.prodSelected);
                  this.state.prodsToSend.push(this.state.prodSelected)
                  this.toggleModal();

                }}
              >
                Agregar
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>

        <Card>
          <CardBody>
            <Col>
              <h2>CREAR FACTURA</h2>
              <hr />
            </Col>
            <Col>
              <Col>
                <FormGroup row>
                  <Label for="exampleEmail" className="text-primary" sm={2}>
                    NIT:{""}
                    <Input
                      placeholder="Ingresar NIT..."
                      onChange={(e) => {
                        this.setState({ nit: e.target.value })
                      }}
                    />
                  </Label>
                  <Label for="exampleEmail" className="text-primary" sm={2}>
                    Nombre:{""}
                    <Input
                      placeholder="Ingresar Nombre..."
                      onChange={(e) => {
                        this.setState({ name: e.target.value })
                      }}
                    />
                  </Label>
                  <Label for="exampleEmail" className="text-primary" sm={2}>
                    Fecha:{""}
                    <Input
                      placeholder={today}
                      disabled={true}

                    />
                  </Label>


                </FormGroup>
              </Col>
            </Col>

          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Col>
              <h4>DETALLE FACTURA</h4>
              <hr />
            </Col>

            <Col>
              <Col>
                <FormGroup row>
                  <Label for="exampleEmail" className="text-primary" sm={2}>
                    Productos:{""}
                    <Select

                      className="react-select"
                      classNamePrefix="react-select"
                      styles={customStyles}
                      placeholder="Seleccionar Producto..."
                      options={this.state.products}
                      onChange={(e) => {
                        this.setState({ prodSelected: e.value })
                      }}


                    />
                  </Label>

                  <Label for="exampleEmail" className="text-primary" sm={2}>
                    <br />
                    <Button
                      onClick={() => {

                        this.toggleModal()

                      }}
                      color="info"
                      size="sm"
                    >
                      Agregar Producto
                    </Button>
                  </Label>
                </FormGroup>
                <ReactTable
                  responsive
                  defaultPageSize={5}
                  data={this.state.productsinDetail}
                  filterable
                  style={{ textAlign: 'center' }}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight primary-pagination"
                  columns={[
                    {
                      Header: "Producto",
                      accessor: "name",
                      sortable: true,
                      filterMethod: (filter, row) =>
                        matchSorter(row, filter.value, {
                          keys: ["client"],
                        }),
                      filterAll: true,
                      width: 300,

                    },
                    {
                      Header: "Descripcion",
                      accessor: "description",
                      sortable: true,
                      filterMethod: (filter, row) =>
                        matchSorter(row, filter.value, {
                          keys: ["client"],
                        }),
                      filterAll: true,
                      width: 500,

                    },

                    {
                      Header: "Cantidad",
                      accessor: `quantity`,
                      sortable: true,
                      filterMethod: (filter, row) =>
                        matchSorter(row, filter.value, {
                          keys: ["color"],
                        }),
                      filterAll: true,
                      width: 130,
                    },
                    {
                      Header: "Precio Q.",
                      accessor: `price`,
                      sortable: true,
                      filterMethod: (filter, row) =>
                        matchSorter(row, filter.value, {
                          keys: ["color"],
                        }),
                      filterAll: true,
                      width: 120,
                    },
                    {
                      Header: "Monto",
                      accessor: `totalAmount`,
                      sortable: true,
                      filterMethod: (filter, row) =>
                        matchSorter(row, filter.value, {
                          keys: ["color"],
                        }),
                      filterAll: true,
                      width: 120,
                    },

                  ]}
                />
                <br />
                <hr />
                <h2 style={{ float: 'right', marginRight: '3vh', fontWeight: 'bold' }}>Total: Q.{this.state.sum}</h2>
                <br />
                <hr />
                <Button
                  onClick={() => {
                    this.CreateInfile()
                  }}
                  color="success"
                  size="bg"
                >
                  Facturar
                </Button>
              </Col>
            </Col>
          </CardBody>
        </Card>


      </div>
    );
  }
}
export default InfilesCreator;
