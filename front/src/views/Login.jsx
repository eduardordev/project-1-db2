import React from "react";
import classnames from "classnames";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import './login.css'
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Form,
    Container,
    Col,
    Row,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Email: "",
            focusEmail: false,
            Password: "",
            focusPassword: false,
            _LoggedIn: false,
            _RecoverPass: false,
        }
    }

    notify = (place, type, msg) => {
        let options = {};
        options = {
            place: place,
            message: (<div>
                <div>{msg}</div>
            </div>),
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };

        let notificationContainer = document
            .getElementsByClassName("react-notification-alert-container");
        if (notificationContainer[0].innerHTML === "<div></div>") {
            this.refs.notificationAlert.notificationAlert(options);
        }
    };

    componentDidMount() {
        document.body.classList.toggle("login-page");
    }
    componentWillUnmount() {
        document.body.classList.toggle("login-page");
    }

    handleEmailChange = (event) => {
        const value = event.target.value;
        this.setState({ Email: value });
    }

    handlePasswordChange = (event) => {
        const value = event.target.value;
        this.setState({ Password: value });
    }

    SignInUser = async (email, password) => {
        return await axios.post(
            'http://127.0.0.1:8000/signin/',
            {
                "email": email,
                "password": password
            },
            { "Content-Type": "application/json" }
        );
    }

    handleAuthentication = (event) => {
        event.preventDefault();
        this.SignInUser(this.state.Email, this.state.Password)
            .then(response => {
                console.log("id", response.data.id);
                localStorage.setItem('_id', response.data.id);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                this.setState({ _LoggedIn: true }, () => {
                    console.log(this.state._LoggedIn)
                    this.props.history.push("/admin/home");
                });
            })
            .catch(error => {
                let errorMessage = '';
                if (error.response !== undefined) {
                    for (let [key, value] of Object.entries(error.response.data)) {
                        errorMessage += `${key}: ${value}\t`;
                    }
                } else {
                    errorMessage = error.message;
                }
                this.notify("tr", "warning", errorMessage);
            });
    }

    _homeRedirect = <Redirect to={{ pathname: "/admin/home" }} />

    render() {
        return (<>
            <div className="react-notification-alert-container">
                <NotificationAlert ref="notificationAlert" />
            </div>
            {this.state._LoggedIn ? this._homeRedirect : ''}
            <div className="content">
                <Container>
                    <Col className="ml-auto mr-auto" lg="4" md="6">
                        <Form className="form" onSubmit={e => this.handleAuthentication(e)}>
                            <Card className="card-login">
                                <br />
                                    <CardTitle className="card-title-name">&nbsp;Facturas</CardTitle>
                                <CardBody>
                                    <InputGroup className={classnames({
                                        "input-group-focus": this.state.Emailfocus
                                    })}>
                                        <InputGroupAddon addonType="prepend" className="inputadd">
                                            <InputGroupText className="input-group-text">
                                                <i className="tim-icons icon-single-02"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            placeholder="Email"
                                            onFocus={e => this.setState({ Emailfocus: true })}
                                            onBlur={e => this.setState({ Emailfocus: false })}
                                            value={this.state.Email}
                                            onChange={e => this.handleEmailChange(e)}
                                            className="input"
                                        />
                                    </InputGroup>
                                    <InputGroup className={classnames({
                                        "input-group-focus": this.state.Passwordfocus
                                    })}>
                                        <InputGroupAddon addonType="prepend" className="inputadd">
                                            <InputGroupText className="input-group-text"><i id='iconl'  className="tim-icons icon-key-25"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            onFocus={e => this.setState({ Passwordfocus: true })}
                                            onBlur={e => this.setState({ Passwordfocus: false })}
                                            value={this.state.Password}
                                            onChange={e => this.handlePasswordChange(e)}
                                            className="input"
                                        />
                                    </InputGroup>
                                    <Button type="submit" id="buttonLogin">
                                        Log in
                                    </Button>
                                </CardBody>
                            </Card>
                        </Form>
                    </Col>
                </Container>
            </div>
        </>);
    }
}

export default Login;