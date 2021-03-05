import React, { Component } from 'react';
import './index.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBill, editBill, deleteBill } from "../../redux/actions/BillActions";
import { Table, Button, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
class BillList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: ''
        }
    }
    componentDidMount = () => {
        console.log("props of bill list", this.props);
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
                ...this.getColumnSearchProps('category')
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
            <div>
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