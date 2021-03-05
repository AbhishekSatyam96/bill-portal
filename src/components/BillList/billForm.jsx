import React, { Component } from 'react';
import { Modal, Button, Form, Input, InputNumber, DatePicker } from 'antd';

const { TextArea } = Input;

export default class BillForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            category: '',
            description: '',
            amount: null,
            date: ''
        }
    }
    componentDidMount = () => {
        this.setState({ visible: this.props.visible })
    }

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.closeModal();
    }
    render() {
        const {
            visible
        } = this.state;
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
          };
        return (
            <Modal
                visible={visible}
                title="Add Bill"
                onCancel={this.handleCancel}
                footer={[
                    <Button
                        key="back"
                        onClick={this.handleCancel}
                    >
                        Close
                    </Button>,
                    <Button key="submit" type="primary" >
                        Submit
                    </Button>
                ]}
            >
                <Form {...layout}>
                    <Form.Item label="Category">
                        <Input 
                            placeholder="Enter Category"
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea 
                            placeholder="Enter Description"
                        />
                    </Form.Item>
                    <Form.Item label="Amount">
                        <InputNumber 
                            placeholder="Enter Amount"
                        />
                    </Form.Item>
                    <Form.Item label="Date">
                        <DatePicker 
                            format='DD-MM-YYYY'
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}