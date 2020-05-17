import React, { Component } from "react";
import { Select, Container, Header } from "semantic-ui-react"
import PreferenceGrid from "./PreferenceGrid";
import Introduction from "./Introduction";
import SelectionGrid from "./SelectionGrid";
import _ from "lodash"

const numberOfApplicants = [
  { key: 'app3', value: '3', text: '3' },
  { key: 'app4', value: '4', text: '4' },
  { key: 'app5', value: '5', text: '5' },
]

class myGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      numApplicants: 0,
      companies: [],
      applicants: [],
      showSelectionGrid: false,
      companyPreferences: [],
      applicantPreferences: [],
    }
  }

  onNumChange = (e, option) => {
    this.setState({showSelectionGrid: false})
    setTimeout(() => this.setState({showSelectionGrid: true}), 1);
    let companies = [];
    companies.push({
      name: "fb",
      image: "https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
    });
    companies.push({
      name:"amazon",
      image: "https://www.vmastoryboard.com/wp-content/uploads/2014/08/Amazon-Logo_Feature.jpg"
    });
    companies.push({
      name: "netflix",
      image: "https://media.netflix.com/dist/img/meta-image-netflix-symbol-black.png"
    })
          
    let applicants = [];
    applicants.push({
      name: "mcgill",
      image:"https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/1200px-McGill_University_CoA.svg.png"
    })
    applicants.push({
      name: "harvard",
      image:      "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png"
    })
    applicants.push({
      name: "mit",
      image: "https://i.pinimg.com/originals/b8/4f/0c/b84f0cfdee91f36c170a5e33bbc0ae66.jpg"
    })
      
    if(option.value >= 4) {
      companies.push({
        name: "google",
        image: "https://blog.hubspot.com/hubfs/image8-2.jpg"
      });
      applicants.push({
        name: "berkley",
        image: "https://i.pinimg.com/originals/26/56/83/265683f868aec8ad744e65708ab063a7.jpg"
      });
    }
    if(option.value >= 5) {
      companies.push({
        name: "microsoft",
        image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2qVsJ?ver=3f74"
      });
      applicants.push({
        name: "uoft",
        image: "https://pbs.twimg.com/profile_images/1014942894778650626/NyjWU7Fp_400x400.jpg"
      });
    }
    let companyPreferences = this.shuffle(companies, applicants);
    let applicantPreferences = this.shuffle(applicants, companies);
    this.setState({companies: companies, numApplicants: option.value, applicants: applicants,
                  companyPreferences: companyPreferences, applicantPreferences: applicantPreferences});
  }

  shuffle = (choser, chosen) => {
    let grid = new Array(choser.length);
    for(let k = 0; k < choser.length; k++) {
        //Fisher–Yates shuffle :O
      for (let i = chosen.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
      }
      let temp = [];
      for(let i = 0; i < chosen.length; i++) {
        temp.push(_.cloneDeep(chosen[i].name));
      }
      let obj = {
        'choser': choser[k].name,
        'choice': temp
      }
      grid[k] = obj;
    }
    return grid;
  }

  onSubmit = (selections) => {
    let offers = new Array(this.state.numApplicants);
    let copyAppPref = _.cloneDeep(this.state.applicantPreferences);
    let copyCompPref = _.cloneDeep(this.state.companyPreferences);
    for(let i = 0; i < this.state.applicants.length; i++) {
      offers[i] = new Array(2);
      offers[i][0] = this.state.applicants[i].name;
    }
    //while there is a free applicant
    while(offers.some(offer => offer[1] === undefined)) {
      //get first free applicant with no offer
      const firstApplicant = offers.find(offer => offer[1] === undefined);
      //get the applicants preferences
      const setOfChoices = copyAppPref.find(listing => listing.choser === firstApplicant[0]).choice;
      //get first one applcant hasn't proposed to yet
      const firstChoiceCompany = setOfChoices.find(company => company !== undefined);
      //mark it as proposed
      setOfChoices[setOfChoices.indexOf(firstChoiceCompany)] = undefined;
      //if the company hasn't been assigned to anyone else, applican can get it
      const previousPairing = offers.find(offer => offer[1] === firstChoiceCompany)
      if(previousPairing === undefined) {
        firstApplicant[1] = firstChoiceCompany;
      } else {
        //company already taken by someone else
        const companyChoices = copyCompPref.find(listing => listing.choser === firstChoiceCompany).choice;
        let scoreOfPrevPair = companyChoices.findIndex(el => el === previousPairing[0]);
        let currentScore = companyChoices.findIndex(el => el === firstApplicant[0]);
        if(scoreOfPrevPair > currentScore) {
          previousPairing[1] = undefined;
          firstApplicant[1] = firstChoiceCompany;
        }
      }
    }
    for(let i = 0; i < selections.length; i++) {
      //find one that matched index 0
      let sameApplicant = offers.find(offer => offer[0] === selections[i][0]);
      if(sameApplicant[1] !== selections[i][1]) {
        return false;
      }
    }
    return true;
  }
  
  render() {
    return (
      <Container>
        <Introduction/>
        <Select placeholder='Select the number of applicants' options={numberOfApplicants} onChange = {this.onNumChange}/>      
        {this.state.showSelectionGrid ? 
          <PreferenceGrid numApplicants = {this.state.numApplicants}
                          companies = {this.state.companies} 
                          applicants = {this.state.applicants} 
                          companyPreferences = {this.state.companyPreferences}
                          applicantPreferences = {this.state.applicantPreferences} />
        : null}
        {this.state.numApplicants > 0 && this.state.showSelectionGrid ? 
          <Header as='h4' icon textAlign='center'>
              <Header.Content>
                Fill in the grid and press on submit to verify your answer!
              </Header.Content>
          </Header> : null}
        {this.state.showSelectionGrid ? 
          <SelectionGrid  numApplicants = {this.state.numApplicants}
                          companies = {this.state.companies} 
                          applicants = {this.state.applicants}
                          onSubmit = {this.onSubmit}  />
        : null}
      </Container>
    );
  }
}

export default myGrid;