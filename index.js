let helper = require("./helper.js");

let FortniteBuddy = helper.getFortNiteBuddyObject();

let challengesArray = helper.getArray("challengesArray");
let miscChallengesArray = helper.getArray("miscChallengesArray");
let hardChallengesArray = helper.getArray("hardChallengesArray");
let easyChallengesArray = helper.getArray("easyChallengesArray");
let buildChallengesArray = helper.getArray("buildChallengesArray");
let weaponsArraySearchTerms = helper.getArray("weaponsArraySearchTerms");
let eliminateArraySearchTerms = helper.getArray("eliminateArraySearchTerms");
let searchAndVisitSearchTerms = helper.getArray("searchAndVisitSearchTerms");
let locationChallengesSearchTerms = helper.getArray("locationChallengesSearchTerms");
let treasureSearchTerms = helper.getArray("treasureSearchTerms");
let buildSearchTerms = helper.getArray("buildSearchTerms");
let greetingsArray = helper.getArray("greetingsArray");
let locationsArray = helper.getArray("locationsArray");

const REPROMPT1 = "Say Help to get assistance";


let CURRENT_CHALLENGE_ARRAY = [];
let REPROMPT_ARRAY = [];

let eventRequestTypeName = "";
let eventRequestType = "";


exports.handler = (event, context, callback) => {

    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }

        switch (event.request.type) {
            case "LaunchRequest":
                console.log("LAUNCH REQUEST");
                eventRequestType = event.request.type;
                onLaunchRequest(event, context);
                break;
            case "IntentRequest":
                console.log("INTENT REQUEST");
                onIntentRequest(event, context);
                break;
            case "SessionEndedRequest":
                console.log("SESSION END REQUEST");
                eventRequestType = event.request.type;
                onSessionEndRequest(event, context);
                break;
            default:
                context.fail("INVALID REQUEST TYPE: " + event.request.type);
        }

    } catch (error) {
        context.fail("Exception: " + error);
    }
};

function onIntentRequest(event, context) {
    console.log("In function onIntentRequest");
    const intent = event.request.intent;
    console.log(intent, ": Intent");
    if (intent.name === 'getWeeklyChallengesIntent') {
        console.log("Inside Get Weekly Challenges Intent")
        getChallenges(event, context);
    } else if (intent.name === "whichWeekIntent") {
        getChallenges(event, context);
    } else if (intent.name === "AMAZON.FallbackIntent") {
        getFallBackText(event, context);
    } else if (intent.name === "listChallengesByModifierIntent") {
        getChallengeListBySpecifier(event, context);
    } else if (intent.name === "ChallengeSearchListAllSearchTermsIntent") {
        console.log("Inside List All Search Terms Intent");
        listAllSearchTerms(event, context);
    } else if (intent.name === "WhereWeDroppingIntent") {
        eventRequestTypeName = intent.name;
        console.log("Inside WhereWeDroppingIntent");
        randomDropSpot(event, context);
    } else if (intent.name === 'AMAZON.HelpIntent') {
        getHelpText(event, context);
    } else if (intent.name === 'ChallengeSearchHelpIntent') {
        console.log("Inside ChallengeSearchHelpIntent")
        moreHelpChallengeSearch(event, context);
    } else if (intent.name === "AMAZON.StopIntent") {
        eventRequestTypeName = intent.name;
        onSessionEndRequest(event, context);
    } else if (intent.name === "AMAZON.CancelIntent") {
        eventRequestTypeName = intent.name;
        onSessionEndRequest(event, context);
    }
    else {
        context.fail("Could not identify indent: " + intent.name);
    }
    eventRequestTypeName = intent.name;
}

function onLaunchRequest(event, context) {
    console.log("In function onLaunchRequest");


    console.log(eventRequestType, "EventRequestTypeName");
    context.succeed(
        generateResponse(buildSpeechletResponse(
            randomGreeting(), false))
    );
}

function onSessionEndRequest(event, context) {
    console.log("In function inEndRequest");
    console.log(eventRequestType, "EventRequestTypeName")
    context.succeed(generateResponse(buildSpeechletResponse(
        "Thank you for using Fortnite Buddy, Adding Fortnite Buddy Encyclopedia Feature Very Soon, Check Back Often.", true))
    )
}

// function moreHelpChallengeSearch(event, context) {
//     context.succeed(
//         generateResponse(buildSpeechletResponse(
//             "The Fortnite Buddy Challenge Search feature allows you to filter or specify the challenges you want to hear. For example, if you are a fan of weapon based challenges say, -- Search Weapon Challenges -- or if you prefer to hear challenges that are specific to a certain location say, -- Search Location Challenges --, currently there 9 different search terms you can use, more are on the way! If you want to hear a list of all the Search Terms currently available just say -- Tell me all of the search terms --  or say -- List all search terms --", false))
//     );
// }

