var color = ["#999999","#333333","#336799","#3C3F41"];
var data = [25,35,40,10];

function drawCircle(){
    var canvas = document.getElementById("bingtu");
    var ctx = canvas.getContext("2d");
    var startPoint= 1.5 * Math.PI;
    for(var i=0;i<data.length;i++){
        ctx.fillStyle = color[i];
        ctx.strokeStyle = color[i];
        ctx.beginPath();
        ctx.moveTo(112,65);
		ctx.arc(112,65,65,startPoint,startPoint-Math.PI*2*(data[i]/100),true);
        ctx.fill();
        ctx.stroke();
        startPoint -= Math.PI*2*(data[i]/100);
    }
}
drawCircle();