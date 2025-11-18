class TimeManager {
  constructor() {
    this.interval = null;
  }
  addToDate(duration) {
    const now = Date.now();
    const regex = /(\d+)(m|h|d|w)/g;

    let totalMs = 0;
    let match;

    while ((match = regex.exec(duration)) !== null) {
      const value = Number(match[1]);
      const unit = match[2];

      const msMap = {
        s: 60,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
        w: 7 * 24 * 60 * 60 * 1000,
      };

      totalMs += value * msMap[unit];
    }
    return new Date(now + totalMs);
  }

  scheduleAt(date, callback) {
    this.interval = setInterval(() => {
      if (Date.now() >= date.getTime()) {
        clearInterval(this.interval);
        callback();
      }
    }, 200);
  }

  cancelSchedule() {
    clearInterval(this.interval);
  }
}

export default TimeManager;
