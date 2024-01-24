//(function(){})()//즉시실행함수

(function () {
  let yOffset = 0; // 전체 스크롤 값
  let prevScrollHeight = 0; //현재 활성화된 section 이전의 높이값
  let currentScene = 0; //현재 활성화된(화면에 보이는) section
  let enterNewScene = false; //새로운section에 진입했을때 알려주는 역할

  function setCanvasImages() {
    //canvas에 이미지를 그리기위한 함수
    let imgEle;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      //imgEle=document.createElement('img');
      imgEle = new Image();
      imgEle.src = `./video/001_scene2/1p_${i}.jpg`;
      sceneInfo[0].objs.videoImages.push(imgEle);
    }
    let imgEle1;
    for (let i = 0; i < sceneInfo[1].values.videoImageCount; i++) {
      //imgEle=document.createElement('img');
      imgEle1 = new Image();
      imgEle1.src = `./video/001_scene3/2p_${67 + i}.jpg`;
      sceneInfo[1].objs.videoImages.push(imgEle1);
    }

    let imgEle2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      //imgEle=document.createElement('img');
      imgEle2 = new Image();
      imgEle2.src = `./video/001_scene4/3p_${130 + i}.jpg`;
      sceneInfo[2].objs.videoImages.push(imgEle2);
    }

    let imgEle3;
    for (let i = 0; i < sceneInfo[3].values.videoImageCount; i++) {
      //imgEle=document.createElement('img');
      imgEle3 = new Image();
      imgEle3.src = `./video/001_scene5/3p_${209 + i}.jpg`;
      sceneInfo[3].objs.videoImages.push(imgEle3);
    }

    let imgEle4;
    for (let i = 0; i < sceneInfo[4].values.videoImageCount; i++) {
      //imgEle=document.createElement('img');
      imgEle4 = new Image();
      imgEle4.src = `./video/001_scene5/3p_${255+i}.jpg`;
      sceneInfo[4].objs.videoImages.push(imgEle4);
    }
  }

  setCanvasImages();


// ---------- loading bar -----------

let container = document.querySelector('#progress');
let progressBar = document.querySelector('.progress-bar');
let progressText = document.querySelector('.progress-text');
let imgTotal = 0;
let imgLoaded = 0;
let current = 0;
let progressTimer;
let opacity;

// 이미지 로딩 상태를 추적하기 위한 imagesLoaded 함수 사용
let imgLoad = imagesLoaded('html');

// 이미지 개수를 셈
imgLoad.on('progress', function(instance, image) {
  imgTotal++;
});


// 이미지 로딩 상태 업데이트 함수
function updateProgress() {
  let target = (imgLoaded / imgTotal) * 100; // 퍼센트 계산
  current += (target - current) * 0.1;

  progressBar.style.width = current + "%";
  progressText.innerHTML = Math.ceil(current) + "%";

  if (current >= 99.9) {
    container.classList.add('progress-complete');
    progressBar.style.width = "100%";
    opacity = 1;
    progressTimer = setInterval(() => {
      opacity -= 0.2;
      container.style.opacity = opacity;
      if(opacity <= 0){
        clearInterval(progressTimer)
      }
      
    }, 10);
    

  } else {
    requestAnimationFrame(updateProgress);
  }

}



