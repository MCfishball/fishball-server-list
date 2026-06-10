"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const servers = [
    { rank: 1, name: "Hypixel", ip: "mc.hypixel.net", players: "20000+" },
    { rank: 2, name: "PikaNetwork", ip: "play.pika-network.net", players: "3000+" },
    { rank: 3, name: "MineBerry", ip: "mc.mineberry.org", players: "3000+" },
    { rank: 4, name: "Minemen Club", ip: "na.minemen.club", players: "1500+" },
    { rank: 5, name: "CubeCraft", ip: "play.cubecraft.net", players: "2000+" },
    { rank: 6, name: "Jartex Network", ip: "play.jartexnetwork.com", players: "1800+" },
    { rank: 7, name: "ManaCube", ip: "play.manacube.com", players: "1200+" },
    { rank: 8, name: "BlocksMC", ip: "blocksmc.com", players: "1000+" },
    { rank: 9, name: "MCC Island", ip: "play.mccisland.net", players: "5000+" },
    { rank: 10, name: "Gamster", ip: "mc.gamster.org", players: "800+" },
  ];

  const filteredServers = servers.filter((server) => {
    const keyword = search.toLowerCase();

    return (
      server.name.toLowerCase().includes(keyword) ||
      server.ip.toLowerCase().includes(keyword)
    );
  });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2">
          FishBall Server List
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Top Minecraft Servers
        </p>

        <input
          type="text"
          placeholder="🔍 搜索服务器名称或IP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 mb-8"
        />

        {filteredServers.length === 0 && (
          <div className="text-center text-gray-500 text-xl">
            没有找到服务器
          </div>
        )}

        {filteredServers.map((server) => (
          <div
            key={server.rank}
            className="bg-zinc-900 rounded-2xl p-6 mb-4 flex justify-between items-center hover:bg-zinc-800 transition"
          >
            <div>
              <h2 className="text-2xl font-bold">
                {server.rank === 1 && "🥇 "}
                {server.rank === 2 && "🥈 "}
                {server.rank === 3 && "🥉 "}
                #{server.rank} {server.name}
              </h2>

              <p className="text-gray-400 mt-1">
                IP：{server.ip}
              </p>

              <p className="text-green-400 mt-1">
                在线人数：{server.players}
              </p>
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-bold"
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
