import { ConfigFileOptions, EmitModes, Modes } from "@odata2ts/odata2ts";

const config: ConfigFileOptions = {
  mode: Modes.service,
  allowRenaming: true,
  services: {
    trippin: {
      source: "resource/trippin.xml",
      output: ".vitepress/theme/model/trippin",
    }
  }
}

export default config;