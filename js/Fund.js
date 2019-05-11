class Fund {
    constructor(number, name, endDate, total, current = 0){
        this.number = number;
        this.name = name;
        this.endDate = endDate;
        this.total = total * 1;
        this.current = current * 1;
        this.canvas = null;
    }

    invest(money){
        if(this.current + money > this.total){
            return {success:false, msg:"투자 금액이 전체 금액을 초과합니다."};
        } else {
            this.current += money;
            return {success:true, msg:"투자하였습니다. 감사합니다."};
        }
    }

    drawCircle(){
        if(this.canvas == null) return;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        
        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        let r = x - 10; //전체 너비보다 30픽셀 작게 설정
        let PI = Math.PI;
        let p = Math.floor(this.current / this.total * 100); 
        

        let ctx = this.canvas.getContext("2d");
        
        ctx.beginPath();
        ctx.arc(x, y, r, - PI / 2, - PI / 2 + 2 * PI);
        ctx.fillStyle = "#ddd";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, r, - PI / 2, - PI / 2 + PI * p / 50);
        ctx.fillStyle = "skyblue";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, r - 20, - PI / 2, - PI / 2 + 2 * PI);
        ctx.fillStyle = "#fff";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        ctx.fillText(p + "%", x, y);

    }

    getTemplate(){
        let div = document.createElement("div");
        div.classList.add("fund");
        div.innerHTML = `
            <div class="canvas-container">
                <canvas></canvas>
            </div>
            <div class="info">
                <h4>${this.number}</h4>
                <p class="name">${this.name}</p>
                <p class="end-date">${this.endDate}</p>
                <p class="data-set">
                    <span class="current">${this.current.toLocaleString()}</span> /
                    <span class="total">${this.total.toLocaleString()}</span>
                </p>
                <div class="button-row">
                    <button class="btn btn-blue btn-sm">투자하기</button>
                </div>
            </div>`;
        this.canvas = div.querySelector("canvas");
        return div;
    }
}