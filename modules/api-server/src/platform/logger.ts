import { createLogger, format, transports } from "winston";
import chalk from "chalk";

const consoleFormat = format.combine(
    format(info => {
        info.level = info.level.toUpperCase();

        return info;
    })(),

    format.splat(),
    format.colorize(),
    format.timestamp({ format: "YY-MM-DD HH:mm:ss" }),
    format.printf(info => `${chalk.gray(`[${info.timestamp}]`)} ${info.level}: ${chalk.cyan(info.message)}`)
);

export const logger = createLogger({
    format: format.prettyPrint(),
    transports: [
        new transports.Console({ format: consoleFormat })
    ]
});
