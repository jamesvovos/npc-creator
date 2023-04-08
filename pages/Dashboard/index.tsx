import axios from "axios";
import React, { useState, useEffect } from "react";

interface Intent {
  id: number;
  tag: string;
  patterns: Pattern[];
  responses: Response[];
}

interface Pattern {
  text: string;
}

interface Response {
  text: string;
}

export default function Dashboard(): JSX.Element {
  const [intents, setIntents] = useState<Intent[]>([]);

  useEffect(() => {
    axios
      .get<Intent[]>("/intents")
      .then((response) => setIntents(response.data));
  }, []);

  return (
    <div>
      {intents.map((intent) => (
        <div key={intent.id}>
          <h3>{intent.tag}</h3>
          <h4>Patterns:</h4>
          <ul>
            {intent.patterns.map((pattern, index) => (
              <li key={index}>{pattern.text}</li>
            ))}
          </ul>
          <h4>Responses:</h4>
          <ul>
            {intent.responses.map((response, index) => (
              <li key={index}>{response.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
