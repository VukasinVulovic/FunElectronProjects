let bean_height = 0;
let ctx,
    looper;

window.onload = function initiateBeans() {
    const canvas = document.createElement('canvas');
    document.querySelector('.wrapper').appendChild(canvas);
    canvas.width = '400';
    canvas.height = '600';
    ctx = canvas.getContext('2d');
    looper = setInterval(beansImage, 4);
}

function beansImage() {
    const y = 600-bean_height;
    const beans = new Image(400, bean_height);
    beans.src = './assets/images/beans.png';
    beans.onload = () => ctx.drawImage(beans, 0, y, 400, bean_height);
    bean_height ++;
    if(bean_height >= 600) {
        clearInterval(looper);
        setTimeout(beanTitle, 100);
    }
}

function beanTitle() {
    let font_size = 400;
    const font_bean = setInterval(() => {
        const beans = new Image(400, 600);
        beans.src = './assets/images/beans.png';
        beans.onload = () => { 
            ctx.drawImage(beans, 0, 0, 400, 600);
            ctx.font = `${font_size}px RussoOne`;
            ctx.fillStyle = 'rgba(228, 228, 228, 0.747)';
            ctx.textAlign = 'center';
            ctx.fillText('Beans.', ctx.canvas.width/2, ctx.canvas.height/2); 
            font_size -= 10;
            if(font_size <= 50) {
                clearInterval(font_bean);
                new Audio('./assets/sfx/beans.ogg').play();
            }
        }
    }, 10);
}