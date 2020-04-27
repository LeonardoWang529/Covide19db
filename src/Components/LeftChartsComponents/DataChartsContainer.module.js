import React from "react";
import DataChartsOndeModule from "./DataChartsOne.module";
import DataChartsTwoModule from "./DataChartsTwo.module";
import DataChartsThreeModule from "./DataChartsThree.module";


class DataChartsContainerModule extends React.Component{

    render() {
        return (
            <div>
                <DataChartsTwoModule />
                <DataChartsOndeModule />
                <DataChartsThreeModule />
            </div>
        )
    }
}

export default DataChartsContainerModule