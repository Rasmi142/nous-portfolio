const cursor = document.querySelector('#cursor');
let mouse = { x: 300, y: 300 };
let pos = { x: 0, y: 0 };
const speed = 0.1; // between 0 and 1

const updatePosition = () => {
  pos.x += (mouse.x - pos.x) * speed;
  pos.y += (mouse.y - pos.y) * speed;
  cursor.style.transform = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';
};

const updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);

function loop() {
  updatePosition();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);


gsap.registerPlugin(ScrollTrigger);
        let revealAnimations = [];
        
        // Scroll
        const lenis = new Lenis({
          lerp: 0.07 });
        
        
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(time => {
          lenis.raf(time * 1000);
        });
        
        // Reveal
        document.querySelectorAll('.reveal').forEach(text => {
          // Split text
          let splitText = new SplitType(text, {
            type: 'words' });
        
        
          // Animation
          const section = text.closest('section');
          gsap.from(splitText.words, {
            opacity: 0,
            ease: 'none',
            stagger: 1,
            duration: 5,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${window.innerHeight * 5}px`,
              scrub: true,
              // markers: true,
              pin: true } });
        
        
        });