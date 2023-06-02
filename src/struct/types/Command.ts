import {
  ApplicationCommandData,
  ButtonInteraction,
  Collection,
  CommandInteraction,
  CommandInteractionOptionResolver,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import { Client } from "../client";

interface CommandProps {
  client: Client;
  interaction: CommandInteraction;
  options: CommandInteractionOptionResolver;
}

export type ComponentsButton = Collection<
  string,
  (interaction: ButtonInteraction) => any
>;

export type ComponentsStringSelecMenu = Collection<
  string,
  (interaction: StringSelectMenuInteraction) => any
>;

export type ComponentsRolesSelecMenu = Collection<
  string,
  (interaction: RoleSelectMenuInteraction) => any
>;

export type ComponentsModal = Collection<
  string,
  (interaction: ModalSubmitInteraction) => any
>;

interface CommandComponents {
  buttons?: ComponentsButton;
  selects?: ComponentsStringSelecMenu;
  rolesSelects?: ComponentsRolesSelecMenu;
  modals?: ComponentsModal;
}

export type CommandType = ApplicationCommandData &
  CommandComponents & {
    exec(interaction: CommandProps): any;
  };

export class Command {
  constructor(options: CommandType) {
    options.dmPermission = false;
    Object.assign(this, options);
  }
}
