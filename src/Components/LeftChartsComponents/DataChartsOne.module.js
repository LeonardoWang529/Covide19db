import React, { PureComponent } from 'react';
import styles from "../../Styles/dataChartsOne.module.css";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import axiosConfig from "../../Configs/axiosConfig";

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];



export default class DataChartsOndeModule extends PureComponent {
    state = {

    }


    componentDidMount() {

        axiosConfig.get("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                for(let i = data.length-1; i >=0; i=i-5) {
                    this.setState(previousState => {
                        return {
                            data: [...previousState.data, {name: data[i].date, uv: data[i].confirmed}]
                        };
                    });
                }
                //this.setState({conformdata: response.data.features[0].attributes.value});
            }).catch(error => {
            this.setState({error: true});
        });

    }

    render() {
        return (
            <div className={styles.card} >
                <div className='card-body'>

                    <h5 className="card-title">World Confirmed Growth</h5>
                    <ResponsiveContainer width='100%' height={300}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                    </ResponsiveContainer>
            </div>
            </div>
        );
    }
}
