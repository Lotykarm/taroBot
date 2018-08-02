// require the discord.js module
const Discord = require('discord.js');
const taro = require('taro');
const each = require('foreach');
const conf = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting

client.on('ready', () => {
    console.log('Ready!');
});


//message event listener
client.on('message', message => {

    //!t is used to call the Bot
    //first word if the command on others are the parameters
    if (/!t/.test(message.content)) {

        //split to turn the string into an array and get each word
        var msgArray = message.content.split(" ");
        var command = msgArray[1];
        var deckName = msgArray[2];
        var param2 = msgArray[3];

        //deck creation
        if (command == 'new') {

            if (deckName) {

                var created = taro.newDeck(deckName);

                if (created) {
                    message.channel.send('New deck ' + deckName + ' created');
                } else {
                    message.channel.send('Deck ' + deckName + ' already exists');
                }
            } else {
                message.channel.send('Missing deck name');
            }
        } else

        //deck shuffle
        if (command == 'shuffle') {
            if (deckName) {


                var shuffled = taro.deckShuffle(deckName);

                if (shuffled) {
                    message.channel.send('Deck ' + deckName + ' shuffled');
                } else {
                    message.channel.send('Deck ' + deckName + ' does not exist. Please create it first. e.g. !t new ' + deckName);
                }
            } else {

                message.channel.send('Missing deck name');

            }

        } else

        //drawing
        if (command == 'draw') {

            //checks if deck exists
            if (deckName) {

                //param2 is the number of drawned 2, if not, one card is drawned
                if (param2) {
                    var drawned = taro.drawCard(deckName, param2);
                } else {
                    var drawned = taro.drawCard(deckName);
                }

                if (drawned) {

                    //output message for each card drawned
                    each(drawned.cards, function(val) {

                        message.channel.send('Card drawned: ' + val[0] + ' de ' + val[1]);
                    });

                    //remaining cards in deck
                    message.channel.send(drawned.remaining + ' cards remaining');

                } else {
                    message.channel.send('Deck does not exist');
                }

            } else {
                message.channel.send('Missing deck name');
            }

        } else

        if (command == 'clear'){

            if (deckName) {
                var cleared = taro.clearDeck(deckName);

                if (cleared) {
                    message.channel.send('Deck ' + deckName + ' cleared and sorted');
                } else {
                    message.channel.send('Deck does not exist');
                }
            } else {
                message.channel.send('Missing deck name');
            }
        }

    }
});

// login to Discord with your app's token
var token = process.env.token;
client.login(token);
