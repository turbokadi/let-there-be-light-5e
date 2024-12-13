export const Logger = {
  moduleName: "letThereBeLight5e",

  info: (message, ...args) => {
    console.info(`%c[${Logger.moduleName}] INFO:`, "color: magenta", message, ...args);
  },

  warn: (message, ...args) => {
    console.warn(`%c[${Logger.moduleName}] WARN:`, "color: orange", message, ...args);
  },

  error: (message, ...args) => {
    console.error(`%c[${Logger.moduleName}] ERROR:`, "color: red", message, ...args);
  },
};

export default Logger;