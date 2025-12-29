"use client";

import { useEffect } from "react";

import * as ChannelService from "@channel.io/channel-web-sdk-loader";

export function ChannelTalk() {
  useEffect(() => {
    const pluginKey = process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY;

    if (!pluginKey) {
      console.warn("채널톡 플러그인 키가 설정되지 않았습니다.");
      return;
    }

    ChannelService.loadScript();

    ChannelService.boot({
      pluginKey,
    });
  }, []);

  return null;
}
