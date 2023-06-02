import {
  BitFieldResolvable,
  Client as DiscordClient,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
} from "discord.js";
import { config } from "dotenv";
config();

export class Client extends DiscordClient {
  constructor() {
    super({
      intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
        GatewayIntentsString,
        number
      >,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
      failIfNotExists: false,
    });
  }

  public async start() {
    this.login(process.env.TOKEN);
    this.once("ready", this.whenReady);
  }

  private whenReady() {
    console.clear();
    console.log("Bot is ready!".green);
  }
}
