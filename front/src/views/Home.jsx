/*

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  Row
} from "reactstrap";

import prod from '../assets/img/prod.svg'
import './home.css'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initials: ''
    };
  }

  user_name = localStorage.getItem('username');
  user_email = localStorage.getItem('email');

  componentDidMount() {

    console.log(this.user_email, this.user_name, "home")

    if (this.user_name !== '') {
      const name = this.user_name.split(' ');
      const uname = name[0];
      const first = name[0].split('')[0];
      const second = name[1].split('')[0];
      this.setState({
        initials: first+second,
        name: uname
      })
      
    } else if (this.user_name === '' || this.user_name === null || this.user_name === undefined || this.user_name === ' '){
      const name = []
      const uname = name
      const first = name
      const second = name
      this.setState({
        initials: first+second,
        name: uname
      })
    }
  }

  render() {
    const { activeColor } = this.props;
    return (
      <>
        <div className="content">
          <Card>
            <CardBody>
              <CardHeader className="headerHome">
                <CardTitle>
                  <h1 className="titleHome">FACTURAS</h1>
                </CardTitle>
              </CardHeader>
              <hr />
              <Row className="row1">
                <Label>
                  <div className="labelImg" data ={activeColor}>{this.state.initials}</div>
                </Label>
                <Label>
                  <div className="salute">Hi, {this.user_name}</div>
                  <div className="sub">Email: {this.user_email}</div>
                 
                  <br />
                  <div>
                    <img src={prod} alt="" className="prodimg" />
                  </div>
                  <br />
                  <div className="sub">Have a productive day {this.state.name}!</div>
                </Label>
              </Row>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

export default Home;
