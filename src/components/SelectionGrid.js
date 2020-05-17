import React, { Component } from "react";
import equal from 'fast-deep-equal'
import { Grid, Image, Checkbox, Header, Segment, Button, Modal, Icon } from "semantic-ui-react"

class SelectionGrid extends Component {
    constructor(props){
      super(props);
      this.state = {
          map: new Map(),
          selections: [],
          checkBoxList: [],
          modalOpen: false,
          gotItRight: false,
          gotItWrong: false
      }
    }
      
    componentDidUpdate(prevProps) {
        if(!equal(this.props.numApplicants, prevProps.numApplicants)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            this.setState({map: new Map(), checkBoxList: [], selections: []})
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false, gotItRight: false, gotItWrong: false })  

    clickCheckbox = (e, value) => {  
        let map = this.state.map;
        if(value.checked) {
            if(map.has(value.applicant.name)) {
                map.set(value.applicant.name, map.get(value.applicant.name) + 1);
            } else {
                map.set(value.applicant.name, 1);
            }
            if(map.has(value.compagny.name)) {
                map.set(value.compagny.name, map.get(value.compagny.name) + 1);
            } else {
                map.set(value.compagny.name, 1);
            }
            let selections = this.state.selections;
            let arr = [value.applicant.name, value.compagny.name];
            selections.push(arr);
            this.setState({selections: selections});
        } else {
            map.set(value.applicant.name, map.get(value.applicant.name) - 1);
            map.set(value.compagny.name, map.get(value.compagny.name) - 1);
            let newSelections = this.state.selections.filter(arr => (arr[0] !== value.applicant.name || arr[1] !== value.compagny.name));
            this.setState({selections: newSelections});
        }
        this.setState({map: map});
    }

    isValid = () => {
        if(this.state.map.size !== 2*this.props.numApplicants) {
            return false;
        }
        for (let value of this.state.map.values()) {
            if(value !== 1) {
                return false;
            }
        }
        return true;
    }

    onSubmit = () => {
        if(!this.isValid()) {
            this.setState({ modalOpen: true })
        } else {
            //send api request idk how to do it yet
            let isCorrect = this.props.onSubmit(this.state.selections);
            if(isCorrect) {
                this.setState({gotItRight: true});
            } else {
                this.setState({gotItWrong: true});
            }
        }
    }

    render(){
        return(
            (this.props.numApplicants === 0 ) ?  null: 
            <div>
            <Grid columns='equal' style = {{marginTop: "10px"}} celled textAlign='center'>
                <Grid.Row>
                <Grid.Column/>
                {this.props.companies.map(company => {
                    return (
                    <Grid.Column key = {company.name}>
                        <Header>
                            <Image centered src={company.image} size = "large" circular/>
                        </Header>
                    </Grid.Column>
                    )
                })}
                </Grid.Row>
                {this.props.applicants.map(applicant => {
                return(
                    <Grid.Row key = {applicant.name}>
                    <Grid.Column>
                        <Header>
                            <Image centered src = {applicant.image} size = "large" circular/>
                        </Header>
                    </Grid.Column>
                    {this.props.companies.map(compagny => {
                        return (
                            <Grid.Column key = {compagny.name + applicant.name}>
                                <Checkbox   compagny = {compagny}
                                            applicant = {applicant}
                                            onClick = {this.clickCheckbox}/>
                            </Grid.Column>
                        )
                    })}
                    </Grid.Row>
                )
                })}
            </Grid>
            <Segment textAlign='center'>
                <Button positive 
                        onClick = {this.onSubmit}
                        >Submit</Button>   
            </Segment>
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
            >
                <Header icon='browser' content='Error' />
                <Modal.Content>
                <h3>Please make sure to select one per row and one per column</h3>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='checkmark' /> Got it
                </Button>
                </Modal.Actions>
            </Modal>
            <Modal
                open={this.state.gotItRight}
                onClose={this.handleClose}
                basic
                size='small'
            >
                <Header icon='browser' content='Yay!' />
                <Modal.Content>
                <h3>Congratulations! You got it right!</h3>
                </Modal.Content>
            </Modal>  
            <Modal
                open={this.state.gotItWrong}
                onClose={this.handleClose}
                basic
                size='small'
            >
                <Header icon='browser' content='Error' />
                <Modal.Content>
                <h3>:( Try again?</h3>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='checkmark' /> Got it
                </Button>
                </Modal.Actions>
            </Modal>        
                 
            </div>
        )
    }
}

export default SelectionGrid;