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
import style from './step2.module.css';


// reactstrap components
import {
  Row,
  Col,
  Table,
} from "reactstrap";


class Step2 extends React.Component {
  constructor() {
    super()
    this.state = {
      materials: null,
      colors: null,
    }
  }
  userToken = localStorage.getItem('userToken') || '';
  Access = JSON.parse(localStorage.getItem('Access') || '{}');
  Role = localStorage.getItem('role') || '';
  costingURL = process.env.REACT_APP_IP;

  getBomsHeaders = (headerId) => {
    axios.get(
      process.env.REACT_APP_IP + `/bom_header/get_colors_for_bom/?bom=${headerId}`,
      {
        headers: { "Authorization": "Token " + this.userToken }
      }
    ).then(function (response) {
      this._loadedBomsHeaders = true;
      this.setState({ colors: [response.data.colors] });
      this.setState({ materials: [response.data.materials_with_different_consumption] });
    }.bind(this)).catch(function (error) {
    })

  }

  componentDidMount() {
    //this._isMounted = true;
    //if (this.props.location.state) {
    this.getBomsHeaders(
      this.props.id

    );
    //this.showHeaderInfo(this.props.location.state.bomHeader);
    // }
  }

  render() {
    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col sm="12" >
            {
              this.state.materials &&
              <div className="col-lg-12  bg-white rounded shadow">
                <div className={style.colRight}>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Materials</th>
                        {this.state.colors[0].map(value => {
                          return (
                            <th>{value}</th>
                          )
                        })
                        }
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.materials[0].map(value => {
                        return (
                          <tr>
                            <th scope="row" className={style.tdFont}>
                              <tr>{value.old_costing_id} </tr>
                               {value.description}</th>
                            {value.consumptions.map(consume => {
                              return (
                                <td>{consume}</td>
                              )
                            })
                            }
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
export default Step2;