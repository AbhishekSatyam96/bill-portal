import React, { Component } from 'react';
import './index.css'
import { Tabs } from 'antd';
import BillList from '../BillList';
import BillGraph from '../BillGraph';

const { TabPane } = Tabs;
export default class Dashboard extends Component {
    render() {
        return (
            <div className="tab-layout">
                <Tabs
                    defaultActiveKey="1"
                    centered
                    type="card"
                >
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