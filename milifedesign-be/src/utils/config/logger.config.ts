import * as winston from "winston";
import { utilities } from "nest-winston";

const colors = {
  error: "red",
  warn: "yellow",
  debug: "green",
  verbose: "white",
  http: "magenta",
};

export const loggerConfig = (logLevel?: string, env?: string) => {
  let level: string = logLevel;

  if (!level) level = env === "development" ? "verbose" : "http";

  return {
    transports: [
      new winston.transports.Console({
        level: level,
        format: winston.format.combine(
          winston.format.timestamp({ format: "dd-mm-YYYY hh:MM:ss" }),
          winston.format.errors({ stack: true }),
          winston.format.colorize({ colors }),
          utilities.format.nestLike("BlueApp", {
            prettyPrint: true,
          })
        ),
      }),
    ],
  };
};
