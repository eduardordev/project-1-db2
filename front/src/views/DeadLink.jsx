import React from "react";

import { 
    Col,
    Card, 
    CardImg, 
    CardBody, 
    CardTitle, 
    CardText, 
    Button,
    Container
} from 'reactstrap';

class DeadLink extends React.Component {
    render() {
        return (
            <>
            <div className="content">
                <Container>
                    <Col className="ml-auto mr-auto" lg="4" md="6">
                        <Card style={{width: '20rem'}}>
                            <CardImg top src={require("../assets/img/dead-link.png")}/>
                            <CardBody>
                                <CardTitle>Este link no existe</CardTitle>
                                <CardText>
                                    Así como muchas cosas en la vida, este link no 
                                    existe, tal vez intentaste navegar y cometiste 
                                    un error.
                                </CardText>
                                <Button color="primary">Go somewhere</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Container>
            </div>
            </>
        )
    }
}

export default DeadLink;