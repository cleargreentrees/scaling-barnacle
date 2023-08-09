// Creating a list of random words
const words = ["hello", "world", "banana", "apple", "orange", "pizza"];

// Exporting the commands as an object
module.exports = {
  // The help command
  help: (interaction) => {
    // Creating an embed with color blue, title "Command Usage", and a footer saying "Cool bot made by Bing"
    const embed = {
      color: 3447003,
      title: "Command Usage",
      footer: {
        text: "Cool bot made by Bing",
      },
      fields: [
        // Adding fields for each command with their description and usage
        {
          name: "/help",
          value: "Shows this message.",
        },
        {
          name: "/chat [type] [message]",
          value:
            "Sends a message to the bot and gets a response. The type can be either clone or normal.",
        },
        {
          name: "/ping",
          value: "Shows the bot's ping in milliseconds.",
        },
        {
          name: "/server",
          value: "Shows the server information.",
        },
        {
          name: "/words",
          value: "Shows a random word from a list.",
        },
      ],
    };

    // Replying with the embed
    interaction.reply({ embeds: [embed] });
  },

  // The chat command
  chat: async (interaction, axios) => {
    // Getting the type and message arguments from the interaction options
    const type = interaction.options.getString("type");
    const message = interaction.options.getString("message");

    // Validating the type argument and checking if it is either clone or normal
    if (type !== "clone" && type !== "normal") {
      // Replying with an embed with title "Error" and description "You entered the wrong type"
      const embed = {
        color: 16711680,
        title: "Error",
        description: "You entered the wrong type.",
      };
      return interaction.reply({ embeds: [embed] });
    }

    // Using axios to make a request to example.com with the parameters
    const id = interaction.user.id;
    const url = `${process.env.api}msg=${message}&id=${id}&mode=${type}&internet=on`;
    const response = await axios.get(url);

    // Getting the response from the api and replying with an embed with title "Bot's Message" and description as the api's response
    const embed = {
      color: 3447003,
      title: "Bot's Message",
      description: response.data,
      footer: {
        text: "Cool bot made by Bing",
      },
    };
    interaction.reply({ embeds: [embed] });
  },

  // The ping command
  ping: (interaction) => {
    // Replying with an embed with title "Pong!" and description as the bot's ping in milliseconds
    const embed = {
      color: 3447003,
      title: "Pong!",
      description: `${interaction.client.ws.ping} ms`,
    };
    interaction.reply({ embeds: [embed] });
  },

  // The server command
  server: (interaction) => {
    // Getting the server information from the interaction guild property
    const guild = interaction.guild;

    // Replying with an embed with color blue, title "Server Info", and a footer saying "Cool bot made by Bing"
    const embed = {
      color: 3447003,
      title: "Server Info",
      footer: {
        text: "Cool bot made by Bing",
      },
      fields: [
        // Adding fields for the server name, creator name and id, creation date, country (or n/a if none), member count, bot count, channel count (text, voice, and stage), and role count
        {
          name: "Name",
          value: guild.name,
        },
        {
          name: "Creator",
          value: `${guild.owner.user.username} (${guild.ownerId})`,
        },
        {
          name: "Created",
          value: guild.createdAt.toDateString(),
        },
        {
          name: "Country",
          value: guild.preferredLocale || "n/a",
        },
        {
          name: "Members",
          value: guild.memberCount,
        },
        {
          name: "Bots",
          value: guild.members.cache.filter((m) => m.user.bot).size,
        },
        {
          name: "Channels",
          value: `Text: ${guild.channels.cache.filter(
            (c) => c.type === "GUILD_TEXT"
          ).size}\nVoice: ${guild.channels.cache.filter(
            (c) => c.type === "GUILD_VOICE"
          ).size}\nStage: ${guild.channels.cache.filter(
            (c) => c.type === "GUILD_STAGE_VOICE"
          ).size}`,
        },
        {
          name: "Roles",
          value: guild.roles.cache.size,
        },
      ],
    };

    // Replying with the embed
    interaction.reply({ embeds: [embed] });
  },

  // The words command
  words: (interaction) => {
    // Using Math.random() to select a random word from the list
    const word = words[Math.floor(Math.random() * words.length)];

    // Replying with an embed with title "Random Word" and description as the selected word
    const embed = {
      color: 3447003,
      title: "Random Word",
      description: word,
    };
    interaction.reply({ embeds: [embed] });
  },
};
