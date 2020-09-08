import React from 'react';
import styles from './stat.module.css';

const Stat = ({
    data, description, className
}: {
    data: string, description: string, icon: string, className: string
}) => {

    return (
        <div className={styles.background + " " + className}>
            <p className={styles.data}>{data}</p>
            <p className={styles.description}>{description}</p>
        </div>
    )

};

export default Stat;