import Head from 'next/head';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

import Dropdown from '../components/Dropdown/dropdown';

function Home({groups}) {

  const router = useRouter();

  const selectHandler = ( group ) => {
    router.push('/' + group);
  }
  
  return (
    <div className={styles.container}>

      <Head>
        <title>Justice in June</title>
      </Head>

      <h1 className={styles.title}>Justice in June</h1>

      <Dropdown 
        selectedOption={null} 
        options={groups} 
        selectHandler={selectHandler} />

    </div>
  )
}

export default Home;

import { getAllGroups } from '../lib/data';

export async function getStaticProps() {
  const groups = getAllGroups();
  return {
    props: {
      groups
    }
  }
}

