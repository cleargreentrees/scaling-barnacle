// Importing and initializing the handler
const { SlashCommandHandler } = require("djs-slash-commands");
const { Client, Intents, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
const { ActivityType } = require("discord.js");

// Creating the client and logging in
const client = new Client({ intents: ["Guilds"]});
client.login(process.env.token);
console.log("bot is online")

// Initializing the slash command handler
client.SlashCommands = new SlashCommandHandler(client);

// Receiving the interaction
client.on("slashCreate", async (interaction) => {
  // Importing the commands from commands.js
  const commands = require("./commands.js");

  // Checking the command name and executing the corresponding function
  switch (interaction.commandName) {
    case "help":
      commands.help(interaction);
      break;
    case "chat":
      commands.chat(interaction, axios);
      break;
    case "ping":
      commands.ping(interaction);
      break;
    case "server":
      commands.server(interaction);
      break;
    case "words":
      commands.words(interaction);
      break;
    default:
      interaction.reply("Unknown command.");
  }
});


// Creating a list of activities for the bot
const activities = [
  {
    name: "the grammar debate",
    type: ActivityType.Competing
  },
  {
    name: "With Bing",
    type: ActivityType.Playing
  },
  {
    name: "you, im inside your walls :)",
    type: ActivityType.Watching
  },
  {
    name: "the neighbor next door",
    type: ActivityType.Listening
  },
];

// Setting a variable to keep track of the current activity index
let index = 0;

// Setting the bot's status to the first activity in the list when it is ready
client.on("ready", () => {
  client.user.setPresence({
    status: "invisible",
    activities: [activities[index]],
  });

  // Using setInterval to change the bot's status every 5 seconds
  setInterval(() => {
    // Incrementing the index by one
    index++;

    // Checking if the index is out of bounds
    if (index >= activities.length) {
      // Resetting the index to zero
      index = 0;
    }

    // Setting the bot's status to the next activity in the list
    client.user.setPresence({
      status: "online",
      activities: [activities[index]],
    });
  }, 10000); // 10000 milliseconds = 10 seconds
});
