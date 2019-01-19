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
        var param2 = msgArray[2];
        var user = message.author.username;
        //deck creation
        if (command == 'new') {

            if (user) {

                var created = taro.newDeck(user);

                if (created) {
                    message.channel.send(user + ' created a new deck');
                } else {
                    message.channel.send(user + ' already has a deck');
                }
            } else {

            }
        } else

        //deck shuffle
        if (command == 'shuffle') {
            if (user) {


                var shuffled = taro.deckShuffle(user);

                if (shuffled) {
                    message.channel.send(user + '\'s deck shuffled');
                } else {
                    message.channel.send(user + '\'s deck does not exist. Please create it first. with !t new');
                }
            } else {

                // message.channel.send('Missing deck name');

            }

        } else

        //drawing
        if (command == 'draw') {

            //checks if deck exists
            if (user) {

                //param2 is the number of drawned 2, if not, one card is drawned
                if (param2) {
                    var drawned = taro.drawCard(user, param2);
                } else {
                    var drawned = taro.drawCard(user);
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

        if (command == 'clear') {

            if (user) {
                var cleared = taro.clearDeck(user);

                if (cleared) {
                    message.channel.send(user + '\'s deck cleared and sorted');
                } else {
                    message.channel.send('Deck does not exist');
                }
            } else {
                // message.channel.send('Missing deck name');
            }
        } else

        if (command == 'showHand' || command == 'showhand') {
            if (user) {
                var hand = taro.showHand(user)

                if (hand) {
                    message.channel.send(user + "'s hand:")
                    each(hand, (val, key) => {
                        message.channel.send(key + 1 + ': ' +  val[0] + ' de ' + val[1])
                    });
                } else {
                    message.channel.send(user + 'does not have a deck');
                }
            }
        } else

        if (command == 'drawDef' || command == 'drawdef') {
            if (user) {
                if (param2) {
                    var drawned = taro.drawDef(user, param2);
                } else {
                    var drawned = taro.drawDef(user);
                }

                if(drawned) {
                    //output message for each card drawned
                    each(drawned.cards, function(val) {

                        message.channel.send('Card drawned: ' + val[0] + ' de ' + val[1]);
                    });

                    //remaining cards in deck
                    message.channel.send(drawned.remaining + ' cards remaining');
                }
            }
        } else

        if (command == 'defHand' || command == 'defhand') {
            if (user) {
                if (param2) {
                    if (taro.defHand(user, param2 - 1)) {
                        message.channel.send('Discard successfull');
                    } else {
                        message.channel.send('Discard failed');
                    }
                } else {
                    message.channel.send('Missing parameter');
                }
            }
        } else

        if (command == 'shuffleDef' || command == 'shuffledef') {
            if (user) {
                if (taro.defShuffle(user)) {
                    message.channel.send(user + '\'s discard shuffled');
                }
            }
        } else

        if (command == 'defDeck' || command == 'defdeck') {
            if (user) {
                if (param2) {
                    var def = taro.defDeck(user, param2);
                } else {
                    var def = taro.defDeck(user);
                }

                if (def) {
                    message.channel.send('Discard from deck successfull');
                }
            }
        } else

        if (command == 'restore') {
            if (user) {
                if (param2) {
                    var rest = taro.restore(user, param2)
                } else {
                    var rest = taro.restore(user)
                }

                if (rest) {
                    message.channel.send('Cards sent from discard to deck');
                }
            }
        } else

        if (command == 'checkDeck' || command == 'checkdeck') {
            if (user) {
                if (param2) {
                    var checked = taro.checkDeck(user, param2)
                } else {
                    var checked = taro.checkDeck(user)
                }

                if (checked) {
                    message.channel.send(checked.number + ' cards remaining in your deck');
                    message.channel.send('Next cards:');
                    each(checked.cards, function(val) {

                        message.channel.send(' - ' + val[0] + ' de ' + val[1]);

                    });

                } else {
                    message.channel.send('Something went wrong');
                }

            }
        } else

        if (command == 'checkDef' || command == 'checkdef') {
            if (user) {
                if (param2) {
                    var checked = taro.checkDef(user, param2)
                } else {
                    var checked = taro.checkDef(user)
                }

                if (checked) {
                    message.channel.send(checked.number + ' cards remaining in your discard');
                    message.channel.send('Next cards:');
                    each(checked.cards, function(val) {

                        message.channel.send(' - ' + val[0] + ' de ' + val[1]);

                    });

                } else {
                    message.channel.send('Something went wrong');
                }

            }
        } else {
            message.channel.send('Wrong command');
        }
    }
});

// login to Discord with your app's token
var token = process.env.token;
client.login(token);