// 이미지 로딩 상태 업데이트
imgLoad.on('progress', function(instance, image) {
  imgLoaded++;
  updateProgress();
});





  function setLayout() {
    //각 영역의 높이값을 셋팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    yOffset = pageYOffset;

    let totalScrollHeight = 0;

    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);

    //canvas 크기조절
    //const heightRatio=window.innerHeight/1080;
    const heightRatio = window.innerHeight / 980;
    // console.log(heightRatio);
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%,0) scale(${heightRatio})`;
    sceneInfo[1].objs.canvas.style.transform = `translate3d(-50%, -50%,0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%,0) scale(${heightRatio})`;
    sceneInfo[3].objs.canvas.style.transform = `translate3d(-50%, -50%,0) scale(${heightRatio})`;
    sceneInfo[4].objs.canvas.style.transform = `translate3d(-50%, -50%,0) scale(${heightRatio})`;
  } /* //setLayout */

  function calcValues(values, currentYOffset) {
    let rv;
    let scrollHeight = sceneInfo[currentScene].scrollHeight;
    let scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      //values의 요소가 3개인지 확인
      //start~end사이에 애니메이션이 실행
      //시작점 구하기
      let partScrollStart = values[2].start * scrollHeight;
      let partScrollEnd = values[2].end * scrollHeight;
      let partScrollHeight = partScrollEnd - partScrollStart;
      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  }

  function playAnimation() {
    let objs = sceneInfo[currentScene].objs;
    let values = sceneInfo[currentScene].values;

    let currentYOffset = yOffset - prevScrollHeight;
    let scrollHeight = sceneInfo[currentScene].scrollHeight;
    let scrollRatio = currentYOffset / scrollHeight;
    switch (currentScene) {
      case 0:
        let sequence = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        //console.log(sequence)
        objs.context.drawImage(objs.videoImages[sequence], 0, 0, 1920, 1080);

        // //canvas opacity
        objs.canvas.style.opacity = calcValues(
          values.canvas_opacity,
          currentYOffset
        );

        //console.log('0 play');
        if (scrollRatio <= 0.6) {
          objs.MessageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          // objs.MessageA.style.transform = `translateY(${calcValues(
          //   values.messageA_translateY_in,
          //   currentYOffset
          // )}%)`;
        } else {
          objs.MessageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          // objs.MessageA.style.transform = `translateY(${calcValues(
          //   values.messageA_translateY_out,
          //   currentYOffset
          // )}%)`;
        }

        break;
      case 1:
        //console.log('1 play');
        let sequence1 = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        //console.log(sequence)
        objs.context.drawImage(objs.videoImages[sequence1], 0, 0, 1920, 1080);
        if (scrollRatio <= 0.6) {
          objs.MessageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
    
        } else {
          objs.MessageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );

        }

        if (scrollRatio <= 0.6) {
          // in
        
          objs.MessageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
         
        } else {
          // out

          objs.MessageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );

        }

        break;
      case 2:
        let sequence2 = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0, 1920, 1080);


        // if (scrollRatio <= 0.25) {
        //   // in
        //   objs.messageA.style.opacity = calcValues(
        //     values.messageA_opacity_in,
        //     currentYOffset
        //   );
        //   objs.messageA.style.transform = `translate3d(0, ${calcValues(
        //     values.messageA_translateY_in,
        //     currentYOffset
        //   )}%, 0)`;
        // } else {
        //   // out
        //   objs.messageA.style.opacity = calcValues(
        //     values.messageA_opacity_out,
        //     currentYOffset
        //   );
        //   objs.messageA.style.transform = `translate3d(0, ${calcValues(
        //     values.messageA_translateY_out,
        //     currentYOffset
        //   )}%, 0)`;
        // }

        if (scrollRatio <= 0.3) {
          // in
        
          objs.MessageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
         
        } else {
          // out

          objs.MessageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );

        }
        if (scrollRatio <= 0.6) {
          // in
        
          objs.MessageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
         
        } else {
          // out

          objs.MessageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );

        }

        break;
      case 3:
        //console.log('3 play');
        let sequence3 = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        objs.context.drawImage(objs.videoImages[sequence3], 0, 0, 1920, 1080);
        
        if (scrollRatio <= 0.6) {
          // in
        
          objs.MessageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
         
        } else {
          // out

          objs.MessageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );

        }

        if (scrollRatio <= 0.6) {
          objs.MessageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
    
        } else {
          objs.MessageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );

        }



        break;

        case 4:
          let sequence4 = Math.round(
            calcValues(values.imageSequence, currentYOffset)
          );
          //console.log(sequence)
          objs.context.drawImage(objs.videoImages[sequence4], 0, 0, 1920, 1080);

          
        if (scrollRatio <= 0.6) {
          objs.MessageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
    
        } else {
          objs.MessageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );

        }

        break;

        case 5:
        break;
    }
  } /* //playAnimation */

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
    }
    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      currentScene--;
    }

    //console.log(currentScene)
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    if (enterNewScene) {
      return;
    }
    //글자애니메이션을 별도로 함수로 설정한다
    playAnimation();
  }

  // let rAF = false; 

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    // if (!rAF) {
    //   // requestAnimationFrame이 실행 중이 아닌 경우에만 실행
    //   rAF = true;
    //   requestAnimationFrame(() => {
    //     scrollLoop();
    //     rAF = false;
    //   });
    // }
    // console.log(scrollLoop)
    scrollLoop();
  });
  window.addEventListener("resize", setLayout);
  window.addEventListener("load", () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(
      sceneInfo[0].objs.videoImages[0],
      0,
      0,
      1920,
      1080
    );
    scrollToPosition();
  });
  
  function scrollToPosition() {
    const sectionIndex = Math.floor(yOffset / window.innerHeight);
    const positionOffset = yOffset % window.innerHeight;
  
    if (positionOffset > 0) {
      // 페이지가 아래로 스크롤된 경우
      window.scrollTo({
        top: (sectionIndex + 1) * window.innerHeight,
        behavior: "auto",
      });
    } else {
      // 페이지가 위로 스크롤된 경우
      window.scrollTo({
        top: sectionIndex * window.innerHeight,
        behavior: "auto",
      });
    }
  }
  

  // window.addEventListener(
  //   "wheel",
  //   function (e) {
  //     e.preventDefault();
  //   },
  //   { passive: false }
  // );

  // var mHtml = $("html");
  // var page = 1;

  // mHtml.animate({ scrollTop: 0 }, 10);
  // // const sections = document.querySelectorAll(".scroll-section");

  // $(window).on("wheel", function (e) {
  //   if (mHtml.is(":animated")) return;
  //   if (e.originalEvent.deltaY > 0) {
  //     if (page == 8) return;
  //     page++;
  //   } else if (e.originalEvent.deltaY < 0) {
  //     if (page == 1) return;
  //     page--;
  //   }
  //   var posTop = (page - 1) * $(window).height();
  //   mHtml.animate({ scrollTop: posTop });
  // });

