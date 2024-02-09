import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Form,
    Container,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    FormGroup
} from "reactstrap";
import classnames from "classnames";
import {Redirect,Link} from "react-router-dom";
//import axios from "axios";
import NotificationAlert from "react-notification-alert";
import '../components/QuotationElements/loader.min.css'
import Axios from 'axios';
import './login.css'

export default class RecoverPassword extends React.Component{
    /**
     * 1 recover password
     * 2 confirm token
     * 3 reset password
     */

    constructor(props) {
        super(props)
        this.state = {
            Email: "",
            focusEmail: false,
            _LoggedIn: false,
            loading: false,
            codigo: '',
            newPassword: '',
            newPassword2: '',
            step: 1 
        }
    }

    userToken = localStorage.getItem('userToken') || '';
    _homeRedirect = <Redirect to={{pathname: "/admin/home"}}/>
    _isMounted=false;
    
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
        if (notificationContainer[0].innerHTML === "<div></div>") {
            this._isMounted && this.refs.notificationAlert.notificationAlert(options);
        }
    };

    handleRecoverPassword = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        let emailData=new FormData();
        emailData.append("email",this.state.Email)
        Axios.post(
            process.env.REACT_APP_IP+'/forgotpassword',
            emailData
        ).then(function(response){
            this.notify("tr", "success", response.data.message);
            this._isMounted && this.setState({
                loading: false,
                step: 2
            })
        }.bind(this)).catch(function(){
            this.notify("tr", "warning", "Error: no se pudo enviar la solicitud");
            this._isMounted && this.setState({
                loading: false,
                step: 1,
                Email: ""
            })
        }.bind(this));
    }

    confirmCode=(e)=>{
        e.preventDefault();
        this.setState({
            loading: true
        });
        let emailData=new FormData();
        emailData.append("email",this.state.Email);
        emailData.append("token",this.state.codigo);
        Axios.post(
            process.env.REACT_APP_IP+'/confirmtoken',
            emailData
        ).then(function(){
            this.notify("tr", "success", "Codigo confirmado");
            this._isMounted && this.setState({
                loading: false,
                step: 3
            })
        }.bind(this)).catch(function(){
            this.notify("tr", "warning", "Error: No se pudo verificar el codigo");
            this._isMounted && this.setState({
                loading: false,
                step: 1,
                Email: "",
                codigo: ""
            })
        }.bind(this));
    }

    resetPassword=(e)=>{
        e.preventDefault();
        this.setState({
            loading: true
        });
        if(this.state.newPassword===this.state.newPassword2){
            let emailData=new FormData();
            emailData.append("user_identification",this.state.Email);
            emailData.append("user_new_token",this.state.newPassword);
            Axios.post(
                process.env.REACT_APP_IP+'/resetPassword',
                emailData
            ).then(function(){
                this.notify("tr", "success", "Contraseña cambiada");
                this._isMounted && this.setState({
                    loading: false,
                    step: 1,
                    Email: "",
                    codigo: "",
                    newPassword:'',
                    newPassword2:''
                })
            }.bind(this)).catch(function(){
                this.notify("tr", "warning", "Error: No se pudo reiniciar la contraseña");
                this._isMounted && this.setState({
                    loading: false,
                    step: 1,
                    Email: "",
                    codigo: "",
                    newPassword:'',
                    newPassword2:''
                })
            }.bind(this));
        }else{
            this.notify("tr", "warning", "Error: Las contraseñas no coinciden");
        }
    }

    checkPageMode = () => {
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

    componentDidMount(){
        this._isMounted=true;
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    render() {
        const pageMode=this.checkPageMode();
        let inverted = pageMode.bg==="bg-ligh" ? 'inverted' : '';
        return (<>
            <div className="blackdiv" id="blackdiv" style={{display:this.state.loading?'':'none'}}>
              <div className="ui segment">
                <div className={`ui active transition ${inverted} visible dimmer`}>
                  <div className="content"><div className="ui text loader">Loading</div></div>
                </div>
                <div style={{minHeight:400}}><p>&nbsp;</p></div>
              </div>
            </div>
            {this.state._LoggedIn ? this._homeRedirect : ''}
            <div className="content">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert"/>
                </div>
                <Container>
                    <Col className="ml-auto mr-auto" lg="4" md="6">
                        <Form className="form" onSubmit={e=>e.preventDefault()}>
                            <Card className="card-login">
                                <CardHeader className="card-header">
                                    <CardTitle tag="h1" className="card-title">Recupera tu Contraseña</CardTitle>
                                </CardHeader>
                                {this.state.step===1?<CardBody>
                                    <Label>Ingresa tu correo electronico</Label>
                                    <InputGroup className={classnames({
                                        "input-group-focus": this.state.Emailfocus
                                    })}>
                                        <InputGroupAddon addonType="prepend" className="inputadd">
                                            <InputGroupText className="input-group-text"><i className="tim-icons icon-single-02"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            placeholder="Email"
                                            onFocus={e => this.setState({ Emailfocus: true })}
                                            onBlur={e => this.setState({ Emailfocus: false })}
                                            value={this.state.Email}
                                            onChange={e => this.setState({
                                                Email: e.target.value
                                            })}
                                            className="input"
                                        />
                                    </InputGroup>
                                    <Label>
                                        Un correo electronico sera enviado a tu bandeja con un numero. Ingresa este numero en la siguiente pantalla
                                    </Label>
                                    <Button type="button" id="buttonLogin" onClick={e => this.handleRecoverPassword(e)}>
                                        Enviar
                                    </Button>
                                </CardBody>:<></>}
                                {this.state.step===2?<CardBody>
                                    <Label>Ingresa el codigo enviado a tu corrreo</Label>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            placeholder="Codigo"
                                            value={this.state.codigo}
                                            onChange={e => this.setState({
                                                codigo: e.target.value
                                            })}
                                        />
                                    </FormGroup>
                                    <Button type="button" id="buttonLogin" onClick={e=>this.confirmCode(e)}>
                                        Confirmar
                                    </Button>
                                </CardBody>:<></>}
                                {this.state.step===3?<CardBody>
                                    <h4>Ingresa el nuevo password</h4>
                                    <FormGroup>
                                        <Label>Ingresa tu Contraseña</Label>
                                        <Input
                                            type="password"
                                            placeholder="Contraseña"
                                            value={this.state.newPassword}
                                            onChange={e => this.setState({
                                                newPassword: e.target.value
                                            })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Ingresa nuevamente tu Contraseña</Label>
                                        <Input
                                            type="password"
                                            placeholder="Contraseña"
                                            value={this.state.newPassword2}
                                            onChange={e => this.setState({
                                                newPassword2: e.target.value
                                            })}
                                        />
                                    </FormGroup>
                                    <Button type="button" id="buttonLogin" onClick={e=>this.resetPassword(e)}>
                                        Confirmar
                                    </Button>
                                </CardBody>:<></>}
                            </Card>
                            <Link to='/auth/login' className="forgot">Ingresar</Link>
                        </Form>
                    </Col>
                </Container>
            </div>
        </>);
    }
} 