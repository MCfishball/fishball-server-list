"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
 const [onlinePlayers, setOnlinePlayers] =
  useState<Record<string, number>>({});
  const [darkMode, setDarkMode] = useState(true);
  const servers = [
    {  name: "Hypixel", ip: "mc.hypixel.net", players: "20000+" },
    { name: "PikaNetwork", ip: "play.pika-network.net", players: "3000+" },
    {  name: "MineBerry", ip: "mc.mineberry.org", players: "3000+" },
    {  name: "Minemen Club", ip: "na.minemen.club", players: "1500+" },
    {  name: "CubeCraft", ip: "play.cubecraft.net", players: "2000+" },
    {  name: "Jartex Network", ip: "play.jartexnetwork.com", players: "1800+" },
    {  name: "ManaCube", ip: "play.manacube.com", players: "1200+" },
    {  name: "BlocksMC", ip: "blocksmc.com", players: "1000+" },
    {  name: "MCC Island", ip: "play.mccisland.net", players: "5000+" },
    {  name: "Gamster", ip: "mc.gamster.org", players: "800+" },
    { name: "Complex Gaming", ip: "hub.mc-complex.com" },
{ name: "Purple Prison", ip: "purpleprison.net" },
{ name: "OPBlocks", ip: "play.opblocks.com" },
{ name: "MoxMC", ip: "moxmc.net" },
{ name: "InsanityCraft", ip: "play.insanitycraft.net" },
{ name: "Wild Prison", ip: "play.wildprison.net" },
{ name: "LemonCloud", ip: "play.lemoncloud.org" },
{ name: "Performium", ip: "mc.performium.net" },
{ name: "AkumaMC", ip: "akumamc.net" },
{ name: "Advancius", ip: "mc.advancius.net" },
{ name: "PvP Legacy", ip: "play.pvplegacy.net" },
{ name: "Vultex", ip: "mc.vultex.gg" },
{ name: "ColdPvP", ip: "coldpvp.com" },
{ name: "HappyCraft", ip: "happycraft.cc" },
  ];
  useEffect(() => {
  const cached = localStorage.getItem("fishballPlayers");

  if (cached) {
    setOnlinePlayers(JSON.parse(cached));
  }

  const fetchPlayers = async () => {
    try {
      const res = await fetch("/api/servers");
      
      const data = await res.json();

      setOnlinePlayers(data);

      localStorage.setItem(
        "fishballPlayers",
        JSON.stringify(data)
      );
    } catch (err) {
      console.error(err);
    }
  };

  fetchPlayers();

  const interval = setInterval(fetchPlayers, 30000);

  return () => clearInterval(interval);
}, []);
 const filteredServers = [...servers]
  .sort(
    (a, b) =>
      (onlinePlayers[b.ip] || 0) -
      (onlinePlayers[a.ip] || 0)
  )
  .filter((server) => {
    const keyword = search.toLowerCase();

    return (
      server.name.toLowerCase().includes(keyword) ||
      server.ip.toLowerCase().includes(keyword)
    );
  });

  return (
   <main

  className={`min-h-screen p-8 transition-all ${

    darkMode

      ? "bg-black text-white"

      : "bg-white text-black"

  }`}
  >
      <div className="max-w-5xl mx-auto">
       <div className="flex flex-col items-center mb-4">

  <img
  src="/fishball-logo.PNG"
  alt="FishBall Logo"
  className="mx-auto mb-6 w-40 h-40 object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]"
/>

  <div className="flex justify-center items-center gap-4">
    <div className="flex items-center justify-center gap-4 mb-3">
  <img
    src="/fishball-logo.PNG"
    alt="FishBall Logo"
    className="w-20 h-20 object-contain"
  />

  <h1

  className={`text-5xl md:text-6xl font-extrabold tracking-tight ${

    darkMode

      ? "text-white"

      : "text-black"

  }`}

>

  FishBall Server List

</h1>
</div>

    <a
      href="https://space.bilibili.com/3690976971327606"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-pink-500 hover:bg-pink-400 px-4 py-2 rounded-xl font-bold"
    >
      MC鱼蛋官方
    </a>
  </div>

</div>
<p className="text-center text-blue-400 text-3xl font-bold mb-8">
  Top Minecraft Servers
</p>
<p

  className={`text-center text-lg mb-8 ${

    darkMode

      ? "text-zinc-400"

      : "text-zinc-700"

  }`}

>
  Created & Maintained by
  <a
    href="https://space.bilibili.com/3690976971327606"
    target="_blank"
    rel="noopener noreferrer"
    className="text-pink-400 hover:text-pink-300 font-bold ml-2"
  >
    MC鱼蛋
  </a>
</p>
<div className="flex justify-center mb-8">

  <button

    onClick={() => setDarkMode(!darkMode)}

    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl font-bold"

  >

    {darkMode ? "☀️ 浅色模式" : "🌙 深色模式"}

  </button>

</div>

       


        <input
          type="text"
          placeholder="🔍 搜索服务器名称或IP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-4 rounded-xl mb-8 border ${

  darkMode

    ? "bg-zinc-900 border-zinc-700 text-white"

    : "bg-white border-gray-300 text-black"

}`}
        />

        {filteredServers.length === 0 && (
          <div className="text-center text-gray-500 text-xl">
            没有找到服务器
          </div>
        )}

        {filteredServers.map((server, index) => (
          <div
            
  key={server.ip}
           className={`rounded-2xl p-6 mb-4 flex justify-between items-center transition ${

  darkMode

    ? "bg-zinc-900 hover:bg-zinc-800"

    : "bg-gray-100 hover:bg-gray-200"

}`}
          >
            <div>
              <h2 className="text-2xl font-bold">
                {index === 0 && "🥇 "}
{index === 1 && "🥈 "}
{index === 2 && "🥉 "}
#{index + 1} {server.name}
              </h2>

              <p

  className={`mt-1 ${

    darkMode

      ? "text-gray-400"

      : "text-gray-700"

  }`}

>

  IP：{server.ip}

</p>
             <div className="flex items-center gap-2 mt-1">
  <div
    className={`w-3 h-3 rounded-full ${
      onlinePlayers[server.ip] > 0
        ? "bg-green-500"
        : "bg-gray-500"
    }`}
  />

  <span className="text-green-400">
    在线人数：
    {onlinePlayers[server.ip] === undefined
      ? " 加载中..."
      : ` ${onlinePlayers[server.ip]}`}
  </span>
</div>
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
