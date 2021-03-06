/* eslint-disable */
import React, { Component } from 'react'
import PayrollContract from '../build/contracts/Payroll.json'
import getWeb3 from './utils/getWeb3'

// import Accounts from './components/Accounts'
import Employer from './components/Employer'
import Employee from './components/Employee'
// import Common from './components/Common'

import { Layout, Menu, Spin, Alert } from 'antd';

// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'

import 'antd/dist/antd.css';
import './App.css'
import MenuItem from 'antd/lib/menu/MenuItem';

const { Header, Content, Footer } = Layout

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 6,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const Payroll = contract(PayrollContract)
    Payroll.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on Payroll.
    var PayrollInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({
        accounts,
        account: accounts[0],
        mode: 'employer'
      })
      Payroll.deployed().then((instance) => {
        this.setState({
          payroll: instance
        })
      })
    })
  }

  onSelectTab = ({key}) => {
    this.setState({
      mode: key
    })
  }

  renderContent = () => {
    const { account, payroll, web3, mode } = this.state;

    if (!payroll) {
      return <Spin tip='still loading' />
    }

    switch(mode) {
      case 'employer':
        return <Employer account={account} payroll={payroll} web3={web3} />
      case 'employee':
        return <Employee account={account} payroll={payroll} web3={web3} />
      default:
        return <Alert message="choose mode" type="info" showIcon />
    }
  }

  render() {
    const { account, accounts, payroll, web3 } = this.state
    // console.log(accounts);
    if (!accounts) {
      return <div>loading...</div>
    }

    return (
      <Layout>
        <Header className="header">
          <div className="logo">Payroll Trading System</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['employer']}
            style={{ lineHeight: '64px' }}
            onSelect={this.onSelectTab}>
            <Menu.Item key="employer">Employer</Menu.Item>
            <Menu.Item key="employee">Employee</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px'}}>
          <Layout style={{ padding: '24px 0', background: '#fff', minHeight: '500px'}}>
            {this.renderContent()}
          </Layout>
        </Content>
        <Footer style={{ textAlign:"center" }}>
          Payroll @2017 Wu
        </Footer>
      </Layout>       
    );
  }
}

export default App
