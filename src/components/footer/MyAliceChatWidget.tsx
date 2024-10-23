import React, { useEffect } from "react";

const MyAliceChatWidget: React.FC = () => {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://livechat.myalice.ai/index.js";

    const chatDiv: HTMLDivElement = document.createElement("div");
    chatDiv.id = "myAliceWebChat";

    const scripts: NodeListOf<HTMLScriptElement> =
      document.body.querySelectorAll("script");
    const insertBeforeThisScript: HTMLScriptElement =
      scripts[scripts.length - 1];

    insertBeforeThisScript.parentNode?.insertBefore(
      script,
      insertBeforeThisScript
    );
    insertBeforeThisScript.parentNode?.insertBefore(
      chatDiv,
      insertBeforeThisScript
    );

    script.addEventListener("load", () => {
      (window as any).MyAliceWebChat.init({
        selector: "#myAliceWebChat",
        platformId: "16964",
        primaryId: "b81e7bec929d11eeae251ed9cb57fb04",
        token: "66ab8bc40ef0aafa6f9508d2d6bcdd217f853a06c618db11",
      });
    });
  }, []);

  return <div id="myAliceWebChat" />;
};

export default MyAliceChatWidget;
