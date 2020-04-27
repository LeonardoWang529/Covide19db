import React, { PureComponent } from 'react';
import axiosConfig from "../../Configs/axiosConfig";
import styles from "../../Styles/rightDataChartsOne.module.css";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default class DataChartsOndeModule extends PureComponent {
    state = {
        data: [],
    }


    componentDidMount() {
        axiosConfig.get("https://covidtracking.com/api/v1/us/daily.json")
            .then(response => {
                for(let i = response.data.length-1; i >=0; i=i-5) {
                    this.setState(previousState => {
                        return {
                            data: [...previousState.data, {name: response.data[i].date, Patient_Number: response.data[i].positiveIncrease}]
                        };
                    });
                }
                //this.setState({conformdata: response.data.features[0].attributes.value});
            }).catch(error => {
            this.setState({error: true});
        });
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9km41z5z/';

    render() {
        return (
            <div className={styles.card}>
                <div className='card-body'>

                    <h5 className="card-title">US Confirmed Growth</h5>
                    <ResponsiveContainer width='100%' height={300}>
                    <LineChart
                        data={this.state.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Patient_Number" stroke="#82ca9d" />
                    </LineChart>
                    </ResponsiveContainer>
            </div>
            </div>
        );
    }
}
