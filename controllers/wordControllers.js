const axios = require('axios');
const Word = require('../modal/wordModal');

//get the word from oxfordAPI & post it in MongoDB
exports.getWordFromOxford = async (req, res, next) => {
    try {

        const { wordId } = req.params;

        if (parseInt(wordId)) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Please enter a valid word'
            });
        }

        //fetching the word from Oxford API
        const rest = await axios({
            method: 'GET',
            url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${wordId}`,
            headers: {
                app_id: '2c60e68a',
                app_key: '7546808a7c8dd184432f93c6e2259d36'
            }
        });
        const data = rest.data;

        //saving the word in MongoDB
        const addedword = await Word.create({
            word: data.word,
            description: data.results[0].lexicalEntries
        });

        res.status(200).json({
            status: 'success'
        });

    } catch (err) {

        if (err.code === 11000) {
            return res.status(409).json({
                status: 'Failed',
                message: `'${err.keyValue.word}' is already added`
            })
        }
        else if (err.response.status === 404) {
            return res.status(404).json({
                status: 'Failed',
                message: `'Not Found, Enter a valid word`
            })
        } else {
            res.json(400).json({
                message: 'something went wrong'
            })
        }
    }
}

//Get All words from MongoDB
exports.getAllWords = async (req, res, next) => {
    try {
        const words = await Word.find();

        res.status(200).json({
            status: 'success',
            totalWord: words.length,
            words
        });

    } catch (err) {
        console.log(err);
        res.status(200).json({
            status: 'Failed',
            message: 'something went wrong.'
        });
    }
}

//GetWordById from MongoDB 
exports.getWordById = async (req, res, next) => {
    try {
        const { wordId } = req.params;
        const word = await Word.findById(wordId);

        res.status(200).json({
            status: 'success',
            word
        });
    } catch (err) {
        res.status(200).json({
            status: 'Failed',
            message: 'something went wrong.'
        });
    }
}

