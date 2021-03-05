import React, { Component } from 'react';
import './index.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBill, editBill, deleteBill } from "../../redux/actions/BillActions";
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
class BillList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount = () => {
        console.log("props of bill list", this.props);
    }
    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: 'Action',
                width: '20%',
                render: () => (
                    <div>
                        <Button type="primary"
                            style={{ backgroundColor: '#e56f0a', color: 'white', borderRadius: '100px', marginRight: '10px' }}
                        >
                            <EditOutlined />
                            Edit</Button>
                        <Button type="danger" style={{ backgroundColor: '#ee0202', color: 'white', borderRadius: '100px' }}>
                            <DeleteOutlined />Delete</Button>
                    </div>
                )
            }
        ];
        return (
            <div

            >
                <Button type="primary"
                    style={{ float: 'left', margin: '5px' }}
                ><PlusOutlined />Add Bill</Button>
                <Table
                    style={{
                        margin: '20px',
                        padding: '20px'
                    }}
                    dataSource={this.props.billData}
                    columns={columns}
                />
            </div>
        )
    }
}

BillList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BillList);