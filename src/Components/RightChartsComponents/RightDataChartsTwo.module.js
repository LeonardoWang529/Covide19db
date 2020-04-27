import React, { PureComponent } from 'react';
import {PieChart, Pie, Sector, ResponsiveContainer} from 'recharts';
import styles from "../../Styles/dataChartsTwo.module.css";
import axiosConfig from "../../Configs/axiosConfig";

/*const data = [
    { name: 'Death', value: 400 },
    { name: 'Recovered', value: 300 },
    { name: 'Rest', value: 300 },
];*/

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={20}>{payload.name}: {(percent*100).toFixed(2)+'%'}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill="#045D56"
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill="#045D56"
            />
{/*            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="white" fill="white" />
            <circle cx={ex} cy={ey} r={2} fill="white" stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="white">
                {`Rate ${(percent * 100).toFixed(2)}%`}
            </text>*/}
        </g>
    );
};


export default class RightDataChartsTwoModule extends PureComponent {

    state = {
        data: [
            { name: 'Death', value: 400 },
            { name: 'Recovered', value: 300 },
            { name: 'Rest', value: 300 },
        ],
        activeIndex: 0,
    };

    componentDidMount(){
            axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
                + process.env.REACT_APP_SERVICE_PATH
                +"/2/"
                +"query?f=json&where=Country_Region%3D%27US%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true")
                .then(response => {
                    const newData= [...this.state.data];
                    newData[0].value = response.data.features[0].attributes.value;
                    this.setState({data: newData});
                }).catch(error => {
                this.setState({error: true});
            });

            axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
                + process.env.REACT_APP_SERVICE_PATH
                +"/2/"
                +"query?f=json&where=Country_Region%3D%27US%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true")
                .then(response => {
                    const newData= [...this.state.data];
                    newData[1].value = response.data.features[0].attributes.value;
                    this.setState({data: newData});
                }).catch(error => {
                this.setState({error: true});
            });

            axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
                + process.env.REACT_APP_SERVICE_PATH
                +"/2/"
                +"query?f=json&where=Country_Region%3D%27US%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true")
                .then(response => {
                    const newData= [...this.state.data];
                    newData[2].value = response.data.features[0].attributes.value - this.state.data[0].value - this.state.data[1].value;
                    this.setState({data: newData});
                }).catch(error => {
                this.setState({error: true});
            });
    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };


    render() {
        return (
            <div className={styles.card}>
                <div className='card-body'>
                        <h5 className="card-title">US Death Recovered Rate</h5>
                    <ResponsiveContainer width='100%' height={300}>
            <PieChart>
                <Pie
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}
                    data={this.state.data}
                    innerRadius={100}
                    outerRadius={120}
                    fill="#1EB980"
                    dataKey="value"
                    onMouseEnter={this.onPieEnter}
                />
            </PieChart>

                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}
