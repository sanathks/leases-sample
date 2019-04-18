import React from 'react';
import styles from "./PageLoader.module.css";

const PageLoader = (props) => (
    <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
            <div className={styles.doubleBounce1}/>
            <div className={styles.doubleBounce2}/>
        </div>
    </div>
);

export default PageLoader;
