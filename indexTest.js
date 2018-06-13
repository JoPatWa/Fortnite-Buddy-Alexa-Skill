const rp = require('request-promise');
const cheerio = require('cheerio');
const optionsArray = [
    options = {
        uri: `https://db.fortnitetracker.com/challenges/week-1`,
        transform: function (body) { return cheerio.load(body); }
    },
    options = {
        uri: `https://db.fortnitetracker.com/challenges/week-2`,
        transform: function (body) { return cheerio.load(body); }
    },
    options = {
        uri: `https://db.fortnitetracker.com/challenges/week-3`,
        transform: function (body) { return cheerio.load(body); }
    },
    options = {
        uri: `https://db.fortnitetracker.com/challenges/week-4`,
        transform: function (body) { return cheerio.load(body); }
    },
    options = {
        uri: `https://db.fortnitetracker.com/challenges/week-5`,
        transform: function (body) { return cheerio.load(body); }
    },
    options = {
        uri: `https://db.fortnitetracker.com/challenges/week-6`,
        transform: function (body) { return cheerio.load(body); }
    },
    options = {
        uri: `https://db.fortnitetracker.com/challenges/week-7`,
        transform: function (body) { return cheerio.load(body); }
    }
]
const challenges = [];
optionsArray.forEach(function (options) {
    rp(options)
        .then(function ($) {

            $('.panel-heading').each(function (i, elem) {
                var challenge = $(this).text();
                challenges[i] = challenge.replace(/(\r\n\t|\n|\r\t)/gm, "");
            })
            console.log(challenges);
            return challenges;
        })
        .catch(function (err) {
            return err;
            console.log(err);
        });

    // rp(options)
    // .then(function ($) {
    //     const challenges = [];
    //     $('.quest_text').each(function (i, elem) {
    //         var challenge = $(this).text();
    //         challenges[i] = challenge.replace(/(\r\n\t|\n|\r\t)/gm, "");
    //     })
    //     console.log(challenges);
    //     return challenges;
    // })
    // .catch(function (err) {
    //     return err;
    //     console.log(err);
    // });

});


rp(options)
    .then(function ($) {
        const challenges = [];
        $('.quest_text').each(function (i, elem) {
            var challenge = $(this).text();
            challenges[i] = challenge.replace(/(\r\n\t|\n|\r\t)/gm, "");
        })
        console.log(challenges);
        return challenges;
    })
    .catch(function (err) {
        return err;
        console.log(err);
    });



