/*==================================================
                MOHALLO
              SCRIPT.JS
===================================================*/

/*====================================
        STICKY NAVBAR
====================================*/

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if(window.scrollY > 30){

        header.style.paddingTop = "5px";
        header.style.transition = ".3s";

    }

    else{

        header.style.paddingTop = "20px";

    }
});


/*====================================
        SMOOTH SCROLL
====================================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener("click",function(e){
e.preventDefault();
const target=document.querySelector(this.getAttribute("href"));
if(target){
target.scrollIntoView({
behavior:"smooth"
});
}
});
});


/*====================================
       SCROLL REVEAL
====================================*/

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{
threshold:.15
});
document.querySelectorAll("section").forEach(section=>{
section.classList.add("hidden");
observer.observe(section);
});

/*====================================
       BUTTON RIPPLE
====================================*/
const buttons=document.querySelectorAll("button,.cta-btn");
buttons.forEach(button=>{
button.addEventListener("click",function(e){
const circle=document.createElement("span");
const diameter=Math.max(this.clientWidth,this.clientHeight);
const radius=diameter/2;
circle.style.width=circle.style.height=`${diameter}px`;
circle.style.left=`${e.clientX-this.offsetLeft-radius}px`;
circle.style.top=`${e.clientY-this.offsetTop-radius}px`;
circle.classList.add("ripple");
const ripple=this.getElementsByClassName("ripple")[0];
if(ripple){
ripple.remove();
}
this.appendChild(circle);
});
});


/*====================================
        IMAGE PARALLAX
====================================*/

const heroImage=document.querySelector(".hero-right img");
window.addEventListener("mousemove",(e)=>{
let x=(window.innerWidth/2-e.pageX)/50;
let y=(window.innerHeight/2-e.pageY)/50;
heroImage.style.transform=`translate(${x}px,${y}px)`;
});


/*====================================
      SEARCH BAR EFFECT
====================================*/

const search=document.querySelector(".search-box input");
search.addEventListener("focus",()=>{
document.querySelector(".search-box").style.boxShadow=
"0 0 0 4px rgba(245,130,32,.18)";
});

search.addEventListener("blur",()=>{
document.querySelector(".search-box").style.boxShadow=
"0 8px 18px rgba(0,0,0,.08)";
});


/*====================================
        FLOATING CARDS
====================================*/

const cards=document.querySelectorAll(".hero-card,.info-card");
cards.forEach((card,index)=>{
setInterval(()=>{
card.animate([
{
transform:"translateY(0px)"
},
{
transform:"translateY(-8px)"
},
{
transform:"translateY(0px)"
}
],{
duration:3500+(index*500),
iterations:1,
easing:"ease-in-out"
});
},4000+(index*700));
});


/*====================================
       ACTIVE NAV LINK
====================================*/

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");
window.addEventListener("scroll",()=>{
let current="";
sections.forEach(section=>{
const sectionTop=section.offsetTop;
if(scrollY>=sectionTop-200){
current=section.getAttribute("id");
}
});

navLinks.forEach(link=>{
link.classList.remove("active");
if(link.getAttribute("href")==="#"+current){
link.classList.add("active");
}
});
});


/*====================================
      BACK TO TOP BUTTON
====================================*/

const topButton=document.createElement("div");
topButton.innerHTML="↑";
topButton.className="top-button";
document.body.appendChild(topButton);
window.addEventListener("scroll",()=>{
if(window.scrollY>500){
topButton.classList.add("visible");
}else{
topButton.classList.remove("visible");
}
});
topButton.onclick=()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
};


/*====================================
       SCROLL PROGRESS BAR
====================================*/

const progress=document.createElement("div");
progress.className="progress-bar";
document.body.appendChild(progress);
window.addEventListener("scroll",()=>{
const scrollTop=document.documentElement.scrollTop;
const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
const width=(scrollTop/height)*100;
progress.style.width=width+"%";
});


/*====================================
       HERO IMAGE TILT
====================================*/

heroImage.addEventListener("mouseenter",()=>{
heroImage.style.transition=".3s";
});

heroImage.addEventListener("mousemove",(e)=>{
const rect=heroImage.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;
const rotateY=((x/rect.width)-0.5)*14;
const rotateX=((y/rect.height)-0.5)*-14;
heroImage.style.transform=
`perspective(900px)
 rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)
 scale(1.03)`;
});

heroImage.addEventListener("mouseleave",()=>{
heroImage.style.transform="perspective(900px) rotateX(0) rotateY(0)";

});


/*====================================
         CONSOLE MESSAGE
====================================*/
console.log("%cWelcome to Mohallo","color:#F58220;font-size:24px;font-weight:bold;");
console.log("%cDesigned and developed by Heatwave","color:#444;font-size:16px;");