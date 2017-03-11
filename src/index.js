'use strict';

exports.handler = (event, context, callback) => {
    
    var collectionType = exports.getCollectionTypeThisWeek();
    
    var output = "You need to put out the " + collectionType + " bin this week.";
    
    var result =  {
        version: "1.0",
        sessionAttributes: {},
        response: {
            outputSpeech: {
                type: "PlainText",
                text: output
            },
            reprompt: {
                outputSpeech: {
                    type: "PlainText",
                    text: output
                }
            },
            card: {
                type: "Simple",
                title: "Woking Bin Collection",
                content: output
            },
            shouldEndSession: true
        }
    };
    
    console.log("result: " + JSON.stringify(result, null, 2));
    
    callback(null, result);
};



// Returns the type of collection for this week
exports.getCollectionTypeThisWeek = function() {
    var type = null;
    var weekNumber = exports.getWeekNumber();
    
    console.log("week number: " + weekNumber);
    
    if (weekNumber % 2 === 0) {
        type = "black";
    } else {
        type = "blue";
    }
    
    return type;
};

// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.net/how-to/javascript 

// Returns the ISO week of today's date
exports.getWeekNumber = function() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log("date: " + date);
  
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
  
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
};
