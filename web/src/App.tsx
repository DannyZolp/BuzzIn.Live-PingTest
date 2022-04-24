import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { getSdk } from "./generated/graphql";
import randomString from "random-string";
import io from "socket.io-client";
import download from "downloadjs";

export default function App() {
  const [testId, setTestId] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [averagePing, setAveragePing] = useState<number>(-1);
  const [deltaPings, setDeltaPings] = useState<number[]>([]);
  const [delay, setDelay] = useState<number>(4000);
  const [pinging, setPinging] = useState<boolean>(false);

  const sdk = getSdk(
    new GraphQLClient("http://api.buzzin.dannyzolp.com/graphql", {
      headers: {
        authorization: testId
      }
    })
  );

  const registerClient = () => {
    sdk.register().then((res) => {
      setTestId(res.register);
    });
  };

  const getGameCode = async () => {
    const { startTest } = await sdk.startTest();
    setGameCode(startTest);
    return startTest;
  };

  const runTest = async () => {
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
      // console.log("connected");
      socket.emit("playerConnect", {
        username: randomString(15),
        code: gameCode,
        id: false
      });
    });

    socket.on("joinedGame", async () => {
      let localTimestamps = [] as number[];
      for (let i = 0; i < 20; i++) {
        localTimestamps.push(new Date().getTime());
        socket.emit("buzz");
        await new Promise((res) => setTimeout(res, 4000));
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
    <div style={{ textAlign: "center" }}>
      <h1>BuzzIn.Live Ping Tester</h1>
      {testId.length === 0 ? (
        <button onClick={registerClient}>Connect</button>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50vw",
              textAlign: "left",
              alignItems: "center"
            }}
          >
            <h2>
              Test ID: <code>{testId}</code>
            </h2>
            <label htmlFor="delay">Delay between requests (ms)</label>
            <input
              id="delay"
              type="number"
              placeholder="Default: 4000ms (4s)"
              onChange={(e) => setDelay(Number.parseInt(e.target.value))}
              value={delay.toString()}
            />
          </div>
          {gameCode ? (
            <h2>
              Game Code: <code>{gameCode}</code>
            </h2>
          ) : null}
          {averagePing > -1 ? (
            <h2>
              Average Ping:{" "}
              <strong>{averagePing < 0 ? 0 : averagePing}ms</strong>
            </h2>
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <button onClick={runTest} disabled={pinging}>
              {pinging
                ? "Pinging..."
                : `Run ${averagePing > -1 ? "Another" : ""} Test`}
            </button>
            {!pinging && averagePing > -1 ? (
              <button
                onClick={() => {
                  download(deltaPings.join(","), "data.csv", "text/plain");
                }}
              >
                Download Results
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