function moreHelpChallengeSearch(event, context) {
    context.succeed(
        generateResponse(buildSpeechletResponse(
            "Okay what specific types of challenges would you like to hear? Say... search location challenges, or say... search easy challenges. For a full list of possible search terms say... Tell me all of search terms", false))
    );
}

function randomDropGenerator() {
    return locationsArray[Math.floor(Math.random() * locationsArray.length)];
}

function randomDropSpot(event, context) {
    context.succeed(
        generateResponse(buildSpeechletResponse("", false))
    );
}


function listAllSearchTerms(event, context) {
    context.succeed(
        generateResponse(buildSpeechletResponse(
            "Here is the full list of search terms you can use to specify what challenges you want to hear: Easy, Hard, Weapon, Build, Elimination, Location, Visit, Treasure, and Varied. For example, say -- Search Build Challenges -- or -- Search Treasure Challenges -- and so on. Please feel free to give me your feedback for more ways to filter the searches.", false))
    );
}

// function getExitFortniteBuddyText(event, context) {
//     context.succeed(
//         generateResponse(buildSpeechletResponse(
//             "Thank you for using Fortnite Buddy.\nListen to this! The First 5 people to Leave a constructive suggestion on how to improve my skill, along with a 5 star review, will get $5. It's that easy!", true))
//     );
//     onSessionEndRequest(event, context);
// }

function getStopIntentText(event, context) {
    context.succeed(
        generateResponse(buildSpeechletResponse(
            "Thank you for using Fortnite Buddy, the random dropper feature was just added don't forget that out, Check Back Often for more updates.", true))
    );
}

function getFallBackText(event, context) {
    context.succeed(
        generateResponse(buildSpeechletResponse(
            "Sorry, Fortnite Buddy cannot help with that, but I can tell you any of Season Four's challenges or give you a random drop location. Try saying... week 6 challenges or... random drop", false))
    );
}


function getDidNotUnderstandText(event, context) {
    context.succeed(
        generateResponse(buildSpeechletResponse(
            "Sorry, What was that? Try Saying... Week 2 Challenges...or Say...Search Location Challenges...", false))
    );
}

function randomGreeting() {
    var randomNumber = Math.floor(Math.random() * greetingsArray.length);
    return greetingsArray[randomNumber];
}

function getChallenges(event, context) {
    let week = event.request.intent.slots.weekNum.value;
    console.log("WEEK Value:", week);
    if (week == "1") {
        context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.one.list.all, false, week)));
    } else if (week == "carbide") {
        context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.carbide.list.all, false, week)));
    } else if (week == "blockbuster") {
        context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.blockbuster.list.all, false, week)));
    } else if (week == "list" || week == "challenges") {
        context.succeed(generateResponse(buildChallengesResponse("Okay, tell me which week you want a challenges list from.", false, week)));
    } else if (week == "2") {
        context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.two.list.all, false, week)));
    } else if (week == "3") {
        context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.three.list.all, false, week)));
    } else if (week == "4") {
        context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.four.list.all, false, week)));
    } else if (week == "5") {
        context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.five.list.all, false, week)));
    } else if (week == "6") {
        context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.six.list.all, false, week)));
    }
    // else if (week == "2") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.two.list.all, false, week)));
    // } else if (week == "3") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.three.list.all, false, week)));
    // } else if (week == "4") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.four.list.all, false, week)));
    // } else if (week == "5") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.five.list.all, false, week)));
    // } else if (week == "6") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.six.list.all, false, week)));
    // } else if (week == "7") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.seven.list.all, false, week)));
    // } else if (week == "8") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.eight.list.all, false, week)));
    // } else if (week == "9") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.nine.list.all, false, week)));
    // } else if (week == "10") {
    //     context.succeed(generateResponse(buildChallengesResponse(FortniteBuddy.weeklyChallenges.week.ten.list.all, false, week)));
    // }
    else {
        context.succeed(generateResponse(buildChallengesResponse("Sorry, week " + week + " is not a valid week yet, please try again when a challenge list has been released for that week... What week would you like?", false, week)));
    }
}

function getHelpText(event, context) {
    context.succeed(
        generateResponse(buildSpeechletResponse(
            "As an example, try saying -- week 1 challenges -- or to Search Challenges, try saying -- search easy challenges to hear all easy challenges. Also you can say -- Where we dropping boys? -- to get a random drop location. If you want more specific help with any feature just say something like  -- Help with Challenge Search -- or -- Help With Challenge List --", false))
    );
}


