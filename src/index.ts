import "overlayscrollbars/overlayscrollbars.css";
import "./style.css";
import { OverlayScrollbars } from "overlayscrollbars";

const intervalContainer = document.querySelector<HTMLDivElement>(
  ".scroll-box-container.scroll-interval"
)!;
const requestAnimationFrameContainer = document.querySelector<HTMLDivElement>(
  ".scroll-box-container.scroll-request-animaton-frame"
)!;
const transformContainer = document.querySelector<HTMLDivElement>(
  ".scroll-box-container.scroll-transform"
)!;
const transformContainerContent = document.querySelector<HTMLDivElement>(
  ".scroll-box-container.scroll-transform .content-container"
)!;

const framesPerSecond = 8;

let translateY = 0;

// Auto scroll container 1
setInterval(() => {
  intervalContainer.scrollTop += 1;
}, 150);

// Auto scroll container 2
const scrollOnRequestAnimation = () => {
  // Without setTimeout
  // requestAnimationFrameContainer.scrollTop += 1;
  // window.requestAnimationFrame(scrollOnRequestAnimation);

  setTimeout(function () {
    requestAnimationFrameContainer.scrollTop += 1;
    window.requestAnimationFrame(scrollOnRequestAnimation);
  }, 1000 / framesPerSecond);
};

window.requestAnimationFrame(scrollOnRequestAnimation);

// Container 3 custom scroll
const osInstance = OverlayScrollbars(transformContainer, {});

// Auto scroll container 3
setInterval(() => {
  const { overflowAmount } = osInstance.state();
  const { scrollbarVertical } = osInstance.elements();
  const { handle, track } = scrollbarVertical;
  const scrollPosition = translateY * -1;
  const scrollPercent = Math.max(
    0,
    Math.min(1, scrollPosition / overflowAmount.y)
  );
  const lengthRatio = Math.max(
    0,
    Math.min(
      1,
      handle.getBoundingClientRect().height /
        track.getBoundingClientRect().height
    )
  );

  handle.style.transform = `translateY(${
    (1 / lengthRatio) * (1 - lengthRatio) * scrollPercent * 100
  }%)`;
  transformContainerContent.style.transform = `translateY(${translateY}px)`;
  translateY -= 100;
}, 150);
