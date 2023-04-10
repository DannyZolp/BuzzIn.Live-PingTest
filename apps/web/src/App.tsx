import { Container, Title, Text, Group, Button } from "@mantine/core";
import { Login } from "./components/Login";
import { useToken } from "./hooks/useToken";
import { useState } from "react";
import { Client } from "./components/Client";

type DeviceType = "client" | "manager";

export default function App() {
  const { token } = useToken();

  const [type, setType] = useState<DeviceType>();

  return (
    <Container>
      <Title>BuzzIn.Live Ping Tester</Title>
      {token ? null : <Login></Login>}
      {token && type === undefined ? (
        <>
          <Text>Will this device be a...</Text>
          <Group>
            <Button onClick={() => setType("client")}>Client</Button>
            <Button onClick={() => setType("manager")}>Manager</Button>
          </Group>
        </>
      ) : null}
      {type === "client" ? <Client /> : null}
    </Container>
  );
}
