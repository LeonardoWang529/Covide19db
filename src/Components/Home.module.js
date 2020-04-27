import React from "react";
import DataContainerModule from "./DataDisplayComponents/DataContainer.module";
import DataContainerComponent from "./DataTableComponents/DataTableContainer.module";
import DataChartsContainerModule from "./LeftChartsComponents/DataChartsContainer.module";
import NavbarModule from "./Navbar.module";
import RightDataChartsContainerModule from "./RightChartsComponents/RightDataChartsContainer.module";

class HomeModule extends React.Component{

    render() {
        return (
            <div className={'container-fluid'}>
                <div className="row">
                    <div className="col-sm-1">
                        <NavbarModule />
                    </div>
                    <div className="col-1">
                        <DataContainerModule />
                    </div>
                    <div className="col-3">
                        <DataChartsContainerModule />
                    </div>
                    <div className="col-3">
                        <RightDataChartsContainerModule />
                    </div>
                    <div className="col-2">
                        <DataContainerComponent location={'world'}/>
                    </div>
                    <div className="col-2">
                        <DataContainerComponent location={'us'}/>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-6">
                        {/*<RightDataChartsContainerModule location={'world'}/>*/}
                        <h4> some news </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeModule;