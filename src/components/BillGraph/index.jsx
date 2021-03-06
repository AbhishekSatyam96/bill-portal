import React, { Component } from 'react';
import './index.css'
import { config } from "./highChart";
import { connect } from "react-redux";
const ReactHighcharts = require("react-highcharts");

class BillGraph extends Component {
    render() {
        const {
            billData
        } = this.props;
        const monthName = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "June",
            7: "July",
            8: "Aug",
            9: "Sept",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        };
        let yearlyData = {};

        billData.forEach(bill => {
            yearlyData = {
                ...yearlyData,
                [bill.date.substring(6, 10)]: {
                    ...(yearlyData?.[bill.date.substring(6, 10)] || {}),
                    [Number(bill.date.substring(0, 2))]:
                        Number(
                            yearlyData?.[bill.date.substring(6, 10)]?.[
                            Number(bill.date.substring(0, 2))
                            ] || 0
                        ) + Number(bill.amount)
                }
            };
        });
        const configData = {
            ...config,
            series: [
                {
                    ...config.series[0],
                    data: Object.keys(yearlyData)
                        .map(year => {
                            return Object.keys(yearlyData[year]).map(month => {
                                return {
                                    name: `${monthName[month]} ${year}`,
                                    y: yearlyData[year][month]
                                };
                            });
                        })
                        .flat(1)
                }
            ]
        };
        return (
            <div>
                <ReactHighcharts config={configData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      billData: state.BillState.billData
    };
  };
  export default connect(mapStateToProps)(BillGraph);