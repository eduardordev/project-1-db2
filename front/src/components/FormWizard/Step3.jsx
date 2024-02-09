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
import style from './step3.module.css';

// reactstrap components
import {
	Row,
	Col,
	Table
} from "reactstrap";

/*const header = [
	{
		Header: "ID",
		accessor: "id",
	},
	{
		Header: "Color",
		accessor: "name",
		sortable: false,
		filterable: false
	},

]*/

class Step3 extends React.Component {
	userToken = localStorage.getItem('userToken') || '';
	Access = JSON.parse(localStorage.getItem('Access') || '{}');
	Role = localStorage.getItem('role') || '';
	costingURL = process.env.REACT_APP_IP;


	constructor() {
		super();
		this.state = {
			colors: [],
			consumptions: []
		}
	}
	getBomsHeaders = (headerId) => {
		axios.get(
			process.env.REACT_APP_IP +`/bom_header/get_colors_for_bom/?bom=${headerId}`,
			{
				headers: { "Authorization": "Token " + this.userToken }
			}
		).then(function (response) {
			this._loadedBomsHeaders = true;
			this.setState({
				colors: response.data.colors
			})
			this.setState({
				consumptions: response.data.summation_consumptions_dict
			})


			this.showHeaderInfo(headerId);
			//console.log(this.state.tableHeaders)
			//this.toggleLoading();
		}.bind(this)).catch(function (error) {
			//this.handleError(error,'error loading info');
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
      this.notify("tr", "warning", errors);
    }
  }

	componentDidMount() {
		this._isMounted = true;
		//if (this.props.location.state) {
		this.getBomsHeaders(
			this.props.id
			//this.props.location.state.bomHeader
		);
		//this.showHeaderInfo(this.props.location.state.bomHeader);
		// }
	}

	render() {
		
		return (
			<>
			
				<Row className="justify-content-center mt-5">
					<Col md="12" className={style.colRight}>
						<Table striped>
							<thead>
								<tr>
									<th style={{ textAlign: 'center' }}>Color</th>
									<th>ID</th>
								</tr>
							</thead>
							<tbody style={{ height: '230px', overflowX: 'auto', overflowY: 'auto' }}>
								{this.state.colors.map((color, key) => (
									<tr>
										<td className={style.tdFont} style={{ textAlign: 'center' }}>{color}</td>

										<td className={style.tdFont}>{this.state.consumptions[color]? this.state.consumptions[color].toFixed(3):this.state.consumptions[color]}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</>
		);
	}
}

export default Step3;