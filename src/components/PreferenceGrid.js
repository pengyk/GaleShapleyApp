import React, { Component } from "react";
import { Grid, Table, Segment, Divider, Header, Image, Label} from "semantic-ui-react"

class PreferenceGrid extends Component {
    constructor(props){
      super(props);
      this.state = {

      }
    }

    displayRandomRow = (applicantOrCompany, choices) => {
        if(applicantOrCompany === "applicant") {
            return(
                choices.map(choice => {
                    const imageSource = this.props.companies.find(company => company.name === choice).image;
                    return (
                        <Table.Cell>
                            <Header>
                                <Image centered src={imageSource} size = "small" circular/>
                            </Header>
                        </Table.Cell>
                    )
                })
            )
        } else {
            return(
                choices.map(choice => {
                    const imageSource = this.props.applicants.find(applicant => applicant.name === choice).image;
                    return (
                        <Table.Cell>
                            <Header>
                                <Image centered src={imageSource} size = "small" circular/>
                            </Header>
                        </Table.Cell>
                    )
                })
            )
        }
    }

    displayApplicants = (applicantOrCompany) => {
        if(applicantOrCompany === "applicant"){
            return(
                this.props.applicantPreferences.map(applicant => {
                    let imageSource = this.props.applicants.find(app => applicant.choser === app.name).image;
                    return (
                        <Table.Row>
                            <Table.Cell key = {applicant} active>
                                <Header>
                                    <Image src={imageSource} size = "large" circular/>
                                </Header>
                            </Table.Cell>
                            {this.displayRandomRow(applicantOrCompany, applicant.choice)}
                        </Table.Row>
                    )
                })
            )
        } else {
            return(
                this.props.companyPreferences.map(company => {
                    let imageSource = this.props.companies.find(comp => company.choser === comp.name).image;
                    return (
                        <Table.Row>
                            <Table.Cell key = {company} active>
                                <Header>
                                    <Image src={imageSource} size = "large" circular/>
                                </Header>
                            </Table.Cell>
                            {this.displayRandomRow(applicantOrCompany, company.choice)}
                        </Table.Row>
                    )
                })
            )
        }
    }

    render(){
        return(
            (this.props.numApplicants === 0 ) ?  null: 
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <Label>Preference from left to right: Students preferences</Label>
                        <Table celled columns='equal' textAlign='center'>
                            {this.displayApplicants("applicant")}
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>Preference from left to right: Companies preferences</Label>
                        <Table celled columns='equal' textAlign='center'>
                            {this.displayApplicants("companies")}
                        </Table>
                    </Grid.Column>
                </Grid>
                <Divider vertical/>
          </Segment>
        )
    }
}

export default PreferenceGrid;