//   var page = 1;
//   var isAnimating = false;
  
//   function scrollToPage(pageNumber) {
//     if (isAnimating) return;
  
//     var posTop = (pageNumber - 1) * window.innerHeight;
//     isAnimating = true;
  
//     window.scrollTo({
//       top: posTop,
//       behavior: "smooth"
//     });
  
//     setTimeout(function() {
//       isAnimating = false;
//     }, 2000); // 애니메이션 완료 후 .스크롤 방지
//   }
  
//   window.addEventListener("wheel", function(e) {
//     e.preventDefault();
  
//     if (e.deltaY > 0) {
//       if (page < 9) {
//         page++;
//         scrollToPage(page);
//       }
//     } else if (e.deltaY < 0) {
//       if (page > 1) {
//         page--;
//         scrollToPage(page);
//       }
//     }
//   }, { passive: false });
  
//   scrollToPage(page);
  
// })();

// let aboutPony = document.querySelector('#scroll-section-0').offsetTop
// let aboutPonyHeight = document.querySelector('#scroll-section-0').offsetHeight

// let reunion = document.querySelector('#scroll-section-7').offsetTop
// let reunionHeight = document.querySelector('#scroll-section-7').offsetHeight

let menuHome = document.querySelector('.product-name')
let menuAboutPony = document.querySelector('.about_pony')
let menuREUNION = document.querySelector('.reunion')







var page = 1;
var isAnimating = false;
var isScrolling = false;

function scrollToPage(pageNumber) {
  if (isAnimating) return;

  var posTop = (pageNumber - 1) * window.innerHeight;
  isAnimating = true;

  window.scrollTo({
    top: posTop,
    behavior: "smooth"
  });

  setTimeout(function() {
    isAnimating = false;
  }, 500); // 애니메이션 완료 후 스크롤 방지
}

function handleScroll(event) {
  event.preventDefault();

  if (isScrolling) return;

  isScrolling = true;

  // 스크롤 이벤트에서 deltaY 값을 사용하여 스크롤 방향을 확인
  var delta = event.deltaY > 0 ? 1 : -1;

  if (delta === 1 && page < 10) {
    page++;
  } else if (delta === -1 && page > 1) {
    page--;
  }

  scrollToPage(page);

  setTimeout(function() {
    isScrolling = false;
  }, 500); // 스크롤 이벤트 완료 후 다음 이벤트 허용
}

window.addEventListener("wheel", handleScroll, { passive: false });
// window.addEventListener("scroll", handleScroll, { passive: false });

scrollToPage(page);

menuHome.addEventListener('click', function() {
  page = 1;
  scrollToPage(page);
});
menuAboutPony.addEventListener('click', function() {
  page = 1;
  scrollToPage(page);
});

menuREUNION.addEventListener('click', function() {
  page = 8;
  scrollToPage(page);
});



})();


///-----------------letters-------------

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("#scroll-section-0 h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 10)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 20);
}






// ------------tilt---------

