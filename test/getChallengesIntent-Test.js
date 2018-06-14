var expect = require('chai').expect;
var index = require('../index');

const context = require('aws-lambda-mock-context');
const ctx = context();

var request = {
  "type": "IntentRequest",
  "requestId": "amzn1.echo-api.request.4b6bdda3-87b0-4f98-9c62-f8a0fdde1c7e",
  "timestamp": "2018-06-14T15:16:30Z",
  "locale": "en-US",
  "intent": {
    "name": "whichWeekIntent",
    "confirmationStatus": "NONE",
    "slots": {
      "weekNum": {
        "name": "weekNum",
        "value": "1",
        "resolutions": {
          "resolutionsPerAuthority": [
            {
              "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.32ee4f80-a2a5-47cc-bb8d-ab626e4aaa43.weekNumber",
              "status": {
                "code": "ER_SUCCESS_MATCH"
              },
              "values": [
                {
                  "value": {
                    "name": "1",
                    "id": "c4ca4238a0b923820dcc509a6f75849b"
                  }
                }
              ]
            }
          ]
        },
        "confirmationStatus": "NONE"
      }
    }
  }
}

describe("Testing getWeeklyChallengesIntent For Weeks 1-7", function () {
  var speechResponse = null
  var speechError = null

  before(function (done) {
    console.log("  ------------------------------------------------------");
    index.handler({
      "session": {
        "new": false,
        "sessionId": "amzn1.echo-api.session.70fd8269-69a2-4532-b164-076f1190c060",
        "application": {
          "applicationId": "amzn1.ask.skill.32ee4f80-a2a5-47cc-bb8d-ab626e4aaa43"
        },
        "user": {
          "userId": "amzn1.ask.account.AEESKA42VBMVZGBT67QCS5DXYPLGA5QHMM6OUIQ6JYBO7TL23FCN52NHYBV2X4WDOUMJQRSBZXZULUG65AHBSH6R7NZFSRGJCN7OY32PBI2T55UZCX66UHC5Y65UVZENFZXI5ZHLAQZKSV3ZELDB33JPFB22TCJ4RPWUWV6LLSPJXEIB7OR2BNFD6IW6IP5KUGAQD5FWMKU2GMI"
        }
      },
      "context": {
        "AudioPlayer": {
          "playerActivity": "IDLE"
        },
        "Display": {
          "token": ""
        },
        "System": {
          "application": {
            "applicationId": "amzn1.ask.skill.32ee4f80-a2a5-47cc-bb8d-ab626e4aaa43"
          },
          "user": {
            "userId": "amzn1.ask.account.AEESKA42VBMVZGBT67QCS5DXYPLGA5QHMM6OUIQ6JYBO7TL23FCN52NHYBV2X4WDOUMJQRSBZXZULUG65AHBSH6R7NZFSRGJCN7OY32PBI2T55UZCX66UHC5Y65UVZENFZXI5ZHLAQZKSV3ZELDB33JPFB22TCJ4RPWUWV6LLSPJXEIB7OR2BNFD6IW6IP5KUGAQD5FWMKU2GMI"
          },
          "device": {
            "deviceId": "amzn1.ask.device.AG7F3ER2TZWRQWOJOCZM3DP4RP633LFUF77MN4NIUN2PXSMA4GUGVJB5RL6H6VMGUR5VXQ5WZOMWNQS56KPWL2LPOHT6UGR26PVZ7IRVZL7DE4DESHXGUIZWSGQ4FQYAKZXG2IY3IBVAMBYNQML7UCCRNRASPCVKNNCCYNCQSBFGARX4IS6W6",
            "supportedInterfaces": {
              "AudioPlayer": {},
              "Display": {
                "templateVersion": "1.0",
                "markupVersion": "1.0"
              }
            }
          },
          "apiEndpoint": "https://api.amazonalexa.com",
          "apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLjMyZWU0ZjgwLWEyYTUtNDdjYy1iYjhkLWFiNjI2ZTRhYWE0MyIsImV4cCI6MTUyODk5Mjk5MCwiaWF0IjoxNTI4OTg5MzkwLCJuYmYiOjE1Mjg5ODkzOTAsInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUc3RjNFUjJUWldSUVdPSk9DWk0zRFA0UlA2MzNMRlVGNzdNTjROSVVOMlBYU01BNEdVR1ZKQjVSTDZINlZNR1VSNVZYUTVXWk9NV05RUzU2S1BXTDJMUE9IVDZVR1IyNlBWWjdJUlZaTDdERTRERVNIWEdVSVpXU0dRNEZRWUFLWlhHMklZM0lCVkFNQllOUU1MN1VDQ1JOUkFTUENWS05OQ0NZTkNRU0JGR0FSWDRJUzZXNiIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFFRVNLQTQyVkJNVlpHQlQ2N1FDUzVEWFlQTEdBNVFITU02T1VJUTZKWUJPN1RMMjNGQ041Mk5IWUJWMlg0V0RPVU1KUVJTQlpYWlVMVUc2NUFIQlNINlI3TlpGU1JHSkNON09ZMzJQQkkyVDU1VVpDWDY2VUhDNVk2NVVWWkVORlpYSTVaSExBUVpLU1YzWkVMREIzM0pQRkIyMlRDSjRSUFdVV1Y2TExTUEpYRUlCN09SMkJORkQ2SVc2SVA1S1VHQVFENUZXTUtVMkdNSSJ9fQ.XFOs_8JZsdk5KTYXGx4PBSoTqtcstjMs_VjEbd8sfGfegUCCbMIc2ffH7Rrx2Gd-8qCaNSbrqiZoIIlF2Y6uQYZc0DonNt0KMf9vjLZnak7WVyx_K4Qt8oT0yg4dMBqirD7AQex7K-W9mxKMIJ-72qdP3G3qb6Hn_na_LTcDy3UL4kw1Y_-mxjHo6aVWCrNXWLkal-q_IrhPz7uh9BY-ZlHwvbpiZjf6gFbjG7FtMSzWR5RoR9T9WcVIh4aHYVj7APCioyLWvOV5ai7fRBwwHf97PkDKC1adtCptlqULmLYIxAmgCK4vuyyWE0--hKToGK3H1XFMBzlgDgKKulKKsA"
        }
      },
      request
    }, ctx)
    ctx.Promise
      .then(resp => { speechResponse = resp; done(); })
      .catch(err => { speechError = err; done(); })
  })
  describe("Week 1", function () {
    describe("Response structure is correct and the values match expected output", function () {
      it('and should not have errored', function () {
        expect(speechError).to.be.null
      })

      it('and should have a version', function () {
        expect(speechResponse.version).not.to.be.null
      })

      it('and should have a speechlet response', function () {
        expect(speechResponse.response).not.to.be.null
      })
      it("and should NOT end the alexa session and be ready for new input", function () {
        expect(speechResponse.response.shouldEndSession).not.to.be.null
        expect(speechResponse.response.shouldEndSession).to.be.false
      })
      describe("Should have a valid spoken response", function () {
        it("and a response comes back", () => {
          expect(speechResponse.response.outputSpeech).not.to.be.null;
        })
        it("and a text property", () => {
          expect(speechResponse.response.outputSpeech).to.have.property('text')
        })
        it("and speech text is valid", () => {
          expect(speechResponse.response.outputSpeech.text).to.equal(
            "Deal 500 damage with Sniper Rifles to opponents, Search 7 Chests in Haunted Hills,Use a Port-a-fort,Search F-O-R-T-N-I-T-E Letters, Follow the treasure map found in Tomato Town,3 Pistol Eliminations, Eliminate 3 opponents in Flush Factory"
          )
        })
      })
    })
    describe("Response should have a Card object with correct property types and names/values", function () {
      it("and Card object to contain a property name of type", () => {
        expect(speechResponse.response.card).not.to.be.null;
        expect(speechResponse.response.card).to.have.property("type");
      })
      it("and a property name of title with valid text", () => {
        expect(speechResponse.response.card.title).not.to.be.null;
        expect(speechResponse.response.card).to.have.property("title");
        expect(speechResponse.response.card.title).to.to.equal('Season 4 - Week 1 Challenges')
      })
      it("and a property name of text with valid text", () => {
        expect(speechResponse.response.card.text).not.to.be.null;
        expect(speechResponse.response.card).to.have.property("text");
        expect(speechResponse.response.card.text).to.to.equal(
          '•\tDeal 500 damage with Sniper Rifles to opponents\n•\t Search 7 Chests in Haunted Hills\n•\tUse a Port-a-fort\n•\tSearch F-O-R-T-N-I-T-E Letters\n•\t Follow the treasure map found in Tomato Town\n•\t3 Pistol Eliminations\n•\t Eliminate 3 opponents in Flush Factory'
        )
      })
    });
  })

})


// "type": "Standard",
// "title": "Season 4 - Week 1 Challenges",
// "text": "•\tDeal 500 damage with Sniper Rifles to opponents\n•\t Search 7 Chests in Haunted Hills\n•\tUse a Port-a-fort\n•\tSearch F-O-R-T-N-I-T-E Letters\n•\t Follow the treasure map found in Tomato Town\n•\t3 Pistol Eliminations\n•\t Eliminate 3 opponents in Flush Factory"
