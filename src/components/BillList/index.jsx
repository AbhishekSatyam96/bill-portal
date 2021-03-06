import React, { Component } from 'react';
import './index.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteBill } from "../../redux/actions/BillActions";
import { Table, Button, Input, Popconfirm, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import BillForm from './billForm';
import Moment from 'moment';

const { Search } = Input;
class BillList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            operation: '',
            editData: [],
            record: []
        }
    }

    fetchList = () => {
        this.setState({record: this.props.billData})
    }

    componentDidMount = () => {
        this.fetchList()
    }

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
        (this.state.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text && text.toString()}
            />
        ) : (
            text
        )),
    });

    closeModal = () => {
        this.setState({ operation: ''})
        this.fetchList();
    }

    handleDelete = async(amount, description) => {
        await this.props.deleteBill(description);
        this.fetchList();
        message.success(`Deleted Bill card of amount ${amount}`);
    }

    filterMinimumBill = (amount) => {
        this.setState({record: this.props.billData})
        const {
            record
        } = this.state;
        let tempRecord = record;
        tempRecord.sort((a,b) => {
            return a.amount > b.amount ? -1 : 1
        });
        let totalAmount = 0
        tempRecord = tempRecord.filter(item => {
            if(totalAmount + item.amount <= amount){
                totalAmount = totalAmount + item.amount;
                return item;
            } return null;
        })
        this.setState({record: tempRecord})
    }

    render() {
        const {
            operation, editData, record
        } = this.state;
        const columns = [
            // {
            //     title: 'Id',
            //     dataIndex: 'id',
            //     key: 'id',
            //     width: '5%'
            // },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
                ...this.getColumnSearchProps('category')
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                ...this.getColumnSearchProps('description')
            },
            {
                title: 'Date',
                key: 'date',
                render: (actionIndex) => (
                    Moment(actionIndex.date).format('LL')
                )
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                ...this.getColumnSearchProps('amount')
            },
            {
                title: 'Amount',
                render: (actionIndex) => (
                    <Tag color="#108ee9" style={{textAlign: 'center'}}>{actionIndex.amount}</Tag>
                )
            },
            {
                title: 'Action',
                width: '20%',
                render: (actionIndex) => (
                    <div className="action">
                        <Button
                            icon={<EditOutlined />}
                            style={{ marginRight: '10px', backgroundColor: '#e56f0a' }}
                            onClick={() => this.setState({ operation: 'Edit', editData: actionIndex })}
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            title="Are you sure？"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.handleDelete(actionIndex.amount, actionIndex.description)}
                            onCancel={() => message.info("Operation terminated..!")}
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                style={{ backgroundColor: '#ee0202'}}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        ];
        return (
            <div
                style={{
                    // backgroundColor: '#f1e8e8',
                }}
            >
                {operation ?
                    <BillForm
                        visible={true}
                        closeModal={this.closeModal}
                        operation={operation}
                        editData={editData}
                    />
                    : null}
                <Button
                    type="primary"
                    style={{ float: 'left'}}
                    icon={<PlusOutlined />}
                    onClick={() => this.setState({ operation: 'Add' })}
                >
                    Add Bill
                </Button>
                <Search
                    placeholder="Enter budget to filter minimum no. of bills"
                    allowClear
                    enterButton="Submit"
                    style={{
                        width: 380,
                        float: 'right',
                    }}
                    onSearch={this.filterMinimumBill}
                    onChange={this.fetchList}
                />
                <Table
                    className="table-layout"
                    dataSource={record}
                    columns={columns}
                    bordered
                    // scroll={{ y: 500 }}
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
            deleteBill
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(BillList);