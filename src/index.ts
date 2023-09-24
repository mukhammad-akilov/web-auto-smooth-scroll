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
const transformContainerFake = document.querySelector<HTMLDivElement>(
  ".scroll-box-container.scroll-transform-fake"
)!;

const framesPerSecond = 8;

let translateY = 0;
let transformContainerFakeScrollTop = 0;

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

// Auto scroll container 3
setInterval(() => {
  transformContainerContent.style.transform = `translateY(${translateY}px)`;
  translateY -= 1;
}, 150);

// Container 3 custom scroll
OverlayScrollbars(transformContainer, {});

// Fake scroll for contianer 3
const fakeTransformContainerScroll = OverlayScrollbars(
  transformContainerFake,
  {}
);

const { viewport: fakeViewport } = fakeTransformContainerScroll?.elements();

setInterval(() => {
  fakeViewport.scrollTo({ top: transformContainerFakeScrollTop++ });
}, 20);

// Mutation Observer
const scrollBarObserver = new MutationObserver(function (
  mutationRecords
  // observer
) {
  mutationRecords.forEach(function (mutationRecord) {
    if (mutationRecord.attributeName === "style") {
      const targetElem = mutationRecord.target as HTMLDivElement;
      console.log(targetElem.getAttribute("style"));
      transformContainer.querySelector<HTMLDivElement>(
        ".os-scrollbar-vertical .os-scrollbar-handle"
      )!.style.transform = targetElem
        .getAttribute("style")!
        .split(" ")[3]
        .slice(0, -1);
    }
  });
});

const observerConfig = {
  attributes: true,
  attributeFilter: ["style"],
};

const targetNode = transformContainerFake.querySelector<HTMLDivElement>(
  ".os-scrollbar-vertical .os-scrollbar-handle"
)!;

console.log(targetNode);
scrollBarObserver.observe(targetNode, observerConfig);
