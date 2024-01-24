let panoWrap = document.querySelector('.sj_panorama .pano_wrap');
let listWarp = panoWrap.querySelector('.list');
let item = listWarp.children;
let listClone=null;
let itemWidth = item[0].offsetWidth; //이미지하나의 넓이
let itemLength= item.length; //10개
let listWidth=itemWidth * itemLength; //300px*10 = 3000px
let move = 0;
//let controls=document.querySelector('.sj_panorama .controls')
let controls=panoWrap.parentElement.querySelector('.controls')
let timer;

// function init(){}
// var init =()=>{}
var init = function(){
  panoWrap.style.width=listWidth*2+'px';
  listWarp.style.width=listWidth+'px';
  panoWrap.appendChild(listWarp.cloneNode(true))
  // 리스트랩에 있는 자식까지 트루 복사해서 넣겠다.라는 뜻으로 넣는다.
  listClone=panoWrap.children
  // console.log(listClone)
  render();
  add();
  event();
}

let render=()=>{
  move +=1;
  // 유사배열을 배열로 바꿈.
  Array.from(listClone).forEach((clone)=>{
    clone.style.transform=`translateX(-${move}px)`;
  })
  // console.log(listClone)
  // console.log( Array.from(listClone))
  timer=window.requestAnimationFrame(render)

}

let add =()=>{
  setInterval(()=>{
    panoWrap.appendChild(listWarp.cloneNode(true))
    listClone=panoWrap.children
  },10000) //10초마다 함수 실행시켜
  
}
let event=()=>{
  controls.querySelector('.play_on').addEventListener('click',function(e){
    e.preventDefault();
    // console.log(this)
    if(this.classList.contains('active')){
      this.classList.remove('active')
      window.cancelAnimationFrame(timer)
    }else{
      this.classList.add('active')
      render();
    }
  })
}

window.addEventListener('load',function(){
  init()
})