class Investor {
    constructor(fund, name, money, sign) {
        this.fund = fund;
        this.name = name;
        this.money = money * 1;
        this.sign = sign;
        this.signImage = new Image();
        this.signImage.src = sign;
    }

    getTemplate() {
        let div = document.createElement("div");
        div.classList.add("investor");
        div.innerHTML = `<span>${this.fund.number}</span>
                    <span>${this.fund.name}</span>
                    <span>${this.name}</span>
                    <span>${this.money.toLocaleString()}원</span>
                    <button class="btn btn-blue">투자계약서</button>`;
        div.querySelector("button").addEventListener("click", this.download.bind(this));
        return div;
    }

    download(){
        let canvas = document.createElement("canvas");
        canvas.width = 793;
        canvas.height = 495;

        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.src = "/images/funding.png";
        
        img.onload = () => {
            ctx.drawImage(img, 0,0,793,495);
            
            ctx.fillStyle = "#fff";
            ctx.textBaseline = "middle";
            ctx.font = "23px Arial";
            ctx.fillText(this.fund.number, 340, 176);
            ctx.fillText(this.fund.name, 340, 217);
            ctx.fillText(this.name, 340, 267);
            ctx.fillText(this.money, 340, 311);

            ctx.drawImage(this.signImage, 470, 390, 300, 80);

            let a = document.createElement("a");
            a.href = canvas.toDataURL();
            a.setAttribute("download", "inbest.png");
            a.click();
    
        }
    }
}