VanillaTilt.init(document.querySelectorAll(".tiltEle"), {
  max: 5,
  speed: 300,
  perspective: 1000,
  easing: "cubic-bezier(.03,.98,.52,.99)",
});



// // -----------img_ani-----------

// let clickImage = document.querySelector('#imgClick');
// // 움직일때 자식을 품고 같이 움직여라
// let imgElement = document.getElementById('myImage');
// // 이놈은 이미지만 바뀌는 역할
// let main= document.querySelector('#scroll-section-3')
// let images=[
//   "img/01.jpg",
//   "img/02.jpg",
//   "img/03.jpg",
//   "img/04.jpg",
// ];
// // let hoverImg = window.getComputedStyle(clickImage,"::after");
// // console.log(hoverImg)

// // hoverImg.addEventListener('mousemove',()=>{
// //   clickImage.querySelector('img').style.display='block';
// // })

// let mousePos={x:0, y:0};
// let currentIndex=0;
// let changeI = false;

// function changeImage(e){
//   if(changeI){
//     return ;
//   }
//   changeI=true;
//   let currentImage = images[currentIndex];
//   imgElement.src=currentImage;
//   currentIndex++;
//   if(currentIndex>=images.length){
//     currentIndex=0;
//   }

//   //setinterval(할일, 시간) 시간마다 할 일
//   // settimeout은(할일, 시간)=> 1초 뒤에 할일 어떤 시간이 지나면 할 일
//   setTimeout(()=>{changeI=false},400)
// }

// imgElement.addEventListener('mousemove',changeImage)


// // window.addEventListener('mousemove',function(){})
// window.addEventListener('mousemove',(e)=>{
//   // e.clientX : 현재 화면에서 마우스의 x값을 추출
//   // e.clientY : 현재 화면에서 마우스의 y값을 추출
//   mousePos.x= -(e.clientX/window.innerWidth)*15;
//   mousePos.y= -(e.clientY/window.innerHeight)*15;
//   // - 달면 반대로 움직인다. 화면의 너비 값을 나는는건..?
//   // console.log(e.clientX,e.clientY)
//   clickImage.style.transform=`translateY(${mousePos.y}px) translateX(${mousePos.x}px)`; 
// })

// --- img ----/

initComparisons();

function initComparisons(){
  let x, i;
  x=document.getElementsByClassName("img-comp-overlay");
  // console.log(x.length)//1
    for (i = 0; i < x.length; i++) {
    compareImages(x[i]);
  }
  function compareImages(img){
    let slider, clicked =0, w,h;
    
    w=img.offsetWidth;
    h=img.offsetHeight;
    
    img.style.width=(w/2) +"px";
    
    
     slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    
    img.parentElement.insertBefore(slider, img);
    
    slider.style.top=(h/2) - (slider.offsetHeight / 2)+"px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    
    slider.addEventListener("mousedown",slideReady);
    slider.addEventListener("mouseup",slideFinish);
    
    function slideReady(e){
      e.preventDefault();
      clicked=1;
      window.addEventListener("mousemove",slideMove);//클릭한 상태로 움직임
    }
    
     function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    
    
    function slideMove(e){
      var pos;
      if(clicked==0)return false;
      pos=getCursorPos(e);
      
      if(pos<0) pos=0;
      if(pos>w) pos=w;
      slide(pos);
    }
    
    function getCursorPos(e){
      let a, x=0;
      //changedTouches-->	이 터치와 이전 터치 사이에 상태가 변경된 터치 개체 목록
       e = (e.changedTouches) ? e.changedTouches[0] : e;
      a=img.getBoundingClientRect();
      x=e.pageX - a.left;
      x= x - window.pageXOffset;//화면을 좁히면 깨지기 때문
      return x;
      
      
    }
     function  slide(x){
       img.style.width=x+"px";
       slider.style.left=img.offsetWidth - (slider.offsetWidth/2) + "px";
     }
  }
  
}



// -- 6 ---

let hero=document.querySelector('.hero');
let heroTitles=document.querySelectorAll('.hero_row_text>h2');
let heroSubTitles=document.querySelectorAll('.hero_row_text>h4');
let heroSeparator=document.querySelectorAll('.hero_row_speparator');
let heroMedia=document.querySelector('.hero_media');
let onenter=false;


