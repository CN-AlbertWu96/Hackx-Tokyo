/* eslint-disable */
import React, { Component } from 'react'
import { Layout, Menu, Alert } from 'antd'

import Fund from './Fund.js'
import EmployeeList from './EmployeeList.js'

const { Sider, Content } = Layout

class Employer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'fund'
        };
    }

    componentDidMount() {
        const { account, payroll, web3 } = this.props;
        payroll.owner.call({
            from: account
        }).then(result => {
            this.setState({
                owner: result
            });
        });
    }

    onSelectTab = ({key}) => {
        this.setState({
            mode: key
        })
    }

    renderContent() {
        const { account, payroll, web3 } = this.props;
        const { owner, mode } = this.state;

        if (owner !== account) {
            return <Alert message="No permission" type="error" showIcon />
        }
        

        switch(mode) {
            case 'fund':
                return <Fund account={account} payroll={payroll} web3={web3} />
            case 'employees':
                return <EmployeeList account={account} payroll={payroll} web3={web3} />
            default:
                return <h2>Error happens</h2>
        }
    }

    render() {
        return (
            <Layout style={{ padding: '24px 0', background:'#fff' }}>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["fund"]}
                        style={{ height:'100%' }}
                        onSelect={this.onSelectTab}
                    >
                        <Menu.Item key="fund">Contract Information</Menu.Item>
                        <Menu.Item key="employees">Employees Information</Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ padding:'0 24px', minHeight:'280px'}}>
                    {this.renderContent()}
                </Content>
            </Layout>
        )
    }
}

export default Employer