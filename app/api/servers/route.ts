import { NextResponse } from "next/server";

const servers = [

  "mc.hypixel.net",

  "play.pika-network.net",

  "mc.mineberry.org",

  "na.minemen.club",

  "play.cubecraft.net",

  "play.jartexnetwork.com",

  "play.manacube.com",

  "blocksmc.com",

  "play.mccisland.net",

  "mc.gamster.org",

  "hub.mc-complex.com",

  "purpleprison.net",

  "play.opblocks.com",

  "moxmc.net",

  "play.insanitycraft.net",

  "play.wildprison.net",

  "play.lemoncloud.org",

  "mc.performium.net",

  "akumamc.net",

  "mc.advancius.net",

  "play.pvplegacy.net",

  "mc.vultex.gg",

  "coldpvp.com",

  "happycraft.cc",
];

export async function GET() {
  const results: Record<string, number> = {};

  for (const ip of servers) {
    try {
     const res = await fetch(
  `https://api.mcsrvstat.us/3/${ip}`,
  {
    next: {
      revalidate: 300, // 5分钟缓存
    },
  }
);
      const data = await res.json();

      results[ip] = data.players?.online || 0;
    } catch {
      results[ip] = 0;
    }
  }

  return NextResponse.json(results);
}