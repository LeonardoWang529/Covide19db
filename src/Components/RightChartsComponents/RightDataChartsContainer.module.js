import React from "react";
import DataChartsOndeModule from "./RightDataChartsOne.module";
import RightDataChartsTwoModule from "./RightDataChartsTwo.module";
import DataChartsThreeModule from "./RightDataChartsThree.module";


class RightDataChartsContainerModule extends React.Component{

    render() {
        return (
            <div>
                <RightDataChartsTwoModule />
                <DataChartsOndeModule />
                <DataChartsThreeModule />
            </div>
        )
    }
}

export default RightDataChartsContainerModule