function getChallengeListBySpecifier(event, context) {
    let matches = [];
    let value = event.request.intent.slots.modifier.value;
    switch (value) {
        case "weapon":
        case "weapons":
            matches = findMatches(weaponsArraySearchTerms, event);
            console.log(matches);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "build":
            matches = findMatches(buildSearchTerms, event);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "elimination":
            matches = findMatches(eliminateArraySearchTerms, event);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "visit":
            matches = findMatches(searchAndVisitSearchTerms, event);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "location":
        case "locations":
            matches = findMatches(locationChallengesSearchTerms, event);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "hard":
            matches = findMatches(hardChallengesArray, event);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "easy":
            matches = findMatches(easyChallengesArray, event);
            console.log(matches);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "treasure":
        case "treasures":
            matches = findMatches(treasureSearchTerms, event);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "varied":
            matches = findMatches(miscChallengesArray, event);
            context.succeed(
                generateResponse(buildSpeechletResponse(matches.join(","), false))
            );
            break;
        case "weekly challenges":
            context.succeed(
                generateResponse(buildSpeechletResponse("Sure, Which week would you like to hear challenges from", false))
            );
            break;
        case "search challenges":
            context.succeed(
                generateResponse(buildSpeechletResponse("Sure, what kind of challenges are you searching for? Try...weapons challenges or... search treasure challenges. To hear all search terms say... list all search terms", false))
            );
            break;
        default:
            console.log("in default case");
            context.succeed(
                generateResponse(buildSpeechletResponse("Sorry, that is not a valid search term yet...But is this a search term you would like added? Just grab my email from the Alexa Skill Page And Let me know. Now what Can i do for you?", false))
            );
    }
}

function findMatches(searchTerms, event) {
    let value = event.request.intent.slots.modifier.value;
    console.log("insideFindMatches")
    var matchesArray = [];
    if (value === "hard") {
        console.log("InsideHardChallenges")
        return hardChallengesArray;
    } else if (value === "easy") {
        console.log("InsideEasyChallenges")
        return easyChallengesArray;
    } else if (value === "varied") {
        return miscChallengesArray;
    } else if (value === "build") {
        return buildChallengesArray;
    }
    else {
        console.log("inside Else");
        for (var i = 0; i < challengesArray.length; i++) {
            for (var j = 0; j < searchTerms.length; j++) {
                if (challengesArray[i].toLowerCase().includes(searchTerms[j])) {
                    matchesArray.push(challengesArray[i]);
                }
            }
        }
    }
    return matchesArray;
}


buildChallengesResponse = (outputText, shouldEndSession, week) => {
    let endingSentenceArray = ["What Week Would You Like To Hear Next?", " Would you like to try a Challenge Search? For example, Say...Search Weapons Challenges", " What else can I do for you? Try the challenge search or ask for another weeks challenges, Say...help... for more information on how to do this."];
    let randomNumber = Math.floor(Math.random() * endingSentenceArray.length);
    let tempArr = outputText.split(",");
    let title = "Season 4 - Week " + week + " Challenges"
    if (week > "0" && week < "7") {
        return {
            "outputSpeech": {
                "type": "SSML",
                "text": outputText,
                "ssml": "<speak>" + tempArr[0] + "<break time='0.5s'/>" + tempArr[1] + "<break time='0.5s'/>" + tempArr[2] + "<break time='0.5s'/>" + tempArr[3] + "<break time='0.5s'/>" + tempArr[4] + "<break time='0.5s'/>" + tempArr[5] + "<break time='0.5s'/>" + tempArr[6] + "<break time='0.5s'/>" + endingSentenceArray[randomNumber] + "</speak>"
            },
            "card": {
                "type": "Standard",
                "title": title,
                "text": "\u{2022}\t" + tempArr[0] + "\n" +
                    "\u{2022}\t" + tempArr[1] + "\n" +
                    "\u{2022}\t" + tempArr[2] + "\n" +
                    "\u{2022}\t" + tempArr[3] + "\n" +
                    "\u{2022}\t" + tempArr[4] + "\n" +
                    "\u{2022}\t" + tempArr[5] + "\n" +
                    "\u{2022}\t" + tempArr[6],
            },
            shouldEndSession: shouldEndSession
        }
    } else {
        return {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputText,
            },
            shouldEndSession: shouldEndSession
        };

    }
}

