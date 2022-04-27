import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { getSdk } from "./generated/graphql";
import randomString from "random-string";
import io from "socket.io-client";
import download from "downloadjs";

export default function App() {
  const [connecting, setConnecting] = useState(false);
  const [pinging, setPinging] = useState<boolean>(false);

  const [testId, setTestId] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [averagePing, setAveragePing] = useState<number>(-1);
  const [deltaPings, setDeltaPings] = useState<number[]>([]);
  const [delay, setDelay] = useState<string>("4000");

  const sdk = getSdk(
    new GraphQLClient(
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/graphql"
        : "https://api.buzzin.dannyzolp.com/graphql",
      {
        headers: {
          authorization: testId
        }
      }
    )
  );

  const registerClient = () => {
    setConnecting(true);
    sdk.register().then((res) => {
      setTestId(res.register);
      setConnecting(false);
    });
  };

  const getGameCode = async () => {
    const { startTest } = await sdk.startTest();
    setGameCode(startTest);
    return startTest;
  };

  const runTest = async () => {
    const serverTime = (await sdk.time()).time;

    const diff = serverTime - new Date().getTime();

    setPinging(true);

    const gameCode = await getGameCode();

    setAveragePing(-1);

    const socket = io.connect("https://buzzin.live", {
      transports: ["websocket"]
    });

    socket.on("connect_error", (err: any) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("connect", () => {
      socket.emit("playerConnect", {
        username: randomString(15),
        code: gameCode,
        id: false
      });
    });

    socket.on("joinedGame", async () => {
      let localTimestamps = [] as number[];

      for (let i = 0; i < 20; i++) {
        localTimestamps.push(new Date().getTime() + diff);
        socket.emit("buzz");
        await new Promise((res) => setTimeout(res, Number.parseInt(delay)));
      }

      socket.disconnect();
      await new Promise((res) => setTimeout(res, 100));
      const { me } = await sdk.me();

      let t_timeDelta = 0;
      let a_timeDeltas = [] as number[];

      me.timestamps.map((s_time, idx) => {
        t_timeDelta += s_time - localTimestamps[idx];
        a_timeDeltas.push(s_time - localTimestamps[idx]);
      });

      setDeltaPings(a_timeDeltas);
      setAveragePing(t_timeDelta / 20);
      setPinging(false);
    });
  };

  return (
    <main className="is-flex is-align-items-center" style={{ height: "80vh" }}>
      <div
        className="box"
        style={{ marginInline: "auto", width: "min(100% - 2rem, 600px)" }}
      >
        <div className="has-text-centered">
          <h1 className="title" style={{ color: "#007bff" }}>
            Buzz<em>In</em>.live
          </h1>
          <h2 className="subtitle">Ping Tester</h2>
        </div>
        {testId.length > 0 ? (
          <>
            <p style={{ color: "hsl(153deg, 53%, 53%)", margin: "10px 0" }}>
              Connected to the server!
            </p>
            <div className="field has-text-left">
              <label className="label" htmlFor="spacing">
                Time in Between Pings (ms)
              </label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Default: 4000"
                  type="text"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                />
              </div>
            </div>
            {gameCode.length > 0 ? (
              <h3 className="subtitle">
                Game Code: <code>{gameCode}</code>
              </h3>
            ) : null}
            {averagePing > -1 ? (
              <h3 className="subtitle">
                Average Ping: <strong>{averagePing}ms</strong>
              </h3>
            ) : null}
            <div className="buttons">
              <button
                className={`button is-success ${pinging ? "is-loading" : ""}`}
                disabled={pinging}
                onClick={runTest}
              >
                Start Test
              </button>
              {deltaPings.length >= 20 ? (
                <button
                  className="button is-link"
                  onClick={() => {
                    download(deltaPings.join(","), "data.csv", "text/plain");
                  }}
                >
                  Download Results
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <button
            className={`button is-link ${connecting ? "is-loading" : ""}`}
            disabled={connecting}
            onClick={registerClient}
          >
            Connect to Server
          </button>
        )}
      </div>
    </main>
  );
}
