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
import React from "react";
import axios from 'axios';
import style from './step1.module.css';
// reactstrap components
import {
  Row,
  Col,
  Table,
} from "reactstrap";

class Step1 extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      materials: null,
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

  handleError = (error,task='unknown') => {
    let response = error.response?error.response:{};
    let message = error.message?error.message:'';
    //console.log(response,message,task)
    if (response.status!==undefined && response.status === 401) {
      this.logOut();
    } else {
      let errors = "";
      if (response.data !== undefined) {
        for (let [key, value] of Object.entries(response.data)) {
          errors += `${key}: ${value}\t`;
        }
      } else {
        errors=message;
      }
      //this.notify("tr", "warning", errors);
    }
  }
 
  getBomsHeaders = (headerId) => {
    this.toggleLoading()
    axios.get(
      process.env.REACT_APP_IP  + `/bom_header/get_colors_for_bom/?bom=${headerId}`,
      {
        headers: { "Authorization": "Token " + this.userToken } 
      }
    ).then(function (response) {
      this._loadedBomsHeaders = true;
      //console.log('Response ', response.data.materials_with_same_consumption)
      this.setState({materials: [response.data.materials_with_same_consumption]})
      //console.log("aaa",this.state.materials)
      this.toggleLoading()
    }.bind(this)).catch(function (error) {
      this.handleError(error,'costing History');
    }.bind(this))
    
  }
 
  componentDidMount() {
    this._isMounted = true;
    //if (this.props.location.state) {
    this.getBomsHeaders(
      this.props.id
      
    );
    //this.showHeaderInfo(this.props.location.state.bomHeader);
    //}
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

  render() {

    const {
      loading
    } = this.state;
    const pageMode = this.checkPageMode();

    let inverted = pageMode.bg === "bg-ligh" ? 'inverted' : '';
    return (
      <>
      <div className="blackdiv" id="blackdiv" style={loading ? { display: '' } : { display: 'none' }}>
        <div className="ui segment">
          <div className={`ui active transition ${inverted} visible dimmer`}>
            <div className="content"><div className="ui text loader">Loading</div></div>
          </div>
          <div style={{ minHeight: 400 }}><p>&nbsp;</p></div>
        </div>
      </div>
        <Row className="justify-content-center mt-5">
          <Col sm="12">
            {

              this.state.materials && 
              <div className="col-lg-12  bg-white rounded shadow">
              <div className={style.colRight}>
              <Table striped >
                <thead>
                  <tr>
                    <th className={style.thID}>Id</th>
                    <th className={style.thDESC}>Description</th>
                    <th className={style.tdWidth}>Measure</th>
                    <th className={style.tdWidth}>Consumptions</th>
                  </tr>
                </thead>
                <tbody>

                {this.state.materials[0].map(value => {
                  
                  return (
                    <tr>
                      <th className={style.id} scope="row" >{value.old_costing_id}</th>
                      <td className={style.tdDESC}>{value.description}</td>
                      <td className={style.tdFont} >{value.measure}</td>
                      <td className={style.tdFont}>{value.consumptions}</td>
                    </tr>
                  )
                })
                }
                </tbody>
              </Table>
              </div>
              </div>
            }
        </Col>
        </Row>
      </>
    );
  }
}
export default Step1;