buildSpeechletResponse = (outputText, shouldEndSession) => {
    if (eventRequestType === "LaunchRequest" && eventRequestTypeName !== "getChallengeIntent"
        && eventRequestTypeName !== "AMAZON.HelpIntent" && eventRequestTypeName != "listChallengesByModifierIntent") {
        return {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputText,
            },
            "card": {
                "type": "Standard",
                "text": outputText,
                "image": {
                    "smallImageUrl": "https://s3.amazonaws.com/fortnite.buddy.bucket/fortniteBuddyLaunchSmall.png",
                    "largeImageUrl": "https://s3.amazonaws.com/fortnite.buddy.bucket/fortniteBuddyLaunchLarge.png"
                },
            },
            "reprompt": {
                "outputSpeech": {
                    "type": "SSML",
                    "text": "Say -- week 6 challenges -- to get a feel for how things work. Or try the challenge search feature by saying -- Search Treasure Challenges -- If you need more information please say -- help --",
                    "ssml": "<speak>" + "Say" + "<emphasis level='strong'>" + "week 6 challenges" + "</emphasis>" + "to get a feel for how things work. Or try the challenge search feature by saying" + "<emphasis level='strong'>" + "search treasure challenges" + "</emphasis>" + "If you need more information please ask for help." + "</speak>"
                },
            },
            shouldEndSession: shouldEndSession
        };

    } else if (eventRequestTypeName === "exitFortniteBuddyIntent") {
        return {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputText,
                "ssml": "<speak>" + outputText + "</speak>"
            }, "card": {
                "type": "Standard",
                "image": {
                    "smallImageUrl": "https://s3.amazonaws.com/fortnite.buddy.bucket/endSessionImage.png",
                    "largeImageUrl": "https://s3.amazonaws.com/fortnite.buddy.bucket/endSessionImage.png"
                }
            },
            shouldEndSession: shouldEndSession
        };
    } else if (eventRequestType === "SessionEndedRequest") {
        console.log("inside SessionEndedRequest ");
        return {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputText,
                "ssml": "<speak>" + outputText + "</speak>"
            },
            "card": {
                "type": "Standard",
                "text": outputText,
                "image": {
                    "smallImageUrl": "https://s3.amazonaws.com/fortnite.buddy.bucket/endSessionImage.png",
                    "largeImageUrl": "https://s3.amazonaws.com/fortnite.buddy.bucket/endSessionImage.png"
                }

            },
            shouldEndSession: shouldEndSession
        };
    }
    else if (eventRequestTypeName === "AMAZON.HelpIntent" && eventRequestTypeName != "listChallengesByModifierIntent" && eventRequestTypeName !== "exitFortniteBuddyIntent") {
        let endText = "to get current weekly challenge list.";
        return {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputText,
            },
            "card": {
                "type": "Standard",
                "title": "Command List",
                "text": "Challenge List Feature Try: week 1 challenges" + "\n" +
                    "Challenge Search Feature Try: search weapon challenges" + "\n" +
                    "Search Modifiers Include: weapon, easy, hard, build, location, elimination, search and visit, treasure, varied " + "\n" +
                    "To Exit You Can Say: Exit Fortnite"

            },
            "reprompt": {
                "outputSpeech": {
                    "type": "SSML",
                    "text": "Hey Buddy, you there? Say search easy challenges to hear all available easy challenges...Say Exit Fortnite Buddy to quit",
                    "ssml": "<speak>" + "Hey Buddy, You There? Say Week 2 challenges to get a week 2 challenge list...Say search varied challenges to hear all available varied challenges...For more detailed help say help...Say Exit Fortnite Buddy to quit" + "</speak>"
                },
            },
            shouldEndSession: shouldEndSession
        };
    } else if (eventRequestTypeName === "AMAZON.StopIntent") {
        console.log("In the AMAZON.StopIntent");
        return {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputText,
            }
        }
    } else if (eventRequestTypeName === "AMAZON.CancelIntent") {
        console.log("In the Amazon.CancelIntent");
        return {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputText,
            }
        }
    } else if (eventRequestTypeName === "WhereWeDroppingIntent") {
        console.log("inside build speech for WhereWeDropping");
        return {
            "outputSpeech": {
                "type": "SSML",
                "text": "Where we dropping boys? How about " + randomDropGenerator(),
                "ssml": "<speak><audio src='https://s3.amazonaws.com/fortnite.buddy.bucket/Where+we+dropping+boys-%5BAudioTrimmer.com%5D-%5BAudioTrimmer.com%5D.mp3' /> We droppin at " + randomDropGenerator() + "<break time='0.5s'/> If not, just ask again! </speak>"

            }
        }
    } else {
        console.log("In the final else of build speechlet");
        return {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputText,
            },
            "card": {
                "type": "Standard",
                "text": outputText,
                "title": "Fortnite Buddy",
            },
            shouldEndSession: shouldEndSession
        };
    }
};
generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "2.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse,

    };
};
