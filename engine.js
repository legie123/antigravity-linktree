// TRUE 3D VECTORIAL DRAGON BEZIER GENERATOR (Cinematic Premium Version)
const canvas = document.getElementById('engineCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.cx = canvas.width / 2;
    canvas.cy = canvas.height / 2;
}
window.addEventListener('resize', resize);
resize();

// 3D Vector Dragon cu mișcare fluidă și fum cinematic
class VectorDragon {
    constructor(offset, scale, speed, colorStr, glowSize) {
        this.offset = offset;
        this.scale = scale;
        this.speed = speed;
        this.colorStr = colorStr;
        this.glowSize = glowSize;
        this.segments = [];
        this.numSegments = 50; // Mai lung și mai sofisticat
        for(let i=0; i<this.numSegments; i++) this.segments.push({x:canvas.cx, y:canvas.cy});
    }

    draw(t) {
        // Wide, slow Lissajous curve for floating cinematic effect
        let headX = canvas.cx + Math.sin(t * this.speed + this.offset) * (canvas.width * 0.45 * this.scale) + Math.cos(t * this.speed * 0.7) * 120;
        let headY = canvas.cy + Math.cos(t * this.speed * 0.6 + this.offset) * (canvas.height * 0.35 * this.scale) + Math.sin(t * this.speed * 1.2) * 90;
        
        this.segments.unshift({x: headX, y: headY});
        this.segments.pop();

        if(!this.segments[this.numSegments-1].x) return;

        // Draw Dragon Spine Glow / Fog
        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length - 1; i++) {
            const xc = (this.segments[i].x + this.segments[i + 1].x) / 2;
            const yc = (this.segments[i].y + this.segments[i + 1].y) / 2;
            ctx.quadraticCurveTo(this.segments[i].x, this.segments[i].y, xc, yc);
        }
        
        // Outer ethereal glow (smoke/mist core)
        ctx.strokeStyle = this.colorStr;
        ctx.lineWidth = 45 * this.scale;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = this.colorStr;
        ctx.shadowBlur = this.glowSize;
        ctx.globalAlpha = 0.2;
        ctx.stroke();

        // Inner premium body
        ctx.lineWidth = 15 * this.scale;
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        // Core spine
        ctx.lineWidth = 3 * this.scale;
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.9)';
        ctx.globalAlpha = 0.9;
        ctx.stroke();

        // Elegant fins/scales
        ctx.beginPath();
        for (let i = 2; i < this.segments.length - 4; i+=3) {
            let dx = this.segments[i-1].x - this.segments[i+1].x;
            let dy = this.segments[i-1].y - this.segments[i+1].y;
            let angle = Math.atan2(dy, dx);
            
            // Sine wave flutter factor for fins
            let flutter = Math.sin(t * 0.05 + i * 0.4) * 0.4;
            
            let taper = Math.sin((i / this.numSegments) * Math.PI); // thick in middle
            let spikeSize = taper * 40 * this.scale;
            
            let px1 = this.segments[i].x + Math.cos(angle + Math.PI/2 + flutter) * spikeSize;
            let py1 = this.segments[i].y + Math.sin(angle + Math.PI/2 + flutter) * spikeSize;
            
            let px2 = this.segments[i].x + Math.cos(angle - Math.PI/2 - flutter) * (spikeSize*0.5);

            ctx.moveTo(px1, py1);
            ctx.lineTo(this.segments[i].x, this.segments[i].y);
            ctx.lineTo(px2, py2);
        }
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.globalAlpha = 1; // reset
        ctx.shadowBlur = 0;
    }
}

// Cinematic dark nebula effect colors
// Deep purple, dark magenta, elegant gold
const myDragons = [
    // The massive background majestic one
    new VectorDragon(0, 1.6, 0.003, '#b8004e', 150),
    // The agile glowing one
    new VectorDragon(Math.PI, 1.1, 0.005, '#5c00a3', 100),
    // The golden distant spirit
    new VectorDragon(Math.PI/2, 0.7, 0.002, '#d4af37', 80)
];

let time = 0;
function animate() {
    // Motion blur fade (lasă o urmă ca de fum cinematic)
    ctx.fillStyle = 'rgba(7, 0, 5, 0.15)'; // culoarea de bază
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    time += 1;
    myDragons.forEach(dragon => dragon.draw(time));
    requestAnimationFrame(animate);
}

animate();
