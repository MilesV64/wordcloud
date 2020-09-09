const fs = require('fs');
const path = require('path');
const natural = require('natural'); 

export function getAllGroups() {
    return fs.readFileSync(path.join(process.cwd(), 'data/groups.txt'), 'utf8').split('\n');
}

export function getWordcloudData(group) {
    const notes = fs.readFileSync(path.join(process.cwd(), 'data/notes.csv'), 'utf8')
    const stopwords = fs.readFileSync(path.join(process.cwd(), 'data/stopwords.txt'), 'utf8').split("\n");

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

    result.sort((a, b) => b[1] - a[1]);
    if (result.length > 200) {
        result = result.slice(0, 200);
    }

    return {
        words: result,
        maxSize: maxSize
    }
}