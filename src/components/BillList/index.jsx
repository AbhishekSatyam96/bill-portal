import React, { Component } from 'react';
import './index.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteBill } from "../../redux/actions/BillActions";
import { Table, Button, Input, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import BillForm from './billForm';

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
        console.log("props of bill list", this.props);
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

    handleDelete = async(id, amount) => {
        await this.props.deleteBill(id);
        this.fetchList();
        message.success(`Deleted Bill card of amount ${amount}`);
    }

    filterMinimumBill = (amount) => {
        console.log("amount", amount);
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
        console.log("record...",record);
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
                ...this.getColumnSearchProps('category')
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                ...this.getColumnSearchProps('description')
            },
            {
                title: 'Date (MM-DD-YYYY)',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date')
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                ...this.getColumnSearchProps('amount')
            },
            {
                title: 'Action',
                width: '20%',
                render: (actionIndex) => (
                    <div>
                        <Button
                            icon={<EditOutlined />}
                            style={{ backgroundColor: '#e56f0a', color: 'white', borderRadius: '100px', marginRight: '10px' }}
                            onClick={() => this.setState({ operation: 'Edit', editData: actionIndex })}
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            title="Are you sure？"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.handleDelete(actionIndex.id, actionIndex.amount)}
                            onCancel={() => message.info("Operation terminated..!")}
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                style={{ backgroundColor: '#ee0202', color: 'white', borderRadius: '100px' }}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        ];
        return (
            <div>
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
                    placeholder="Enter budget amount"
                    allowClear
                    enterButton="Filter for minimum no. of bill for given budget"
                    style={{
                        width: 500,
                        float: 'right',
                    }}
                    onSearch={this.filterMinimumBill}
                    onChange={this.fetchList}
                />
                <Table
                    style={{
                        margin: '10px',
                        padding: '20px',
                    }}
                    dataSource={record}
                    columns={columns}
                    bordered
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