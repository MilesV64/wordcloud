import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';

const fs = require('fs');
const path = require('path');
const natural = require('natural');

//wordcloud needs access to window object, can't be server side rendered it seems
const WordCloudCanvas = dynamic(() => import('../components/WordCloudCanvas'), {ssr: false});

function Home({ words, maxSize }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Word Clouds</title>
      </Head>

      <div className={styles.main}>
        <WordCloudCanvas words={words} maxSize={maxSize} />
      </div>
      
      
    </div>
  )
}

export default Home;

export async function getStaticProps() {
  
  const notesPath = path.join(process.cwd(), 'public/notes.csv')
  const notes = fs.readFileSync(notesPath, 'utf8');

  const stopwords = fs.readFileSync(path.join(process.cwd(), 'public/stopwords.txt'), 'utf8').split("\n");

  const tokenizer = new natural.AggressiveTokenizer();
  const tokens = tokenizer.tokenize(notes);

  let wordCounts = {};

  tokens.forEach((token) => {
    const word = token.toLowerCase();
    if (word.length > 2 && !stopwords.includes(word)) {
      if(wordCounts[word]) {
        wordCounts[word] += 1
      }
      else {
        wordCounts[word] = 1
      }
    }
  });
  
  let maxSize = 0;
  let result = [];
  Object.keys(wordCounts).forEach(key => {
    if (wordCounts[key] > maxSize) {
      maxSize = wordCounts[key];
    }
    if (wordCounts[key] > 2) {
      result.push([key, wordCounts[key]]);
    }
  });
  
  return { props: { words: result, maxSize: maxSize } }
}

