import React from "react";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { Bar } from 'react-chartjs-2';

import { 
  Nav, 
  NavItem, 
  NavLink, 
  Card, 
  CardHeader, 
  CardBody, 
  TabPane, 
  TabContent,
  Button,
} from 'reactstrap';

export default class Reports extends React.Component {
  userToken = localStorage.getItem('userToken') || '';
  Access = JSON.parse(localStorage.getItem('permissions') || '{}');
  _loadingCostingPerClient = false;
  _loadingProfitPerClient = false;
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      CostingPerClient: null,
      ProfitPerClient: null,
      activeTab: '1',
    }
  }
  
  notify = (place, type, msg) => {
    let options = {};
    options = {
      place: place,
      message: ( <div><div>{msg}</div></div> ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 5
    };    
    let notificationContainer = document
      .getElementsByClassName("react-notification-alert-container");
    // If the container child element is not clear then don't 
    // push any other notification.
    if (notificationContainer[0].innerHTML === "<div></div>") {
      this._isMounted && this.refs.notificationAlert.notificationAlert(options);
    }
  }

  componentDidMount(){
    this._isMounted=true;
    this.getCostingPerClient();
    this.getProfitPerClient();
  }

  componentWillUnmount(){
    this._isMounted=false;
    this._loadingCostingPerClient=false;
  }

  logOut = () => {
    this._isMounted=false;
    localStorage.clear();
    this.componentWillUnmount();
    this.props.history.push("/auth/login");
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

  getCostingPerClient = () => {
    axios.get(
      process.env.REACT_APP_IP + '/administration/get_costing_per_client/', 
      { headers:{
        "Authorization": "Token " + this.userToken
      } }
    ).then(function (response) {
      const clients = response.data.map(set => set.client);
      const totals = response.data.map(set => set.total);
      this._loadingCostingPerClient=true;
      const data = (canvas) => {
        var ctx = canvas.getContext("2d");
    
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#FFFFFF');
    
        var gradientFill = ctx.createLinearGradient(0, 500, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
        return {
          labels: clients,
          datasets: [{
            label: "Total Costsheets",
            borderColor: "#f96332",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#f96332",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: false,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: totals
          }]
        }
      };
      this._isMounted && this.setState({
        CostingPerClient: data
      });
    }.bind(this)).catch(function(error){
      this.handleError(error,'getCostingPerClient');
    }.bind(this));
  }
  
  getProfitPerClient = () => {
    axios.get(
      process.env.REACT_APP_IP + '/administration/get_profit_per_client/', 
      { headers:{
        "Authorization": "Token " + this.userToken
      } }
    ).then(function (response) {
      const clients = response.data.map(set => set.client);
      const avgs = response.data.map(set => set.avg.toFixed(2));
      this._loadingProfitPerClient=true;
      const data = (canvas) => {
        var ctx = canvas.getContext("2d");
    
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#FFFFFF');
    
        var gradientFill = ctx.createLinearGradient(0, 500, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
        return {
          labels: clients,
          datasets: [{
            label: "Profit per Client",
            borderColor: "#f96332",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#f96332",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: false,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: avgs
          }]
        }
      };
      this._isMounted && this.setState({
        ProfitPerClient: data
      });
    }.bind(this)).catch(function(error){
      this.handleError(error,'getCostingPerClient');
    }.bind(this));
  }

  options = {
    maintainAspectRatio: true,
    tooltips: {
      bodySpacing: 4,
      mode:"nearest",
      intersect: 0,
      position:"nearest",
      xPadding:10,
      yPadding:10,
      caretPadding:10
    },
    responsive: 1,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
  }
  
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
          activeTab: tab
      });
    }
  }

  render(){
    return (<div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref="notificationAlert" />
      </div>
      <Card className="card-plain">
        <CardHeader>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "1" ? "text-primary active border border-primary" : "text-primary"}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                CostSheets per Client
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "2" ? "text-primary active border border-primary" : "text-primary"}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Profit per Client
              </NavLink>
            </NavItem>
            <a href={`${process.env.REACT_APP_IP}/excel_resume_costing/`} target="_blank" rel="noopener noreferrer" download>
            <Button
            color='primary'
            className={"text-secondary"}
            >
            Download Data
            </Button>
            </a>
            
          </Nav>
        </CardHeader>

        


        <CardBody>
          <TabContent activeTab={this.state.activeTab} className="text-center">
            <TabPane tabId="1">
              {this._loadingCostingPerClient && 
                <Bar
                  data={this.state.CostingPerClient}
                  options={this.options}
                />
              }
            </TabPane>
            <TabPane tabId="2">              
              {this._loadingProfitPerClient && 
                <Bar
                  data={this.state.ProfitPerClient}
                  options={this.options}
                />
              }
            </TabPane>
          </TabContent>
        </CardBody>
            </Card>
    </div>)
  }
}