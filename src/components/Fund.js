/* eslint-disable */
import React, { Component } from 'react'
import { Form, InputNumber, Button } from 'antd'

import Common from './Common'

class Fund extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const { payroll, account, web3 } = this.props;
        payroll.addFund({
            from: account,
            value: web3.toWei(this.state.fund)
        })
    }

    render() {
        const { account, payroll, web3 } = this.props;
        return (
            <div>
                <Common account={account} payroll={payroll} web3={web3} />
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <InputNumber
                            min={1}
                            onChange={input => {this.setState({fund:input})}}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary"
                            htmlType="submit"
                        >
                        Add fund
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Fund