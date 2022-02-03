
const fs = require("fs");
let raw = fs.readFileSync("nextcommand.json");
let questions = JSON.parse(raw);
const { App } = require("@slack/bolt");
const { modules } = require("./nextcommand.json");

require("dotenv").config();
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN,
});

var modNum = 0 


app.command("/next", async ({ command, ack, say }) => {
  try {
    await ack();
    let message = { blocks: [] };
    questions.modules[modNum].children.map((questions) => {
      message.blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: questions.prompt,
          },
          
        },
        

       
      );
    });
    say(questions.modules[modNum].description);
    say(message);
    modNum += 1; 
    
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

(async () => {
  const port = 3000;
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

app.message("hey", async ({ command, say }) => {
  try {
    say("Yaaay! that command works!");
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});
