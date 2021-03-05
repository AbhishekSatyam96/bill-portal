import React, { Component } from 'react';
import './index.css'
import { Tabs } from 'antd';

const { TabPane } = Tabs;
export default class Dashboard extends Component {
    render() {
        return (
            <div >
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Bill List" key="1">
                        Bill List
                    </TabPane>
                    <TabPane tab="Monthly Bill Cycle" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Required bill to pay" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}