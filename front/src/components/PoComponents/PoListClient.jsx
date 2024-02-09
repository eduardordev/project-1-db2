/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable array-callback-return*/
import React from "react";
import ReactTable from 'react-table';
import axios from 'axios';
import { matchSorter } from 'match-sorter';
// reactstrap components
import {
  Row,
  Col,
  FormGroup,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import NotificationAlert from "react-notification-alert";

class PoListClient extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      productOrder: null,
      styles_po: null,
      activePo: [1, 2, 3, 4, 5],
      selectedFile: null,
      modalDetail: false,
      selectedColor: 0
    }
  }
  userToken = localStorage.getItem('userToken') || '';
  Access = JSON.parse(localStorage.getItem('Access') || '{}');
  Role = localStorage.getItem('role') || '';
  costingURL = process.env.REACT_APP_IP;

  toggleLoading = () => {
    this._isMounted && this.setState({
      loading: !this.state.loading
    })
  }
  notify = (place, type, msg) => {
    let options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {msg}
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    let notificationContainer = document
      .getElementsByClassName("react-notification-alert-container");
    // If the container child element is not clear then don't 
    // push any other notification.
    if (notificationContainer[0].innerHTML === "<div></div>") {
      this.refs.notificationAlert.notificationAlert(options);
    }
  };

  logOut = () => {
    this._isMounted = false;
    localStorage.clear();
    this.componentWillUnmount();
    this.props.history.push("/auth/login");
  }


  componentWillUnmount() {
    this._isMounted = false;
  }
  handleError = (error, task = 'unknown') => {
    let response = error.response ? error.response : {};
    let message = error.message ? error.message : '';
    //console.log(response,message,task)
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
  }

  getPOS = (poId) => {
    this.toggleLoading()
    axios.get(
      process.env.REACT_APP_IP + `/po/${poId}/`,
      {
        headers: { "Authorization": "Token " + this.userToken }
      }
    ).then(function (response) {
      this._loadedBomsHeaders = true;
      this.setState({
        productOrder: response.data,
        productOrderDetail: response.data.details.map((style, idx) => {
          return {
            id: style,
            scale: style.scale,
            style: style.clients_style,
            color: style.clients_color,
            exportation_date: style.clients_export_date,
            sizes: style.sizes,
            actions:
              <Button
                color="info"
                size="sm"
                className="btn-icon btn-link"
                onClick={() => {
                  this.setState({
                    selectedColor: idx
                  })
                  this.toggleDetails()

                }
                }
              ><i className="fas fa-search" />
              </Button>
          }
        }),
      })
      this.toggleLoading()
    }.bind(this)).catch(function (error) {
      this.handleError(error, 'error Loading');
    }.bind(this))

  }

  goBack() {
    const path = "/admin/po_client"
    this.props.history.push({
      pathname: path,

    })
  }


  componentDidMount() {
    this._isMounted = true;
    if (this.props.location.state) {
      this.getPOS(this.props.location.state.poId);
    }
  }

  checkPageMode = () => {
    let pageMode = document.body.classList.contains('white-content');
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
  }

  toggleDetails = () => {
    this.setState({
      modalDetail: !this.state.modalDetail
    });
  }

  render() {

    const {
      loading,
      productOrder,
      productOrderDetail,
      selectedColor,
      modalDetail,
    } = this.state;
    const pageMode = this.checkPageMode();

    let inverted = pageMode.bg === "bg-ligh" ? 'inverted' : '';
    return (
      <div className="content">
        <div className="blackdiv" id="blackdiv" style={loading ? { display: '' } : { display: 'none' }}>
          <div className="ui segment">
            <div className={`ui active transition ${inverted} visible dimmer`}>
              <div className="content"><div className="ui text loader">Loading</div></div>
            </div>
            <div style={{ minHeight: 400 }}><p>&nbsp;</p></div>
          </div>
        </div>
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <Modal
          isOpen={modalDetail}
          toggle={this.toggleDetails}
          modalClassName={this.checkPageMode().mc}
          className="modal-lg"
        >
          <ModalBody>
            <h3>
              Sizes Details
            </h3>
            {/*console.log('selected',selectedColor, 'hola', this.state.productOrderDetail)*/}
            {this.state.productOrderDetail ?

              <ReactTable
                responsive
                defaultPageSize={5}
                data={productOrderDetail[selectedColor].sizes}
                usePagination={false}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight primary-pagination"
                columns={[
                  {
                    Header: "Size",
                    accessor: "clients_size",
                  },
                  {
                    Header: "Quantity",
                    accessor: "quantity",
                  },
                  {
                    Header: "Unit Price",
                    accessor: "clients_unit_price",
                  },
                ]}
              /> : 'undefined'}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleDetails()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Row className="justify-content-center mt-5">

          <Card>
            <CardBody>
              <Row>

                <Col sm='4'>
                  <Button
                    className="btn-simple"
                    color="info"
                    onClick={() => this.goBack()}
                  >
                    <i class="fas fa-arrow-left"></i> &nbsp; Back
                  </Button>
                </Col>
                <Col sm='8'>
                  <br></br>
                  <h1>
                    Purchase Order Details
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col sm='12'>
                  {productOrder &&
                    <>
                      <Card className={`${pageMode.bg} border`}>
                        <CardBody>
                          <Row>
                            <Col sm={1}></Col>
                            <Col sm={5}>
                              <FormGroup row>
                                <Col sm={4}>
                                  <div for="exampleEmail" className="text-primary">
                                    PO Number:
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <p>
                                    &nbsp;
                                    {productOrder.po_number}
                                  </p>
                                </Col>
                              </FormGroup>
                            </Col>
                            <Col sm={5}>
                              <FormGroup row>
                                <Col sm={4}>
                                  <div for="exampleEmail" className="text-primary">
                                    Delivery Place:
                                  </div>
                                </Col>
                                <Col sm={6}>
                                  <p>
                                    &nbsp;
                                    {productOrder.clients_delivery_place}
                                  </p>
                                </Col>
                              </FormGroup>
                            </Col>
                            <Col sm={1}></Col>
                            <Col sm={1}></Col>
                            <Col sm={5}>
                              <FormGroup row>
                                <Col sm={4}>
                                  <div for="exampleEmail" className="text-primary">
                                    Client:
                                  </div>
                                </Col>
                                <Col sm={6}>
                                  <p>
                                    &nbsp;
                                    {productOrder.client.name}
                                  </p>

                                </Col>
                              </FormGroup>
                            </Col>
                            <Col sm={5}>
                              <FormGroup row>
                                <Col sm={4}>
                                  <div for="exampleEmail" className="text-primary">
                                    {/*Path to PO:*/}
                                  </div>
                                </Col>
                                {/*<Col sm={6}>
                                  <p>
                                    &nbsp;
                                    
                                    {productOrder.status}
                                  </p>
                                </Col>*/}
                              </FormGroup>
                            </Col>
                          </Row>
                          <hr></hr>
                          {<ReactTable
                            responsive
                            defaultPageSize={10}
                            data={productOrderDetail}
                            filterable
                            className="-striped -highlight primary-pagination"
                            columns={[
                              {
                                Header: "Scale",
                                accessor: "scale",
                                sortable: true,
                                filterMethod: (filter, row) =>
                                  matchSorter(row, filter.value, { keys: ["scale"] }),
                                filterAll: true,
                              },
                              
                              {
                                Header: "Style",
                                accessor: "style",
                                sortable: true,
                                filterMethod: (filter, row) =>
                                  matchSorter(row, filter.value, { keys: ["style"] }),
                                filterAll: true,
                              },
                              {
                                Header: "Color",
                                accessor: "color",
                                sortable: true,
                                filterMethod: (filter, row) =>
                                  matchSorter(row, filter.value, { keys: ["color"] }),
                                filterAll: true,
                              },
                             
                              {
                                Header: "Export Date",
                                accessor: "exportation_date",
                                sortable: true,
                                filterMethod: (filter, row) =>
                                  matchSorter(row, filter.value, { keys: ["exportation_date"] }),
                                filterAll: true,
                              },
                              {
                                Header: "Details",
                                accessor: "actions",
                                width: 100,
                                
                              }
                            ]} />}
                        </CardBody>
                      </Card>
                    </>
                  }
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </div>
    );
  }
}
export default PoListClient;