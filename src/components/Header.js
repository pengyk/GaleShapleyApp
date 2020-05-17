import React from 'react'
import { Header } from 'semantic-ui-react'
import logo from './../images/Logo.png'


const HeaderExamplePage = () => (
  <div style = {{textAlign:'center', backgroundColor: 'lightBlue'}}>
    <Header as='h2' icon textAlign='center'>
      <Header.Content>Test Your Gale Shapley Skills!</Header.Content>
    </Header>
    <img alt = "logo" style = {{borderRadius: "50%"}} src={logo} />
    <Header/>
  </div>
)

export default HeaderExamplePage