import React from "react";
import DataCardModule from "../DataDisplayComponents/DataCard.module";
import axiosConfig from "../../Configs/axiosConfig";
import DataTableCardModule from "./DataTableCard.module";

class DataTableOneComponent extends React.Component{
    state = {
        dataList: []
    };


    componentDidMount() {
        if(this.props.locaiton === 'us') {
            axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
                + process.env.REACT_APP_SERVICE_PATH
                + "/1/"
                + "query?f=json&where=Country_Region%3D%27US%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=OBJECTID&resultType=standard&cacheHint=true")
                .then(response => {
                    this.setState({dataList: response.data.features});
                }).catch(error => {
                this.setState({error: true});
            });
        }else{
            axiosConfig.get(process.env.REACT_APP_ACCESS_TOKEN
                + process.env.REACT_APP_SERVICE_PATH
                + "/2/"
                + "query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=80&resultType=standard&cacheHint=true")
                .then(response => {
                    this.setState({dataList: response.data.features});
                }).catch(error => {
                this.setState({error: true});
            });
        }
    }

    render() {
        return (
            this.props.locaiton === 'us'?
                this.state.dataList.map(data => <DataTableCardModule key={data.attributes.OBJECTID} place={data.attributes.Province_State} number={data.attributes.Confirmed}/>)
                :this.state.dataList.map(data => <DataTableCardModule key={data.attributes.OBJECTID} place={data.attributes.Country_Region} number={data.attributes.Confirmed}/>)
        )
    }
}

export default DataTableOneComponent