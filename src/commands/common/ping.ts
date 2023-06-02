import { Command } from "../../struct/types/Command";

export default new Command({
  name: "ping",
  description: "Responde com pong",
  exec({ interaction }) {
    interaction.reply({
      ephemeral: true,
      content: "Pong!",
    });
  },
});
