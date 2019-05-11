class App {
    
    constructor(){
        //펀드 리스트
        this.fundList = [];
        this.fundCnt = 1; //현재 펀드번호
        this.nav = document.querySelectorAll("nav > ul a");
        this.nav.forEach(x => {
            x.addEventListener("click", this.changeMenu.bind(this));
        });

        //투자자 리스트
        this.invList = [];

        this.articleList = document.querySelectorAll("article");

        this.loadingMethod = {
            "list": this.loadingList.bind(this),
            "register": this.loadingRegister.bind(this),
            "investor": this.loadingInvestor.bind(this)
        }

        //투자자들을 담는 공간
        this.invContainer = document.querySelector(".inv-list");
        //펀드들을 담는 공간
        this.fundContainer = document.querySelector(".fund-list");

        document.querySelector("#register button")
                .addEventListener("click", this.registerFund.bind(this));

        this.popup = document.querySelector(".popup");
        document.querySelector("#btnClose")
            .addEventListener("click", this.closePopup.bind(this));
        document.querySelector("#btnInvest")
            .addEventListener("click", this.investFund.bind(this));

        this.signCanvas = document.querySelector("#sign");
        this.signCanvas.width = this.signCanvas.clientWidth;
        this.signCanvas.height = this.signCanvas.clientHeight;
        this.sCtx = this.signCanvas.getContext("2d");

        this.beforePoint = {x:0, y:0};
        this.startDraw = false;
        //싸인창에 마우스 클릭시
        this.signCanvas.addEventListener("mousedown", (e)=>{
            this.startDraw = true;
            this.beforePoint.x = e.offsetX;
            this.beforePoint.y = e.offsetY;
        });
        this.signCanvas.addEventListener("mouseup", (e)=>{
            this.startDraw = false;
        });

        this.signCanvas.addEventListener("mousemove", (e) => {
            if(!this.startDraw) return;
            this.sCtx.beginPath();
            this.sCtx.moveTo(this.beforePoint.x, this.beforePoint.y);
            this.sCtx.lineTo(e.offsetX, e.offsetY);
            this.sCtx.stroke();
            this.beforePoint.x = e.offsetX;
            this.beforePoint.y = e.offsetY;
        });

        this.toastContainer = document.querySelector("#toastList")
        this.loadingFundList();
        this.loadingInvestorList();
    }

    loadingFundList() {
        let req = new XMLHttpRequest();
        req.open("GET", "/fundlist.php");
        this.fundList = [];
        req.onreadystatechange = () => {
            if(req.readyState === XMLHttpRequest.DONE){
                if(req.status === 200 ){
                    let json = JSON.parse(req.responseText);
                    json.data.forEach(x => {
                        let fund = new Fund(x.id, x.name, x.end_date, x.total, x.current);
                        this.fundList.push(fund);
                    });
                }else {
                    this.showMsg("전송중 오류 발생");
                }
                this.nav[0].click();
            }
        }
        req.send();
    }

    investFund(){
        let fundNo = document.querySelector("#investNo").value;
        let money = document.querySelector("#money").value * 1;
        
        if(money <= 0){
            this.showMsg("금액을 올바르게 입력하세요");
            return;
        }

        let signData = this.signCanvas.toDataURL();

        let req = new XMLHttpRequest();
        req.open("POST", "/add_fund.php");

        req.onreadystatechange = () => {
            if(req.readyState === XMLHttpRequest.DONE){
                if(req.status === 200 ){
                    let json = JSON.parse(req.responseText);
                    
                    this.showMsg(json.msg);
                    if(json.success){
                        this.popup.querySelector("#btnClose").click();
                        this.loadingFundList(); //펀드리스트 갱신
                        this.loadingInvestorList(); //투자자 리스트 갱신
                    }

                }else {
                    this.showMsg("전송 오류 발생");
                }
            }
        };

        let formData = new FormData();
        formData.append("id", fundNo);
        formData.append("money", money);
        formData.append("sign", signData);

        req.send(formData);
    }

    loadingInvestorList (){
        let req = new XMLHttpRequest();
        req.open("GET", "/investor_list.php");
        this.invList = [];
        req.onreadystatechange = () => {
            if(req.readyState === XMLHttpRequest.DONE){
                if(req.status === 200 ){
                    let json = JSON.parse(req.responseText);
                    
                    json.data.forEach(x => {
                        let inv = new Investor({number:x.fid, name:x.fname}, x.uname, x.money, x.sign);
                        this.invList.push(inv);
                    });
                }
            }
        }
        req.send();
    }

    openPopup(fund){
        if(user == null){
            this.showMsg("로그인 후 투자하실 수 있습니다.");
            return;
        }
        this.popup.querySelector("#investNo").value = fund.number;
        this.popup.querySelector("#investName").value = fund.name;
        this.popup.querySelector("#name").value = user.name;
        this.popup.querySelector("#money").value = 0;
        this.sCtx.clearRect(0,0,this.signCanvas.width, this.signCanvas.height);
        this.popup.classList.add("active");
    }

    closePopup(){
        this.popup.classList.remove("active");
    }

    changeMenu(e){
        e.preventDefault();
        let target = e.target.dataset.target;

        this.articleList.forEach(x => x.classList.remove("active"));
        document.querySelector("#" + target).classList.add("active");
        
        this.nav.forEach(x => x.classList.remove("active"));
        e.target.classList.add("active");

        this.loadingMethod[target]();

        //크기조절 코드
        let inner = document.querySelector(".inner-content");
        let h = document.querySelector("#" + target).clientHeight;
        inner.style.height = h + 'px';
    }

    //펀드 등록페이지
    loadingRegister(){
        let no = "00000" + this.fundCnt;
        no = no.substring(no.length - 5);

        document.querySelector("#fundNo").value = no;
        document.querySelector("#fundName").value = "";
        document.querySelector("#endDate").value = "";
        document.querySelector("#total").value = "";
    }

    //펀드 등록하는 로직
    registerFund(){
        let no = document.querySelector("#fundNo").value;
        let name = document.querySelector("#fundName").value;
        let endDate = document.querySelector("#endDate").value;
        let total = document.querySelector("#total").value;
        if(name == "" || endDate == "" || total == ""){
            this.showMsg("값이 누락되어 있습니다.");
            return;
        }

        let req = new XMLHttpRequest();
        req.open("POST", "/invest_ok.php");

        req.onreadystatechange = () =>{
            if(req.readyState === XMLHttpRequest.DONE) {
                if(req.status === 200){
                    let json = JSON.parse(req.responseText);
                    this.showMsg(json.msg);
                    if(json.success ){
                        let recvData = json.data;
                        let fund = new Fund(recvData.id, name, endDate, total);
                        this.fundList.push(fund);
                        this.fundCnt++;
                        this.nav[0].click();              
                    }
                }else {
                    console.log('문제 발생');
                }
            }
        }

        let formData = new FormData();
        formData.append("name", name);
        formData.append("endDate", endDate);
        formData.append("money", total);

        req.send(formData);
    }

    //펀드 리스트 페이지
    loadingList(){
        this.fundContainer.innerHTML = "";
        this.fundList.forEach(x => {
            let div = x.getTemplate();
            this.fundContainer.appendChild(div);
            div.querySelector("button")
                .addEventListener("click", ()=>{
                    this.openPopup(x);
                });
            x.drawCircle();
        });
    }

    //투자자 보는 페이지
    loadingInvestor(){
        this.invContainer.innerHTML = "";
        this.invList.forEach(x => {
            this.invContainer.appendChild(x.getTemplate());
        });
    }

    showMsg(msg){
        let div = document.createElement("div");
        div.classList.add("toast");
        div.innerHTML = `<p class="msg">${msg}</p>
            <span class="close">&times;</span>`;
        let closed = false;

        let closeTimer = setTimeout( ()=>{
            if(closed) return;
            closed = true;
            div.style.opacity = 0;
            setTimeout(()=>{
                this.toastContainer.removeChild(div);
            }, 600);
        }, 2500);

        div.querySelector(".close").addEventListener("click", ()=>{
            if(closed) return;
            closed = true;
            div.style.opacity = 0;
            setTimeout(()=>{
                this.toastContainer.removeChild(div);
            }, 600);
        });

        this.toastContainer.appendChild(div);
    }
}



window.onload = function(){
    const app = new App();
}