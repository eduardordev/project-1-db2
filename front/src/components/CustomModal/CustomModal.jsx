import React, { Component } from "react";
import{ Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDemo: false,
            backdrop: true,
            Mode: "bg-dark",
        };
        this.toggleModalDemo = this.toggleModalDemo.bind(this);
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

    toggleModalDemo(){
        this.setState({
            modalDemo: !this.state.modalDemo
        });
    }

    render(){
        return (
            <>
                <Button color={this.props.buttonColor} onClick={this.toggleModalDemo}>
                    {this.props.buttonContent}
                </Button>
                <Modal 
                    isOpen={this.state.modalDemo}
                    toggle={this.toggleModalDemo}
                    className={this.props.className}
                    backdrop={this.state.backdrop}
                    contentClassName={this.checkPageMode().bg}
                >
                    <ModalHeader tag="h3" toggle={this.toggleModalDemo}>
                        <b className={this.checkPageMode().hc}>{this.props.title}</b>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.children}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModalDemo}>
                            Close
                        </Button>
                        <Button color="primary" onClick={this.props.primaryAction}>
                            {this.props.primaryText}
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default CustomModal;