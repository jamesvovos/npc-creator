module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/intents",
        destination: "http://127.0.0.1:8000/intents/",
      },
      {
        source: "/intents/create",
        destination: "http://127.0.0.1:8000/intents/create/",
      },
      {
        source: "/intents/7",
        destination: "http://127.0.0.1:8000/intents/7",
      },
    ];
  };
  return {
    rewrites,
  };
};
