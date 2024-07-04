const answer = "APPLE";

let attempts = 0; //시도횟수
let index = 0; //인덱스번호
let timerId;

function appStart() {
    //게임 종료 메시지 보여주기
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = '게임이 종료됐습니다.';
        div.style = "display:flex; justify-content: center; align-items: center; position:absolute; top:40vh; left:38vw; background-color:white; width:200px; height:100px; "
        document.body.appendChild(div);
    }

    //다음줄로 넘어가기
    const nextLine = () => {
        if (attempts === 6) {
            return gameover();
        }
        attempts += 1;
        index = 0;
    }

    //게임종료
    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown); //이 이벤트를 지워준다.
        displayGameover();
        clearInterval(timerId);
    }

    //백스페이스 키를 눌렀을 때
    const handleBackspace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`);
            preBlock.innerText = "";
        }
        if (index !== 0) {
            index -= 1;
        }
    }

    //엔터키를  눌렀을 때
    const handleEnterKey = () => {
        let correctCount = 0;

        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
            const inputText = block.innerText; //입력글자
            const answerText = answer[i]; //정답 한글자

            if (inputText === answerText) {
                correctCount += 1; // 맞은갯수를 하나 올려준다.
                block.style.background = "#6AAA64"; //정답과 자리를 맞췄을때
            } else if (answer.includes(inputText)) {
                block.style.background = "#C9B458"; //자리는 틀리고 정답에 단어가 포함됬을때
            } else {
                block.style.background = "#787C7E"; //둘다 틀렸을 때
            }

            block.style.color = "white";

        }

        if (correctCount === 5) { //전부 맞혔으면 게임종료
            gameover();
        } else { //아니면 다음줄
            nextLine();
        }

    }


    //키를 눌렀을때
    const handleKeydown = (event) => {
        const key = event.key.toUpperCase(); //대문자로변경
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        if (event.key === 'Backspace') {
            handleBackspace();
        }
        else if (index === 5) {
            if (event.key === 'Enter') {
                handleEnterKey();
            }
            else {
                return;
            }
        }
        else if (65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key;
            index += 1;
        }


    }

    const startTimer = () => {
        const 시작시간 = new Date();
        function setTime() {
            const 현재시간 = new Date();
            const 흐른시간 = new Date(현재시간 - 시작시간);
            const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
            const timer = document.querySelector("#time");
            timer.innerText = `${분}:${초}`;
        }
        timerId = setInterval(setTime, 1000); // 1(setInterval의 아이디) 을 넣는다.
    }
    startTimer();
    window.addEventListener("keydown", handleKeydown)
}


appStart();