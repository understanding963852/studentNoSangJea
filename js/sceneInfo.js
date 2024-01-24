const sceneInfo = [
  {
    //0
    type: "sticky", //sticky기능이 있는것과 없는것을 구별할것.
    heightNum: 1,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-0"),
      MessageA: document.querySelector("#scroll-section-0 .main-message.a"),
      canvas: document.querySelector("#video-canvas-0"),
      context: document.querySelector("#video-canvas-0").getContext("2d"),
      videoImages: [],
    },
    values: {
      videoImageCount: 68,
      imageSequence: [0, 68],
      canvas_opacity: [1, 0, { start: 1, end: 1.1 }],
      messageA_opacity_in: [0, 1, { start: 0.8, end: 1 }],
      // messageA_translateY_in: [20, 0, { start: 0.8, end: 0.9 }],
      messageA_opacity_out: [1, 0, { start: 1, end: 1.2 }],
      // messageA_translateY_out: [0, -20, { start: 0.95, end: 1 }],
    },
  },
  {
    //1
    type: "sticky", //sticky기능이 있는것과 없는것을 구별할것.
    heightNum: 1,
    scrollHeight: 0,
    objs: {
      MessageA: document.querySelector("#scroll-section-1 .main-message.a"),
      MessageB: document.querySelector("#scroll-section-1 .main-message.b"),
      container: document.querySelector("#scroll-section-1"),
      canvas: document.querySelector("#video-canvas-1"),
      context: document.querySelector("#video-canvas-1").getContext("2d"),
      videoImages: [],
    },
    values: {
      videoImageCount: 64,
      imageSequence: [0, 63],
      canvas_opacity: [1, 0, { start: 0.95, end: 1 }],
      messageA_opacity_in: [1, 0, { start: 0, end: 0.1 }],
      // messageA_translateY_in: [20, 0, { start: 0, end: 0.1 }],
      messageA_opacity_out: [1, 0, { start: 0, end: 0.1 }],
      // messageA_translateY_out: [0, -20, { start: 0, end: 0.1 }],
      messageB_opacity_in: [0, 1, { start: 0.8, end: 1 }],
      messageB_opacity_out: [1, 0, { start: 1, end: 1.2 }],
    },
  },
  {
    //2
    type: "sticky", //sticky기능이 있는것과 없는것을 구별할것.
    heightNum: 1,
    scrollHeight: 0,
    objs: {
      canvas: document.querySelector("#video-canvas-2"),
      context: document.querySelector("#video-canvas-2").getContext("2d"),
      videoImages: [],
      container: document.querySelector("#scroll-section-2"),
      MessageB: document.querySelector("#scroll-section-2 .main-message.b"),
      MessageC: document.querySelector("#scroll-section-2 .main-message.c"),
    },
    values: {
      videoImageCount: 56,
      imageSequence: [0, 55],
      canvas_opacity: [1, 0, { start: 0.95, end: 1 }],
      messageB_opacity_in: [1, 1, { start: 0, end: 0.1 }],
      messageB_opacity_out: [1, 0, { start: 0, end: 0.1 }],
      messageC_opacity_in: [0, 1, { start: 0.8, end: 1 }],
      messageC_opacity_out: [1, 1, { start: 1, end: 1.1 }],
    },
  },
  {
    //3
    type: "sticky", //sticky기능이 있는것과 없는것을 구별할것.
    heightNum: 1 ,
    scrollHeight: 0,
    objs: {
      canvas: document.querySelector("#video-canvas-3"),
      context: document.querySelector("#video-canvas-3").getContext("2d"),
      videoImages: [],
      container: document.querySelector("#scroll-section-3"),
      MessageC: document.querySelector("#scroll-section-3 .main-message.c"),
      MessageA: document.querySelector("#scroll-section-3 .main-message.a"),
    },
    values: {
      videoImageCount: 47,
      imageSequence: [0, 46],
      canvas_opacity: [1, 0, { start: 0.95, end: 1 }],
      messageC_opacity_in: [1, 1, { start: 0, end: 0.1 }],
      messageC_opacity_out: [1, 0, { start: 0, end: 0.1 }],
      messageA_opacity_in: [0, 1, { start: 0.8, end: 1 }],
      messageA_opacity_out: [1, 1, { start: 1, end: 1.1 }],
    },
  },
  {//4
    type: "sticky",
    heightNum: 1,
    scrollHeight: 0,
    objs: {
      canvas: document.querySelector("#video-canvas-4"),
      context: document.querySelector("#video-canvas-4").getContext("2d"),
      videoImages: [],
      container: document.querySelector("#scroll-section-4"),
      MessageA: document.querySelector("#scroll-section-4 .main-message.a"),

    },
    values: {
      videoImageCount: 1,
      imageSequence: [0,1],
      messageA_opacity_in: [1, 1, { start: 0, end: 0.1 }],
      messageA_opacity_out: [1, 0, { start: 0, end: 0.1 }],
    },
  },
  {//5
    type: "sticky",
    heightNum: 1,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-5"),
    },
  },
  {//6
    type: "sticky",
    heightNum: 1,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-6"),
    },
  },
  {//7
    type: "sticky",
    heightNum: 1,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-7"),
    },
  },
  {//8
    type: "sticky",
    heightNum: 1,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-8"),
    },
  },
];
