const answer = "APPLE";

let attempts = 0; //시도횟수
let index = 0; //인덱스번호
let timerId;



function appStart() {

    //1. 엔터키를 눌렀을때 정답을 확인해서 키보드에 정답표시가 되게 구현하라.
    //2. 키보드 클릭으로 입력이 가능하도록 구현하라
    // 팁 : 키보드에 클릭이벤트를 등록하기!

    const handleClick = (event) => {
        const keyText = event.target.textContent; //클릭한 키의 텍스트
        const keyId = event.target.id; //클릭한 키의 아이디
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        if (keyText === "ENTER") {
            handleEnterKey();
        } else if (keyId === "back-key") {
            handleBackspace();
        } else {
            thisBlock.innerText = keyText;
            index += 1;
        }

    }
    const keys = document.querySelectorAll('.keyboard-column') //일반키들 전체 선택하기
    //반환받은 keys는 리스트형식이다. 따라서 keys 자체에 이벤트를 줄수 없기 때문에 배열순회함수인 foreach로 key라는 이름의 매개변수로 정한 요소 하나 하나에 이벤트를 준다.  
    keys.forEach((key) => {
        key.addEventListener("click", handleClick);
    });
    const spKeys = document.querySelectorAll('.keyboard-column__custom') //특수키(enter,backspace)들 전체 선택하기
    spKeys.forEach((spkey) => {
        spkey.addEventListener("click", handleClick);
    })

    //게임 종료 메시지 보여주기
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = '게임이 종료됐습니다.';
        div.style = "display:flex; justify-content: center; align-items: center; position:absolute; top:40vh; left:38vw; background-color:white; width:200px; height:100px; "
        document.body.appendChild(div);
    }
    const displayMsg = () => {
        const msg = document.createElement("div");
        msg.innerText = '5글자를 모두 입력해주세요!!';
        msg.style = "display:flex; justify-content: center; align-items: center; position:absolute; top:40vh; left:38vw; color:red; width:300px; height:20px; background-color:white "
        document.body.appendChild(msg);
        setTimeout(() => {
            document.body.removeChild(msg);
        }, 2000)
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
        const row = document.querySelector(`.row${attempts}`);
        if (index === 5) {
            for (let i = 0; i < 5; i++) {
                const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
                const inputText = block.innerText; //입력글자
                const answerText = answer[i]; //정답 한글자
                const keyboard = document.querySelector(`.keyboard-column[data-key='${inputText}']`);
                if (inputText === answerText) {
                    correctCount += 1; // 맞은갯수를 하나 올려준다.
                    block.style.background = "#6AAA64"; //정답과 자리를 맞췄을때
                    keyboard.style.background = "#6AAA64"
                } else if (answer.includes(inputText)) {
                    block.style.background = "#C9B458"; //자리는 틀리고 정답에 단어가 포함됬을때
                    keyboard.style.background = "#C9B458";
                } else {
                    block.style.background = "#787C7E"; //둘다 틀렸을 때
                    keyboard.style.background = "#787C7E";
                }
                block.style.color = "white";
            }
            if (correctCount === 5) { //전부 정답인 경우
                row.classList.add('정답애니메이션');
                gameover();
            } else if (correctCount !== 5 && attempts === 5) {
                gameover();
            } else { //아니면 다음줄
                row.classList.add('오답애니메이션');
                nextLine();
            }
        } else {
            displayMsg();
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