import React from "react";
import {Redirect,Switch} from "react-router-dom";
import '../components/QuotationElements/loader.min.css';

class CustomRouter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      data: {}
    }
  }

  componentDidMount(){
    if (
      this.props.location.state.from !== undefined &&
      this.props.location.state.to !== undefined
    ) {
      this.setState({
        from: this.props.location.state.from,
        to: this.props.location.state.to
      });
    } else {
      this.props.history.push("/auth/login");
    }
  }

  render(){
    return(<div className="ui segment">
      <div className="ui active transition visible dimmer">
        <div className="content"><div className="ui text loader">Loading</div></div>
      </div>
      <div style={{minHeight:400}}><p>&nbsp;</p></div>
      <Switch>
        <Redirect push 
          to={{
            pathname: this.state.to,
            state: {}
          }}
        />
      </Switch>
    </div>)
  }
}

export default CustomRouter;