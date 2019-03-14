exports.devProxy = {
  "/api": {
    target: "http://localhost:3030",
  },
  "/socket.io": {
    target: "http://localhost:3030",
    ws: true
  }
};
