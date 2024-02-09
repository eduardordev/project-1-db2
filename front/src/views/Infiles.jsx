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
import InfileResume from "./infileResume";
import InfileUpdate from "./infileUpdate";
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


class Infiles extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            openModal: false,
            openModalUpdate: false,
            openModalName: false,
            openModalNit: false,
            product: null,
            nit: 0,
            name: '',
            prodSelected: 0,
            products: [],
            prodsToSend: [],
            productsinDetail: [],
            quantitys: [],
            quantity: 0,
            sum: '0.00',
            infiles: [],
            infile: null,
            isUpdate: false,
            isReview: false,
            nitUpdate: '',
            nameUpdate: '',
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

    toggleModalUpdate = () => {
        this.setState({
            openModalUpdate: !this.state.openModalUpdate,
        });
    };

    toggleModalName = () => {
        this.setState({
            openModalName: !this.state.openModalName,
        });
    };

    toggleModalNit = () => {
        this.setState({
            openModalNit: !this.state.openModalNit,
        });
    };

    getInfileById = (prodId) => {
        this.toggleLoading();
        axios
            .get(this.infileURL + `/infile/get_infile_by_id/?id=${prodId}`, {
                headers: {
                    Authorization: "Token " + this.userToken,
                },
            })
            .then(
                function (response) {
                    this.setState({
                        infile: response.data.map((index) => {
                            return {
                                id: index.id,
                                nit: index.nit,
                                name: index.name,
                                date: index.date,
                                total: index.total,
                                detail: index.infile_detail
                            }
                        })
                    })
                    console.log(this.state.infile)
                    this.toggleLoading();
                    if (this.state.isUpdate === true && this.state.isReview === false) {
                        this.toggleModalUpdate()
                    } else if (this.state.isUpdate === false && this.state.isReview === true) {
                        this.toggleModal()
                    }

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
                    window.reload();
                    this.componentDidMount();
                }.bind(this)
            )
            .catch(
                function (error) {
                    this.handleError(error, "Error al crear factura!");
                }.bind(this)
            );
    };

    deleteInfile = (id) => {
        this.toggleLoading();
        axios.delete(
            this.infileURL + '/infile/' + id + '/',
            { headers: { "Authorization": "Token " + this.userToken } }
        ).then(function () {
            this.notify("tr", "success", "Infile Removed!");

            this.componentDidMount();
            window.reload();

        }.bind(this)).catch(function (error) {
            this.handleError(error, "delete infile")
        }.bind(this));
    }

    updateInfile = () => {
        this.toggleLoading();
        const formData = new FormData();
        formData.append("nit", this.state.nitUpdate);
        formData.append("name", this.state.nameUpdate);
        axios.post(
            this.infileURL + '/infile/update_infile/', formData,
            { headers: { "Authorization": "Token " + this.userToken } }
        ).then(function () {
            this.notify("tr", "success", "Factura Actualizada!");

            this.componentDidMount();
            window.reload();

        }.bind(this)).catch(function (error) {
            this.handleError(error, "update infile")
        }.bind(this));
    }



    _typesLoaded = false;
    getInfiles = () => {
        this.toggleLoading();
        axios
            .get(this.infileURL + "/infile/get_infiles/", {
                headers: {
                    Authorization: "Token " + this.userToken,
                },
            })
            .then(
                function (response) {
                    this._typesLoaded = true;
                    this._isMounted &&
                        this.setState({
                            infiles: response.data.map((index) => {
                                return {
                                    id: index.id,
                                    nit: index.nit,
                                    name: index.name,
                                    date: index.date,
                                    total: index.total,
                                    actions:
                                        <>

                                            <Row style={{ maxWidth: "80%" }}>

                                                <>
                                                    <Col xs={4}>
                                                        <Button
                                                            color="info"
                                                            size="sm"
                                                            className="btn-icon btn-link"

                                                            onClick={() => {

                                                                this.setState({
                                                                    isUpdate: true,
                                                                    isReview: false
                                                                })
                                                                this.getInfileById(index.id)
                                                            }}
                                                        >
                                                            <i className="fa fa-edit" />
                                                        </Button>
                                                    </Col>

                                                    <Col xs={4}>

                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            className="btn-icon btn-link"
                                                            type={"button"}
                                                            onClick={() => {
                                                                this.setState({
                                                                    isUpdate: false,
                                                                    isReview: true
                                                                })
                                                                this.getInfileById(index.id)

                                                            }}
                                                        >
                                                            <i className="fa fa-search" />
                                                        </Button>

                                                    </Col>
                                                    <Col xs={4}>

                                                        <Button
                                                            color="danger"
                                                            size="sm"
                                                            className="btn-icon btn-link"
                                                            onClick={() => {
                                                                this.deleteInfile(index.id)
                                                            }}


                                                        >
                                                            <i className="fa fa-times" />
                                                        </Button>

                                                    </Col>
                                                </>


                                            </Row>
                                        </>
                                };
                            }),
                        });
                    this.toggleLoading()

                }.bind(this)
            )
            .catch(
                function (error) {
                    this.toggleLoading();
                    this.handleError(error, "Infiles");
                }.bind(this)
            );
    };


    componentDidMount() {
        this._isMounted = true;
        this.getInfiles();


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

    toggleEditModalUpdate = (id) => {
        this.setState({
            editModalUpdate: !this.state.editModalUpdate,
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
                <br />
                <Modal
                    isOpen={this.state.openModalUpdate}
                    toggle={this.toggleModalUpdate}
                    modalClassName={this.checkPageMode().mc}
                    size={"lg"}
                    style={{ margin: "1vh auto 0px" }}
                >
                    <ModalBody >
                        <Col>
                            <InfileUpdate data={this.state.infile} openModalName={this.toggleModalName} openModalNit={this.toggleModalNit} updateInfile={this.updateInfile}></InfileUpdate>
                        </Col>

                        <ModalFooter>
                            <Button
                                color="info"
                                onClick={() => {
                                    this.toggleModalUpdate();

                                }}
                            >
                                Close
                            </Button>

                        </ModalFooter>
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={this.state.openModal}
                    toggle={this.toggleModal}
                    modalClassName={this.checkPageMode().mc}
                    size={"lg"}
                    style={{ margin: "1vh auto 0px" }}
                >
                    <ModalBody >
                        <Col>
                            <InfileResume data={this.state.infile}></InfileResume>
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

                        </ModalFooter>
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={this.state.openModalName}
                    toggle={this.toggleModalName}
                    modalClassName={this.checkPageMode().mc}
                    size={"lg"}
                    style={{ margin: "1vh auto 0px" }}
                >
                    <ModalBody >
                        <Col>
                            <FormGroup row>
                                <Label for="exampleEmail" className="text-primary" sm={6}>
                                    Actualizar Nombre:
                                    <Input
                                        type="number"
                                        onChange={(e) => {
                                            this.setState({ nameUpdate: e.target.value })
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
                                    this.toggleModalName();

                                }}
                            >
                                Close
                            </Button>

                            <Button
                                color="info"
                                onClick={() => {
                                    this.updateInfile();
                                    this.toggleModalName();

                                }}
                            >
                                Actualizar y Guardar
                            </Button>

                        </ModalFooter>
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={this.state.openModalNit}
                    toggle={this.toggleModalNit}
                    modalClassName={this.checkPageMode().mc}
                    size={"lg"}
                    style={{ margin: "1vh auto 0px" }}
                >
                    <ModalBody >
                        <Col>
                            <FormGroup row>
                                <Label for="exampleEmail" className="text-primary" sm={6}>
                                    Actualizar Nit:
                                    <Input
                                        type="number"
                                        onChange={(e) => {
                                            this.setState({ nitUpdate: e.target.value })
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
                                    this.toggleModalNit();

                                }}
                            >
                                Close
                            </Button>

                            <Button
                                color="info"
                                onClick={() => {
                                    this.updateInfile();
                                    this.toggleModalNit();

                                }}
                            >
                                Actualizar y Guardar
                            </Button>

                        </ModalFooter>
                    </ModalBody>
                </Modal>

                <Card>
                    <CardBody>
                        <Col>
                            <h2>LISTADO DE FACTURAS</h2>
                            <hr />
                        </Col>

                        <Col>
                            <Col>

                                <ReactTable
                                    responsive
                                    defaultPageSize={5}
                                    data={this.state.infiles}
                                    filterable
                                    style={{ textAlign: 'center' }}
                                    showPaginationTop
                                    showPaginationBottom={false}
                                    className="-striped -highlight primary-pagination"
                                    columns={[
                                        {
                                            Header: "Correlativo",
                                            accessor: "id",
                                            sortable: true,
                                            filterMethod: (filter, row) =>
                                                matchSorter(row, filter.value, {
                                                    keys: ["id"],
                                                }),
                                            filterAll: true,
                                            width: 150,

                                        },
                                        {
                                            Header: "Nombre",
                                            accessor: "name",
                                            sortable: true,
                                            filterMethod: (filter, row) =>
                                                matchSorter(row, filter.value, {
                                                    keys: ["name"],
                                                }),
                                            filterAll: true,


                                        },
                                        {
                                            Header: "NIT",
                                            accessor: "nit",
                                            sortable: true,
                                            filterMethod: (filter, row) =>
                                                matchSorter(row, filter.value, {
                                                    keys: ["nit"],
                                                }),
                                            filterAll: true,


                                        },
                                        {
                                            Header: "Monto Total",
                                            accessor: "total",
                                            sortable: true,
                                            filterMethod: (filter, row) =>
                                                matchSorter(row, filter.value, {
                                                    keys: ["total"],
                                                }),
                                            filterAll: true,


                                        },
                                        {
                                            Header: "Fecha",
                                            accessor: "date",
                                            sortable: true,
                                            filterMethod: (filter, row) =>
                                                matchSorter(row, filter.value, {
                                                    keys: ["date"],
                                                }),
                                            filterAll: true,


                                        },
                                        {
                                            Header: "ACTION",
                                            accessor: "actions",
                                            sortable: false,
                                            filterable: false,
                                            width: 150
                                        }




                                    ]}
                                />
                                <br />


                            </Col>
                        </Col>
                    </CardBody>
                </Card>


            </div>
        );
    }
}
export default Infiles;
