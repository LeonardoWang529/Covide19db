import React from "react";
import icon from "../res/icon.svg";
import styles from "../Styles/navbar.module.css";

class NavbarModule extends React.Component{

    render() {
        return (
            <div>
                <img className={styles.imgLogo} src={icon} alt="Logo"/>
            </div>
        );
    }
}

export default NavbarModule;