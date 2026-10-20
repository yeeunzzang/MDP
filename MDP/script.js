// =========================
// HTML 요소 가져오기
// =========================

const webcam = document.getElementById("webcam");

const cameraPage = document.getElementById("cameraPage");
const resultPage = document.getElementById("resultPage");

const captureBtn = document.getElementById("captureBtn");
const resetBtn = document.getElementById("resetBtn");

const captureCanvas = document.getElementById("captureCanvas");
const ctx = captureCanvas.getContext("2d");

const cameraMessage = document.getElementById("cameraMessage");


// =========================
// 카메라 실행
// =========================

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
})
.then((stream) => {

    webcam.srcObject = stream;

})
.catch((error) => {

    console.error("카메라를 사용할 수 없습니다:", error);

    cameraMessage.textContent =
        "카메라를 사용할 수 없습니다.";

});


// =========================
// 화면 캡처
// =========================

captureBtn.addEventListener("click", () => {

    // 카메라가 아직 준비되지 않았는지 확인
    if (webcam.videoWidth === 0 || webcam.videoHeight === 0) {

        alert("카메라가 아직 준비되지 않았습니다.");

        return;
    }


    // 실제 카메라 영상 크기에 맞게 캔버스 크기 설정
    captureCanvas.width = webcam.videoWidth;
    captureCanvas.height = webcam.videoHeight;


    // =========================
    // 상하 + 좌우 반전해서 캔버스에 그리기
    // =========================

    ctx.save();

    // 캔버스의 오른쪽 아래로 원점 이동
    ctx.translate(
        captureCanvas.width,
        captureCanvas.height
    );

    // X축 + Y축 모두 반전
    ctx.scale(-1, -1);

    // 카메라 영상 그리기
    ctx.drawImage(
        webcam,
        0,
        0,
        captureCanvas.width,
        captureCanvas.height
    );

    ctx.restore();


    // =========================
    // 화면 전환
    // =========================

    cameraPage.classList.add("hidden");
    resultPage.classList.remove("hidden");

});


// =========================
// 다시 촬영
// =========================

resetBtn.addEventListener("click", () => {

    // 캔버스 초기화
    ctx.clearRect(
        0,
        0,
        captureCanvas.width,
        captureCanvas.height
    );


    // 결과 내용 초기화
    document.getElementById("textResult").innerHTML = `
        <h2>텍스트 결과</h2>
        <p>텍스트 결과가 여기에 표시됩니다.</p>
    `;

    document.getElementById("imageResult").innerHTML = `
        <h2>이미지 결과</h2>
        <p>이미지 결과가 여기에 표시됩니다.</p>
    `;


    // 카메라 화면으로 돌아가기
    resultPage.classList.add("hidden");
    cameraPage.classList.remove("hidden");

});