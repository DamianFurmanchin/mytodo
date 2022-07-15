class Rover {
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    (this.position = position),
      (this.mode = mode),
      (this.generatorWatts = generatorWatts);
  }
  receiveMessage(message) {
    let response = {
      message: message.name,
      results: [],
    };
    for (let i = 0; i < message.commands; i++) {
      if (message.commands === "STATUS_CHECK") {
        results = results.push({
          completed: true,
          roverStatus: {
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts,
          },
        });
      } else if (message.commands === ["MODE_CHANGE", "LOW_POWER"]) {
        results = results.push({
          completed: true,
          roverStatus: {
            position: this.position,
            mode: "LOW_POWER",
            generatorWatts: this.generatorWatts,
          },
        });
      } else if (message.commands === ["MODE_CHANGE", "NORMAL"]) {
        results = results.push({
          completed: true,
          roverStatus: {
            position: this.position,
            mode: "NORMAL",
            generatorWatts: this.generatorWatts,
          },
        });
      } else if (message.commands === "MOVE") {
        if (this.mode === "LOW_POWER") {
          results = results.push({
            completed: false,
            roverStatus: {
              position: this.position,
              mode: this.mode,
              generatorWatts: this.generatorWatts,
            },
          });
        }
        if (this.mode === "NORMAL") {
          results = results.push({
            completed: true,
            roverStatus: {
              position: this.position,
              mode: this.mode,
              generatorWatts: this.generatorWatts,
            },
          });
        }
      }
    }
    return response;
  }
}

module.exports = Rover;
