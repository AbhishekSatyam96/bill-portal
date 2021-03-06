import React, { Component } from 'react';
import './index.css'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                Created as an assigment for &nbsp;
                <a href="https://www.brightmoney.co/" target="_blank" rel="noreferrer">
                    Bright Money
                </a> &nbsp;by Abhishek Satyam
            </div>
        )
    }
}