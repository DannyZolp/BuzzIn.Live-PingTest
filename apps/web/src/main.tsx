import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  AppShell,
  Center,
  Header,
  Image,
  MantineProvider
} from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        header={
          <Header height={60}>
            <Center mt="xs">
              <Image src="logo.png" width={130}></Image>
            </Center>
          </Header>
        }
      >
        <App />
      </AppShell>
    </MantineProvider>
  </React.StrictMode>
);
