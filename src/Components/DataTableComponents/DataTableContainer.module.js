import React from "react";
import DataTableOneComponent from "./DataTableOne.component";
import styles from "../../Styles/dataTableContainer.module.css"

class DataContainerComponent extends React.Component{

    render() {
        return (
            this.props.location === 'us'?
            <div>
                <h5 className={styles.listTitle}>Total Confirmed by State</h5>
                <DataTableOneComponent locaiton={this.props.location}/>
            </div>
                :
                <div>
                    <h5 className={styles.listTitle}>Total Confirmed by Countries</h5>
                    <DataTableOneComponent locaiton={this.props.location}/>
                </div>
        )
    }
}

export default DataContainerComponent