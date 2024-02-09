import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Button
} from "reactstrap";

const QuoteTab = (props) => {
  return <Card className="card-primary">
    <CardHeader role="tab">
      <a style={{borderBottom: '1px solid grey'}}
        aria-expanded={props.isOpen}
        href={"#"+props.collapse}
        data-parent="#accordion"
        data-toggle="collapse"
        onClick={(e) => {
          e.preventDefault();
          props.collapsesToggle(props.collapse)
        }}
      >
        {props.title}
        <i className="tim-icons icon-minimal-down" />
      </a>
    </CardHeader>
    <Collapse
      role="tabpanel"
      isOpen={props.isOpen}
    >
      <CardBody>
        {props.children}
      </CardBody>
    </Collapse>
  </Card>
}

class QuotationTabs extends React.Component {
  _isMounted=false

  constructor(props) {
    super(props);
    this.state = {
      openedCollapses: [],
    }
  }

  assembleCollapses = () => this.setState({
    openedCollapses: this.props.tabs.map(tabCollapse => {return tabCollapse.collapse})
  }) 

  componentDidMount(){
    this._isMounted=true;
    this.assembleCollapses();  
  }

  componentWillUnmount(){
    this._isMounted=false;
  }

  collapsesToggle = collapse => {
    let {openedCollapses} = this.state;
    if (openedCollapses.includes(collapse)) {
      this._isMounted && this.setState({
        openedCollapses: [ ...this.state.openedCollapses.filter(item => item !== collapse)]
      });
    } else {
      this._isMounted && this.setState({
        openedCollapses: [ ...this.state.openedCollapses, collapse ]
      });
    }
  }

  Expand = () => {
    this.assembleCollapses()
  }

  Reduce = () => {
    this.setState({
      openedCollapses: []
    });
  }

  render(){
    if(!this.props.tabs){
      return null;
    }
    let {openedCollapses} = this.state;
    return <>
      <div style={{maxWidth:"20rem"}}>
        <Button className="btn-simple" color="info"
          onClick={this.Expand}
        >
          <i className="tim-icons icon-simple-add" /> Expand
        </Button>
        <Button className="btn-simple" color="info"
          onClick={this.Reduce}
        >
          <i className="tim-icons icon-simple-delete" /> Reduce
        </Button>
      </div>
      <div aria-multiselectable={true}
        className="card-collapse"
        id="accordion" role="tablist"
      >
        {this.props.tabs.map(tab => {
          //console.log(tab)
          return <QuoteTab key={tab.collapse}
            collapse={tab.collapse} 
            title={tab.title}
            collapsesToggle={this.collapsesToggle}
            isOpen={openedCollapses.includes(tab.collapse)}
          >
            {tab.component}
          </QuoteTab>;
        })}
      </div>
    </>
  }
}

export default QuotationTabs