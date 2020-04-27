import React from "react";
import axiosConfig from "../../Configs/axiosConfig";
import DataCardModule from "./DataCard.module";

class DataContainerModule extends React.Component{
    state = {
        conformdata: 0,
        recoverdata: 0,
        deathdata: 0,
        recoverrate: 0.0,
        deathrate: 0.0,
    };

    componentDidMount() {
        axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
            + process.env.REACT_APP_SERVICE_PATH
            +"/2/"
            +"query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true")
            .then(response => {
                this.setState({conformdata: response.data.features[0].attributes.value});
            }).catch(error => {
            this.setState({error: true});
        });

        axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
            + process.env.REACT_APP_SERVICE_PATH
            +"/2/"
            +"query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true")
            .then(response => {
                this.setState({recoverdata: response.data.features[0].attributes.value});
                let rRate = (this.state.recoverdata/this.state.conformdata*100).toFixed(2)+"%";
                this.setState({recoverrate:rRate});

            }).catch(error => {
            this.setState({error: true});
        });

        axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
            + process.env.REACT_APP_SERVICE_PATH
            +"/2/"
            +"query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true")
            .then(response => {
                    this.setState({deathdata: response.data.features[0].attributes.value});
                    let dRate = (this.state.deathdata/this.state.conformdata*100).toFixed(2)+"%";
                    this.setState({deathrate:dRate});
                }).catch(error => {
                this.setState({error: true});
        });
    }

    render() {
        return (
            <div>
                <DataCardModule title="Total Confirmed " color="white" data={this.state.conformdata}/>
                <DataCardModule title="Total Recovered" color="#1EB980" data={this.state.recoverdata}/>
                <DataCardModule title="Recover Rate" color="#1EB980" data={this.state.recoverrate}/>
                <DataCardModule title="Total Death"  color="#FF6859"data={this.state.deathdata}/>
                <DataCardModule title="Death Rate" color="#FF6859" data={this.state.deathrate}/>
            </div>

        )
    }
}

export default DataContainerModule