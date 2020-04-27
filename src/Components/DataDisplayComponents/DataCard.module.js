import React from "react";
import styles from '../../Styles/dataCard.module.css';

function DataCardModule(props){
    return (
        <div className={styles.card}>
            <div className="card-body">
                <h5 className="card-title" style={{ color: props.color }}>{props.data}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.title}</h6>
{/*                <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                    the card's content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>*/}
            </div>
        </div>
    )


}

export default DataCardModule;