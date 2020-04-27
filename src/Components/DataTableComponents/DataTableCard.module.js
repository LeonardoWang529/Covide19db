import React from "react";
import styles from "../../Styles/dataTableCard.module.css"

function DataTableCardModule(props){
    return (
        <div className={styles.card}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <div className="card-body">
                        <p className="card-text">{props.place}</p>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <p className="card-text">{props.number}</p>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default DataTableCardModule;