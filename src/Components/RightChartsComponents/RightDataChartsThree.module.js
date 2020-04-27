import React, { PureComponent } from 'react';
import axiosConfig from "../../Configs/axiosConfig"
import styles from "../../Styles/rigthDataChartsThree.module.css";

import {RadialBarChart, RadialBar, Legend, ResponsiveContainer} from 'recharts';


const style = {
    lineHeight: '20px',
};
const colorList = ['#1EB980','#045D56','#FF6859','#FFCF44','#B15DFF','#72DEFF','#ffc658','#d0ed57','#a4de6c','#82ca9d','#8dd1e1'];
export default class DataChartsThreeModule extends PureComponent {
    state = {
        data:[],
    }

    componentDidMount() {
        axiosConfig.get("https://data.cdc.gov/resource/hc4f-j6nb.json")
            .then(response => {
                let dataList = response.data;
                let reverslist = [];
                let reverslistCount = 0;
                let colorCount = 0;
                let allAgeDeath = 0;
                for(let i = 0; i< dataList.length; i++){
                    if(dataList[i].group === 'By age'){
                        if(dataList[i].indicator === 'All ages'){
                            allAgeDeath = dataList[i].covid_deaths;
                        }else {
                            reverslist[reverslistCount]=dataList[i];
                            reverslistCount = reverslistCount +1;
                        }
                    }
                }
                for(let j = reverslist.length-1; j >=0 ; j--){
                    this.setState(prestate => {
                        return {
                            data: [...prestate.data, {
                                name: reverslist[j].indicator,
                                uv: (reverslist[j].covid_deaths),
                                fill: colorList[colorCount]
                            }]
                        }
                    });
                    colorCount = colorCount +1;
                }
            }).catch(error => {
            this.setState({error: true});
        });
    }

    render() {
        return (
            <div className={styles.card}>
                <div className='card-body'>
                    {console.log(this.state.data)}
                    <h5 className="card-title">US Death By Age</h5>
                    <ResponsiveContainer width='100%' height={350}>
                    <RadialBarChart innerRadius={40} outerRadius={150} barSize={10} data={this.state.data}  >
                        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background={{fill: '#373740'}} clockWise dataKey="uv"/>
                        <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />
                    </RadialBarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}
