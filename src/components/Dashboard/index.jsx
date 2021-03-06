import React, { Component } from 'react';
import './index.css'
import { Tabs } from 'antd';
import BillList from '../BillList';

const { TabPane } = Tabs;
export default class Dashboard extends Component {
    render() {
        return (
            <div >
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Bill List" key="1">
                        <BillList />
                    </TabPane>
                    <TabPane tab="Monthly Bill Cycle" key="2">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}