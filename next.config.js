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
        source: "/intents/:id",
        destination: "http://127.0.0.1:8000/intents/:id",
      },
      {
        source: "/projects",
        destination: "http://127.0.0.1:8000/projects/",
      },
      {
        source: "/users/:userId/projects",
        destination: "http://127.0.0.1:8000/users/:userId/projects/",
      },
      {
        source: "/projects/:id",
        destination: "http://127.0.0.1:8000/projects/:id/",
      },
      {
        source: "/npcs",
        destination: "http://127.0.0.1:8000/npcs/",
      },
      {
        source: "/projects/:projectId/npc",
        destination: "http://127.0.0.1:8000/projects/:projectId/npc/",
      },
      {
        source: "/npcs/:id",
        destination: "http://127.0.0.1:8000/npcs/:id/",
      },
      {
        source: "/npcs/:id",
        destination: "http://127.0.0.1:8000/npcs/:id/",
      },
      {
        source: "/npcs/:id/avatar",
        destination: "http://127.0.0.1:8000/npcs/:id/avatar/",
      },
    ];
  };
  return {
    rewrites,
  };
};
