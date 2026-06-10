"use client";

import { useEffect, useState } from "react";

type Server = {
  name: string;
  ip: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, boolean>>({});

  const servers: Server[] = [
    { name: "Hypixel", ip: "mc.hypixel.net" },
    { name: "PikaNetwork", ip: "play.pika-network.net" },
    { name: "MineBerry", ip: "mc.mineberry.org" },
    { name: "Minemen Club", ip: "na.minemen.club" },
    { name: "CubeCraft", ip: "play.cubecraft.net" },
    { name: "Jartex Network", ip: "play.jartexnetwork.com" },
    { name: "ManaCube", ip: "play.manacube.com" },
    { name: "BlocksMC", ip: "blocksmc.com" },
    { name: "MCC Island", ip: "play.mccisland.net" },
    { name: "Gamster", ip: "mc.gamster.org" },
  ];

  useEffect(() => {
    const loadServers = async () => {
      for (const server of servers) {
        try {
          const res = await fetch(
            `https://api.mcsrvstat.us/3/${server.ip}`
          );

          const data = await res.json();

          setPlayers((prev) => ({
            ...prev,
            [server.ip]: data.players?.online?.toString() ?? "0",
          }));

          setStatus((prev) => ({
            ...prev,
            [server.ip]: data.online ?? false,
          }));
        } catch {
          setPlayers((prev) => ({
            ...prev,
            [server.ip]: "0",
          }));

          setStatus((prev) => ({
            ...prev,
            [server.ip]: false,
          }));
        }
      }
    };

    loadServers();

    const interval = setInterval(loadServers, 60000);

    return () => clearInterval(interval);
  }, []);

  const filteredServers = servers
    .filter((server) => {
      const keyword = search.toLowerCase();

      return (
        server.name.toLowerCase().includes(keyword) ||
        server.ip.toLowerCase().includes(keyword)
      );
    })
    .sort((a, b) => {
      const playersA = Number(players[a.ip] || 0);
      const playersB = Number(players[b.ip] || 0);

      return playersB - playersA;
    });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2">
          🐟 FishBall Server List
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Live Minecraft Server Tracker
        </p>

        <input
          type="text"
          placeholder="🔍 搜索服务器名称或IP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 mb-8"
        />

        {filteredServers.map((server, index) => (
          <div
            key={server.ip}
            className="bg-zinc-900 rounded-2xl p-6 mb-4 flex justify-between items-center hover:bg-zinc-800 transition"
          >
            <div>
              <h2 className="text-2xl font-bold">
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                #{index + 1} {server.name}
              </h2>

              <p className="text-gray-400">
                IP：{server.ip}
              </p>

              <p className="text-green-400 font-semibold">
                在线人数：
                {players[server.ip] ?? "加载中..."}
              </p>

              <p>
                状态：
                {status[server.ip] ? "🟢 在线" : "🔴 离线"}
              </p>
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl"
              onClick={() => {
                navigator.clipboard.writeText(server.ip);
                alert(`已复制 ${server.ip}`);
              }}
            >
              复制IP
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}