const initHero=()=>{
    gsap.set(heroTitles,{y:'101%',opacity:1});
    gsap.set(heroSubTitles,{opacity:0});
    gsap.set(heroSeparator,{width:0});
    gsap.set('.cell',{opacity:1});

    showHero();
}
const showHero=()=>{
    var tl = gsap.timeline();
    tl.to(heroTitles, {y: 0,duration: 0.7,ease: "expo.out",stagger:0.2})
    tl.to(heroSubTitles, {opacity: 1, duration: 0.7,ease: "expo.in",stagger:0.2},-0.2)
    tl.to(heroSeparator, {width: '100%', duration: 0.5,ease: "expo.in",stagger:0.2},-0.2)
    tl.fromTo('.cell',{height:0,scale:0.5},{duration:0.8, height:'100%',scale:1,stagger:0.025,ease:'expo.inOut'})
    tl.call(showElements);

};


const spliteAnimation=()=>{
    Splitting({
        target:heroMedia,
        by:'cells',
        image:true,
        rows: 4
    })
}

window.onload=()=>{
  
    window.addEventListener('scroll',()=>{
    if(!onenter && pageYOffset>hero.offsetTop  - 300){
         spliteAnimation();
          initHero();
      
      onenter=true;
    }
    
  })
   
 
}


const showElements = () => {
  const p1 = document.querySelector('.p-1');
  const p2 = document.querySelector('.p-2');
  const p3 = document.querySelector('.p-3');
  const p4 = document.querySelector('.p-4');
  const cursor = document.querySelector('.cursor');
  const overlay = document.querySelector('.hero_row-wrap');
  const wrapper = document.querySelector('.wrapper');

  p1.addEventListener('mouseover', function () {
    cursor.style.backgroundImage = 'url(img/sec_6_img1.jpg)';
  });

  p2.addEventListener('mouseover', function () {
    cursor.style.backgroundImage = 'url(img/sec_6_img2.jpg)';
  });

  p3.addEventListener('mouseover', function () {
    cursor.style.backgroundImage = 'url(img/sec_6_img3.jpg)';
  });

  p4.addEventListener('mouseover', function () {
    cursor.style.backgroundImage = 'url(img/sec_6_img4.jpg)';
  });

  overlay.addEventListener('mousemove', function (e) {
    gsap.to(cursor, { opacity: 1, scale: 1, duration: 1 });
    gsap.to(cursor, { left: e.pageX, top: e.pageY, delay: 0.03 });
    // console.log(e.pageX, e.pageY)
  });

  wrapper.addEventListener('mouseleave', function () {
    gsap.to(cursor, { opacity: 0, scale: 0.1 });
  });
};

// swiper


const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1, //화면에 몇개가 나오게 할것인가?
  spaceBetween: 1, //사이에 간격을 말함.
  simulateTouch:false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  simulateTouch:false,
});




// -- 7 text---

let lp;
let lpPlate;
let bg;
let lpFr;
let lpFr2;
let textLp;

let x=0;
let y=0;
let mx=0;
let my=0;
let speed=0.009;

// window.onload=()=>{};
window.addEventListener('load',function(){
  lp=document.getElementById("lp-cover");
  lpPlate=document.getElementById("lp_plate");
  bg=document.getElementById("bg");
  lpFr=document.getElementById("fr_1");
  lpFr2=document.getElementById("fr_2");
  textLp=document.getElementById("text_lp");

  window.addEventListener('mousemove',mouseFunc)

  function mouseFunc(e){
    x = (e.clientX - window.innerWidth/2);
    y = (e.clientY - window.innerHeight/2);
    // console.log(y)

  }
  loop();
});

function loop(){
  mx += (x - mx) * speed;
  // 많이 움직여서 값이 많이 들어와도 값이 적게 되게끔해서 움직임 값도 낮게 한다.
  my += (y - my) * speed;

  lp.style.transform = `translate(${mx/9}px,${my/9}px)`
  lpPlate.style.transform = `translate(${mx/9}px,${my/9}px)`
  bg.style.transform = `translate(${-mx/8}px,${-my/8}px)`
  lpFr.style.transform = `translate(${-mx/4}px,${-my/4}px)`
  lpFr2.style.transform = `translate(${mx/3}px,${my/3}px)`
  // text3d.style.transform = `translate3d(${mx/2},${my/2},0) rotate3d(0, 1, 0, ${mx}deg)`
  textLp.style.transform = `translate3d(${mx/10}px,${my/10}px,0) rotate3d(0,1,0,${mx/50}deg)`

  window.requestAnimationFrame(loop)
}
