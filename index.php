<?php
    require("db.php");
?>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>펀드매니저</title>
    <link rel="stylesheet" href="/css/style.css">
    <script>
    <?php
        if(isset($_SESSION['user'])) {
            $u = $_SESSION['user'];
            echo "let user = {name:'" . $u->name . "', id:'" . $u->id . "'};";
        }else {
            echo "let user = null;";
        }
    ?>
    </script>
    <script src="/js/Investor.js"></script>
    <script src="/js/Fund.js"></script>
    <script src="/js/App.js"></script>
</head>

<body>
    <header>
        <div class="container">
            <div class="logo">
                창업지원펀드
            </div>
            <nav>
                <ul>
                    <li><a href="#" data-target="list" class="active">펀드 보기</a></li>
                    <li><a href="#" data-target="register">펀드 등록</a></li>
                    <li><a href="#" data-target="investor">투자자</a></li>
                </ul>

                <?php if( isset($_SESSION['users']) ) : ?>
                    <div class="nav-btn">
                        <span><?= $_SESSION['users']->name ?></span>
                        <span><?= $_SESSION['users']->money ?></span>
                        <a href="/logout.php" class="btn btn-red">로그아웃</a>
                    </div>
                <?php else : ?>
                    <div class="nav-btn">
                        <a href="/login.php" class="btn btn-blue">로그인</a>
                        <a href="/register.php" class="btn btn-red">회원가입</a>
                    </div>
                <?php endif ?>
            </nav>
        </div>
    </header>
    <section id="content">
        <div class="inner-content">
            <article id="list" class="active">
                <h2>펀드 리스트</h2>
                <div class="fund-list">

                </div>
            </article>

            <article id="register">
                <h2>펀드 등록</h2>
                <div class="form-container">
                    <form>
                        <div class="form-group">
                            <label for="fundNo">펀드번호</label>
                            <input type="text" readonly disabled id="fundNo">
                        </div>
                        <div class="form-group">
                            <label for="fundName">펀드이름</label>
                            <input type="text" id="fundName">
                        </div>
                        <div class="form-group">
                            <label for="endDate">모집마감일</label>
                            <input type="date" id="endDate">
                        </div>
                        <div class="form-group">
                            <label for="total">모집금액</label>
                            <input type="number" id="total">
                        </div>

                        <div class="button-row">
                            <button type="button" class="btn btn-blue btn-lg">
                                등록
                            </button>
                        </div>
                    </form>
                </div>
            </article>

            <article id="investor">
                <h2>투자자 리스트</h2>
                <div class="inv-list">
                </div>
            </article>

        </div>
    </section>

    <div class="popup">
        <div class="inner">
            <h2>투자하기</h2>
            <form>
                <div class="form-group">
                    <label for="investNo">펀드번호</label>
                    <input type="text" id="investNo" readonly disabled>
                </div>
                <div class="form-group">
                    <label for="investName">창업펀드명</label>
                    <input type="text" id="investName" readonly disabled>
                </div>
                <div class="form-group">
                    <label for="name">투자자명</label>
                    <input type="text" id="name">
                </div>
                <div class="form-group">
                    <label for="money">투자금액</label>
                    <input type="text" id="money">
                </div>
                <div class="form-group">
                    <label for="sign">서명</label>
                    <canvas id="sign"></canvas>
                </div>

                <div class="button-row">
                    <button type="button" class="btn btn-blue" id="btnInvest">
                        투자하기
                    </button>
                    <button type="button" class="btn btn-red" id="btnClose">
                        닫기
                    </button>
                </div>
            </form>
        </div>
    </div>


    <div id="toastList">
        
    </div>
</body>

</html>