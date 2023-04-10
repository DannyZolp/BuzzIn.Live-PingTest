import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useToken } from "../hooks/useToken";
import { api } from "../utils/api";

export const Login = () => {
  const { setToken } = useToken();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(api("/login"), {
        password,
        name
      })
      .then(({ data: { token } }) => {
        setToken(token);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text>Please login.</Text>
      <TextInput
        label="Name of Client"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <PasswordInput
        label="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></PasswordInput>
      <Button mt="sm" loading={loading} disabled={loading} type="submit">
        Login
      </Button>
    </form>
  );
};
