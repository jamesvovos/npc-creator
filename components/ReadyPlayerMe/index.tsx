// Code referenced from: https://medium.com/quark-works/how-to-create-ready-player-me-in-react-be7a7697b186
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

type Props = {
  id: number;
};

export default function ReadyPlayerMe({ id }: Props) {
  const subdomain = "npc-creator";
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const [avatarImageUrl, setAvatarImageUrl] = useState("");
  const [showIFrame, setShowIFrame] = useState(true);
  const [avatarDownloadUrl, setAvatarDownloadUrl] = useState("");
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const [eventReceived, setEventReceived] = useState(false);

  useEffect(() => {
    if (eventReceived) {
      const updatedAvatar = {
        avatar: avatarImageUrl,
      };
      // Send the PUT request to update the NPC's avatar
      axios.put(`/npcs/${id}/avatar/`, updatedAvatar);
    }
  }, [avatarImageUrl, eventReceived]);

  useEffect(() => {
    let iFrame = iFrameRef.current;
    if (iFrame) {
      iFrame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;
    }

    function subscribe(event: any) {
      const json = parse(event);
      if (json?.source !== "readyplayerme") {
        return;
      }
      // Subscribe to all events sent from Ready Player Me
      // once frame is ready
      if (json.eventName === "v1.frame.ready") {
        let iFrame = iFrameRef.current;
        if (iFrame && iFrame.contentWindow) {
          iFrame.contentWindow.postMessage(
            JSON.stringify({
              target: "readyplayerme",
              type: "subscribe",
              eventName: "v1.**",
            }),
            "*"
          );
        }
      }
      // Get avatar GLB URL
      if (json.eventName === "v1.avatar.exported") {
        setAvatarDownloadUrl(json.data.url);
        setAvatarImageUrl(
          json.data.url.replace(".glb", ".png?scene=fullbody-portrait-v1")
        );
        setEventReceived(true);
        // setShowIFrame(false);
      }
      // Get user id
      if (json.eventName === "v1.user.set") {
        console.log(`User with id ${json.data.id} set:
  ${JSON.stringify(json)}`);
      }
    }

    window.addEventListener("message", subscribe);
    return () => {
      window.removeEventListener("message", subscribe);
    };
  }, []);

  function parse(event: any) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }

  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <iframe
        allow="geolocation; camera *; microphone *; clipboard-write"
        className="iFrame"
        id="frame"
        ref={iFrameRef}
        style={{
          display: `${showIFrame ? "block" : "none"}`,
          position: "relative",
          zIndex: 1,
        }}
        title={"Ready Player Me"}
      />
    </div>
  );
}
