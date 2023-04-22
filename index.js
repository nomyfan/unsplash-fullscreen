// ==UserScript==
// @name         Unsplash fullscreen
// @namespace    https://github.com/nomyfan/unsplash-fullscreen
// @version      0.1
// @description  Add a fullscreen button to Unsplash to view photos in fullscreen mode
// @author       nomyfan(Kim Chan)
// @match        https://unsplash.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const buttonID = "unsplash-fullscreen-button";
  function queryGalleryElement() {
    const root = document.querySelector('[data-test="photos-route"]');
    return root && root.querySelector("div>div");
  }
  function queryHeaderElement() {
    const gallery = queryGalleryElement();
    return gallery && gallery.querySelector("div:first-child>header");
  }
  function queryImageElement() {
    const gallery = queryGalleryElement();
    return gallery && gallery.querySelector("button canvas+div>img");
  }

  function run() {
    if (
      !document.querySelector('[data-test="client-side-hydration-complete"]') ||
      !window.location.pathname.startsWith("/photos/") ||
      document.getElementById(buttonID)
    ) {
      return;
    }

    const headerElement = queryHeaderElement();
    if (!headerElement) return;

    const style = document.createElement("style");
    style.textContent = `
.unsplash-fullscreen-button {
  color: white;
  background-color: #fec25a;
  border: 1px solid #0000;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  user-select: none;
  height: 32px;
  line-height: 30px;
  padding: 0 11px;
}

.unsplash-fullscreen-button > svg {
  height: 16px;
  width: 16px;
  display: block;
  fill: #fff;
}

.unsplash-fullscreen-button:hover {
  background-color: #f7ad2a;
}
`;

    const button = document.createElement("button");
    button.setAttribute("id", buttonID);
    button.setAttribute("class", "unsplash-fullscreen-button");
    button.innerHTML = `
<svg viewBox="0 0 24 24" aria-hidden="false">
 <path d="M10 21v-2H6.4l4.5-4.5-1.4-1.4L5 17.6V14H3v7h7Zm4.5-10.1L19 6.4V10h2V3h-7v2h3.6l-4.5 4.5 1.4 1.4Z"></path>
</svg>`;
    button.addEventListener("click", (evt) => {
      const imageElement = queryImageElement();
      if (!imageElement) return;
      imageElement.requestFullscreen().catch(() => {
        alert("fullscreen not supported");
      });
    });

    const rootElement = document.createElement("div");
    rootElement.appendChild(style);
    rootElement.appendChild(button);
    headerElement.appendChild(rootElement);
  }

  run();
  setInterval(function () {
    run();
  }, 500);
})();
