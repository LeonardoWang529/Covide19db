import React, { PureComponent } from 'react';
import styles from "../../Styles/dataChartsThree.module.css";

import {RadialBarChart, RadialBar, Legend, ResponsiveContainer} from 'recharts';

const data = [
    {
        name: '18-24', uv: 31.47,  fill: '#1EB980',
    },
    {
        name: '25-29', uv: 26.69, fill: '#045D56',
    },
    {
        name: '30-34', uv: 15.69,  fill: '#FF6859',
    },
    {
        name: '35-39', uv: 8.22,  fill: '#FFCF44',
    },
    {
        name: '40-49', uv: 8.63, fill: '#B15DFF',
    },
    {
        name: '50+', uv: 2.63,fill: '#72DEFF',
    },
    {
        name: 'unknow', uv: 6.67,  fill: '#ffc658',
    },
];


const style = {
    paddingTop: '10px',
    lineHeight: '15px',
};

export default class DataChartsThreeModule extends PureComponent {
    state = {

    }


    componentDidMount() {
/*        axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
            + process.env.REACT_APP_SERVICE_PATH
            +"/2/"
            +"query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true")
            .then(response => {
                this.setState({conformdata: response.data.features[0].attributes.value});
            }).catch(error => {
            this.setState({error: true});
        });*/
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9km41z5z/';

    render() {
        return (
            <div className={styles.card}>
                <div className='card-body'>

                    <h5 className="card-title">World Death by age</h5>
                    <ResponsiveContainer width='100%' height={350}>
                    <RadialBarChart innerRadius={40} outerRadius={150} barSize={10} data={data}>
                        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background={{fill: '#373740'}} clockWise dataKey="uv" />
                        <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />
                    </RadialBarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}
