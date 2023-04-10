import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useToken } from "../hooks/useToken";

export const Client = () => {
  const { token } = useToken();

  const [offset, setOffset] = useState<number>();

  useEffect(() => {
    Promise.all(
      new Array(20).fill(null).map(async () => {
        const startTime = new Date().getTime();
        const {
          data: { time }
        } = await axios.get(api("/time"), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const endTime = new Date().getTime();
        const timeToServer = (endTime - startTime) / 2;
        const actualServerTime = time - timeToServer;
        const offset = endTime - actualServerTime;

        return offset;
      })
    ).then((offsets) => {
      const mid = Math.floor(offsets.length / 2);
      const sortedOffsets = offsets.sort((a, b) => a - b);
      setOffset(
        offsets.length % 2 !== 0
          ? sortedOffsets[mid]
          : (sortedOffsets[mid - 1] + sortedOffsets[mid]) / 2
      );
    });
  });

  return <>{offset}</>;
};
