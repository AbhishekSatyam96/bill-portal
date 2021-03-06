import React, { Component } from 'react';
import './index.css'
import { Tabs } from 'antd';
import BillList from '../BillList';
import BillGraph from '../BillGraph';

const { TabPane } = Tabs;
export default class Dashboard extends Component {
    render() {
        return (
            <div 
                style={{
                    margin: '10px',
                    padding: '10px',
                    backgroundColor: '#f1e8e8'
                }}
            >
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Bill List" key="1">
                        <BillList />
                    </TabPane>
                    <TabPane tab="Monthly Bill Cycle" key="2">
                        <BillGraph />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}