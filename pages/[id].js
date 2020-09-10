import React from 'react';

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css';
import Dropdown from '../components/Dropdown/dropdown';
import Stat from '../components/Stat/stat';

const WordCloudCanvas = dynamic(() => import('../components/WordCloudCanvas'), {ssr: false});

const Dashboard = ({ group, groups, words, maxSize }) => {

    const router = useRouter();

    const selectHandler = ( group ) => {
        router.push('/' + group);
    }

    return (
        <div className={styles.container}>

            <Head>
                <title>{group} · Justice in June</title>
            </Head>

            <h1 className={styles.title}>Justice in June</h1>

            <Dropdown 
                selectedOption={group} 
                options={groups} 
                selectHandler={selectHandler} />

            <div className={styles.stats}>
                <Stat className={styles.statLeft} data="0" description="Words written" icon="" />
                <Stat className={styles.statRight} data="0" description="Cumulative streak" icon="" />
            </div>
            
            <WordCloudCanvas className={styles.wordCloud} words={words} maxSize={maxSize} />

            
        
        </div>
    )
    

}

export default Dashboard;


const fs = require('fs');
const path = require('path');

export async function getStaticPaths() {
    const groups = fs.readFileSync(path.join(process.cwd(), 'data/groups.txt'), 'utf8').split('\n')
    const paths = groups.map(group => {
        return {
            params: {
                id: group
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

import { getWordcloudData } from '../lib/data';

export async function getStaticProps({ params }) {
    const group = params.id;
    const groups = fs.readFileSync(path.join(process.cwd(), 'data/groups.txt'), 'utf8')
                    .split('\n').filter(e => e !== group);

    const wordcloudData = getWordcloudData(group);
    const words = wordcloudData.words;
    const maxSize = wordcloudData.maxSize;
                        
    return {
        props: {
            group,
            groups,
            words,
            maxSize
        }
    }
    
}

