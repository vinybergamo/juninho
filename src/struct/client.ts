import {
  ApplicationCommandDataResolvable,
  BitFieldResolvable,
  Collection,
  Client as DiscordClient,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
} from "discord.js";
import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { CommandType } from "./types/Command";
config();

const fileFilter = (filename: string) =>
  filename.endsWith(".ts") || filename.endsWith(".js");

export class Client extends DiscordClient {
  public commands: Collection<String, CommandType> = new Collection();

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
    this.registerModules();
    this.login(process.env.TOKEN);
    this.once("ready", this.whenReady);
  }

  private registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
    this.application?.commands
      .set(commands)
      .catch((e) =>
        console.log(
          `An error occurred while trying to set the Slash Command (/): \n${e}`
            .red
        )
      );
  }

  private registerModules() {
    const slashCommands: Array<ApplicationCommandDataResolvable> = new Array();

    const commandsPath = path.join(__dirname, "..", "commands");

    fs.readdirSync(commandsPath).forEach((dir) => {
      fs.readdirSync(commandsPath + `/${dir}/`)
        .filter(fileFilter)
        .forEach(async (filename) => {
          const command: CommandType = (
            await import(`../commands/${dir}/${filename}`)
          )?.default;

          const { name, buttons, selects, modals, rolesSelects } = command;

          if (name) {
            this.commands.set(name, command);
            slashCommands.push(command);
          }
        });
    });

    this.on("ready", () => {
      this.registerCommands(slashCommands);
    });
  }

  private whenReady() {
    console.clear();
    console.log("Bot is ready!".green);
  }
}
