const { App } = require("@slack/bolt");
const { modules } = require("./nextcommand.json")

require("dotenv").config();
// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN,
});


var nextCount = 0; 
var promptCount = 0


app.command("/next", async ({ command, ack, say }) => {
  if (promptCount == 0 ){
  try {
    await ack();
    say(modules[nextCount].name +' - ' + modules[nextCount].description)
  
    promptCount += 1; 
    
    if (nextCount == 16) {
      nextCount = 0;
    }
  } catch (error) {
    console.log("err");
    console.error(error);

  }
  ;
}


else {
  try {
    await ack();
    say(modules[nextCount].children[promptCount-1].prompt);
    promptCount += 1;
    
    if (promptCount > modules[nextCount].children.length) {
      promptCount = 0;
      nextCount += 1; 
    }
  } catch (error) {
    console.log("err");
    console.error(error);
  }



}
});

(async () => {
  const port = 3000;
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
