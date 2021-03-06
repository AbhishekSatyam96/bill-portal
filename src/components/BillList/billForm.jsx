import React, { Component } from 'react';
import { Modal, Button, Form, Input, InputNumber, DatePicker, message } from 'antd';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBill, editBill, deleteBill } from "../../redux/actions/BillActions";
import Moment from 'moment';

const { TextArea } = Input;

class BillForm extends Component {
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
        console.log("props of bill form", this.props);
        this.setState({ visible: this.props.visible })
        if (this.props.operation === 'Edit') {
            const {
                category, description, amount, date
            } = this.props.editData;
            this.setState({
                category,
                description,
                amount,
                date
            })
        }
    }

    handleChange = (fieldName) => (event) => {
        if (event && event.target) {
            this.setState({ [fieldName]: event.target.value })
        } else {
            this.setState({ [fieldName]: event })
        }
    }

    handleCancel = async() => {
        this.setState({ visible: false });
        await this.props.closeModal();
    }

    handleDate = (dateString) => {
        this.setState({ date: dateString })
    }

    handleSubmit = async() => {
        const {
            description, category, date, amount
        } = this.state;
        if (this.props.operation === 'Edit') {
            const payload = {
                id: this.props.editData.id,
                description,
                category,
                amount,
                date
            }
            await this.props.editBill(payload);
            message.success("Updated successfully..!")
        } else {
            const payload = {
                id: this.props.billData.length + 1,
                description,
                category,
                amount,
                date
            }
            await this.props.addBill(payload);
            message.success(`Bill created with amount of ${amount}`);
        }
        this.handleCancel();
    }

    render() {
        const {
            visible, category, description, amount, date
        } = this.state;
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        };
        return (
            <Modal
                visible={visible}
                title={`${this.props.operation} Bill`}
                onCancel={this.handleCancel}
                footer={[
                    <Button
                        key="back"
                        onClick={this.handleCancel}
                    >
                        Close
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                ]}
            >
                <Form {...layout}>
                    <Form.Item label="Category">
                        <Input
                            placeholder="Enter Category"
                            value={category}
                            onChange={this.handleChange('category')}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea
                            placeholder="Enter Description"
                            value={description}
                            onChange={this.handleChange('description')}
                        />
                    </Form.Item>
                    <Form.Item label="Amount">
                        <InputNumber
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={this.handleChange('amount')}
                        />
                    </Form.Item>
                    <Form.Item label="Date">
                        <DatePicker
                            format='MM-DD-YYYY'
                            value={
                                date === ''
                                    ? ''
                                    : Moment(date, 'MM-DD-YYYY')
                            }
                            onChange={(date, dateString) => this.handleDate(dateString)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

BillForm.propTypes = {
    props: PropTypes
};

const mapStateToProps = state => {
    return {
        billData: state.BillState.billData
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addBill,
            editBill,
            deleteBill
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(BillForm);