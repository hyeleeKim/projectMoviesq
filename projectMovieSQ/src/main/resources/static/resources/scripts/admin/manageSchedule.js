// 날짜와 시간을 ISO 형식의 문자열로 변환
function toISODateString(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// 타임존 문제 해결을 위해 -9 시간을 조정
function adjustTimezone(date) {
    date.setHours(date.getHours() - 9);
    return date;
}

// 숫자 여부 판단 함수
function isNumeric(n) {
    return Number(n) === parseInt(n, 10);
}

// 서버에서 기존 스케줄 가져오기
async function fetchExistingSchedules() {
    try {
        const response = await fetch('/admin/ScheduleList');
        if (!response.ok) {
            throw new Error('스케줄 정보 가져오기 실패');
        }
        return await response.json();
    } catch (error) {
        console.error("스케줄 정보를 가져오는 중 오류 발생:", error);
        return [];
    }
}

// 새로 등록하려는 스케줄과 기존 스케줄이 겹치는지 판단하는 함수
async function isScheduleOverlap(movieIndex, theaterIndex, screenIndex, startDateTime, endDateTime) {
    const existingSchedules = await fetchExistingSchedules();
    for (const schedule of existingSchedules) {
        if (schedule.theaterIndex === theaterIndex &&
            schedule.screenIndex === screenIndex) {

            const existingStart = new Date(schedule.timeStart);
            const existingEnd = new Date(schedule.timeEnd);

            // 현재 스케줄의 시작 또는 종료 시간이 기존 스케줄과 겹치는지 확인
            if ((startDateTime >= existingStart && startDateTime < existingEnd) ||
                (endDateTime > existingStart && endDateTime <= existingEnd) ||
                (startDateTime < existingStart && endDateTime > existingEnd)) {
                return true; // 겹치는 스케줄이 있으면 true를 반환
            }
        }
    }
    return false;
}

// 데이터를 가져오는 비동기 함수
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("데이터를 가져오는데 실패하였습니다.");
    }
    return await response.json();
}

// select 태그에 옵션을 채워 넣는 함수
function populateSelect(selectElement, data) {
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.index;

        // titleKo,titleEn, name 값이 존재하는지 확인하고 전자가 없으면 후자를 사용하고 없으면 알 수 없음이 출력된다.
        if(item.titleKo) {
            option.text = item.titleKo;
        }else if (item.titleEn) {
            option.text = item.titleEn;
        } else if(item.name) {
            option.text = item.name;
        } else {
            option.text = '알 수 없음';
        }

        selectElement.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // "등록하기" 버튼을 클릭하면 폼을 보여주는 이벤트 리스너
    document.querySelector("#register-btn").addEventListener("click", function () {
        document.querySelector("#registerCover").classList.add('visible');
        document.querySelector("#registerSchedule").classList.add('visible');
    });

    async function loadOptions() {
        try {
            const movies = await fetchData('/admin/getMovies');
            const theaters = await fetchData('/theater/theaterList');
            const screens = await fetchData('/admin/getScreens');

            populateSelect(document.getElementById('movieSelect'), movies);
            populateSelect(document.getElementById('theaterSelect'), theaters);
            populateSelect(document.getElementById('screenSelect'), screens);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    }

    loadOptions();


    // "닫기" 버튼을 클릭하면 폼을 숨기는 이벤트 리스너
    document.querySelector("#registerSchedule button[type='button']:last-child").addEventListener("click", function () {
        document.querySelector("#registerCover").classList.remove('visible');
        document.querySelector("#registerSchedule").classList.remove('visible');
    });


    // "등록" 버튼 클릭 시 스케줄 등록
    document.querySelector("#registerButton").addEventListener("click", async function (e) {
        e.preventDefault();

        // 각 select 태그의 옵션들을 채워 넣는 함수

        // 사용자가 입력한 정보를 변수에 저장
        // 사용자가 선택한 옵션 값의 index를 가져옴
        const movieIndex = document.querySelector('select[id="movieSelect"]').value;
        const theaterIndex = document.querySelector('select[id="theaterSelect"]').value;
        const screenIndex = document.querySelector('select[id="screenSelect"]').value;
        const startDate = document.querySelector('input[id="startDate"]').value;
        const startTime = document.querySelector('input[id="startTime"]').value;
        const endDate = document.querySelector('input[id="endDate"]').value;
        const endTime = document.querySelector('input[id="endTime"]').value;

        // 시작 시간과 종료 시간을 Date 객체로 변환
        const startDateTime = adjustTimezone(new Date(startDate + 'T' + startTime));
        const endDateTime = adjustTimezone(new Date(endDate + 'T' + endTime));

        // 시작 시간과 종료 시간의 유효성 검사
        if (!startDateTime.getTime() || !endDateTime.getTime() || startDateTime >= endDateTime) {
            alert('올바른 날짜 및 시간 값을 입력해 주세요.');
            return;
        }

        // 입력 값의 유효성 검사
        if (!isNumeric(movieIndex) || !isNumeric(theaterIndex) || !isNumeric(screenIndex)) {
            alert("내용이 비었거나 숫자가 아닙니다.");
            return;
        }

        // 스케줄 중복 검사
        const overlap = await isScheduleOverlap(movieIndex, theaterIndex, screenIndex, startDateTime, endDateTime);
        if (overlap) {
            alert("선택한 시간에 다른 스케줄이 이미 존재합니다. 다른 시간을 선택해 주세요.");
            return;
        }

        // 스케줄 데이터 객체 생성
        const scheduleData = {
            "movieIndex": movieIndex,
            "theaterIndex": theaterIndex,
            "screenIndex": screenIndex,
            "timeStart": toISODateString(startDateTime),
            "timeEnd": toISODateString(endDateTime)
        };

        // 서버로 스케줄 데이터 전송
        try {
            const response = await fetch('/admin/addSchedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scheduleData)
            });

            // 서버 응답 처리
            if (!response.ok) {
                throw new Error('스케줄 추가 실패');
            }

            const data = await response.text();
            alert(data);
            location.reload();
        } catch (error) {
            console.error('에러:', error);
            alert('스케줄 추가 실패. 스케쥴에 중복사항이 있을 수 있습니다. 다시 확인해 주세요')
        }
    });
});


//스케쥴을 불러옴
const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let schedules = [];

async function fetchSchedules() {
    try {
        const response = await fetch('/admin/ScheduleList');
        schedules = await response.json();
        console.log(schedules);

        //가져온 스케줄을 표시
        renderSchedules();
    } catch (error) {
        console.error('에러');
    }
}

//스케줄을 페이지에 맞게 표시하고, 스케줄의 수정 및 삭제 버튼에 이벤트를 붙임
async function renderSchedules() {
    //페이지에 표시할 스케줄의 범위를 계산
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, schedules.length);

    //각 컨트롤러에서 영화, 극장, 스크린을 select 하는 부분을 호출.
    const movies = await fetch('/admin/getMovies').then(res => res.json());
    const screens = await fetch('/admin/getScreens').then(res => res.json());
    const theaters = await fetch('/theater/theaterList').then(res => res.json());

    // movies 배열에서 영화의 인덱스를 키로, 한국어 영화 제목을 값으로 하는 조회 객체를 생성한다.
    // map(): 이 함수는 배열의 각 항목을 키-값 쌍의 배열로 변환하는 데 사용
    //Object.fromEntries(): 이 함수는 키-값 쌍의 이터러블을 받아 객체를 반환
    const movieLookup = Object.fromEntries(movies.map(movie => [movie.index, movie.titleKo]));
    // screens 배열에서 스크린의 인덱스를 키로, 스크린 이름을 값으로 하는 조회 객체를 생성한다.
    const screenLookup = Object.fromEntries(screens.map(screen => [screen.index, screen.name]));
    // theaters 배열에서 극장의 인덱스를 키로, 극장 이름을 값으로 하는 조회 객체를 생성한다.
    const theaterLookup = Object.fromEntries(theaters.map(theater => [theater.index, theater.name]));

    let html = '';
    // 페이지에 표시할 스케줄의 범위를 계산하여 스케줄 리스트를 생성
    for (let i = startIndex; i < endIndex; i++) {
        const schedule = schedules[i];

        // 각 인덱스에 맞게 값을 받아와서 없으면 알 수 없음을 출력
        const movieName = movieLookup[schedule.movieIndex] || '알 수 없음';
        const screenName = screenLookup[schedule.screenIndex] || '알 수 없음';
        const theaterName = theaterLookup[schedule.theaterIndex] || '알 수 없음';


        // html 코드에 스케줄 정보를 추가. 수정과 삭제 버튼에는 각 스케줄의 인덱스를 데이터 속성으로 설정
        html += `
      <tr>
          <td>${i + 1}</td>
          <td>${movieName}</td>
          <td>${theaterName}</td>
          <td>${screenName}</td>
          <td>${new Date(schedule.timeStart).toLocaleString()}</td>
          <td>${new Date(schedule.timeEnd).toLocaleString()}</td>
          <td>
              <button class="edit" data-index="${schedule.index}">수정</button>
              <button class="delete" data-index="${schedule.index}">삭제</button>
          </td>
      </tr>
    `;
    }

    // 스케줄 테이블의 innerHTML을 업데이트하여 스케줄 정보를 페이지에 표시
    const scheduleTable = document.querySelector('#getSchedule');
    scheduleTable.innerHTML = html;

    // 삭제 버튼에 이벤트 리스너 추가
    scheduleTable.addEventListener('click', async function (e) {
        if (e.target.className === 'delete') {
            e.preventDefault();

            try {
                const response = await fetch(`/admin/deleteSchedule?index=${e.target.dataset.index}`, {method: 'DELETE'});

                if (!response.ok) {
                    throw new Error('실패');
                }

                // 서버에서의 응답 확인
                const responseText = await response.text();
                if (responseText !== 'true') {
                    throw new Error('실패');
                }

                // 스케줄 행 삭제
                e.target.parentElement.parentElement.remove();
            } catch (error) {
                console.error('에러');
            }
        }
    });

    renderPagination();

    const modifyCover = document.getElementById('modifyCover');
    const modifyForm = document.getElementById('modifyForm');
    const modifyFormContainer = document.getElementById('modifyFormContainer');

    // 수정 버튼에 이벤트 리스너 추가
    const editButtons = scheduleTable.querySelectorAll('.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            // edit 버튼의 data-index 값을 가져옴. 문자열을 숫자로 바꾸기 위해 단항 연산자 + 를 붙임
            const scheduleIndex = +e.target.dataset.index;
            // 해당 인덱스를 가진 스케줄을 찾음.
            const schedule = schedules.find(s => s.index === scheduleIndex);

            //해당 스케줄을 찾지 못했을 경우에는 오류 메시지를 출력
            if (!schedule) {
                console.error(`Schedule with index ${scheduleIndex} not found!`);
                return;
            }


            // 각 select 태그의 옵션들을 채워 넣는 함수
            async function loadOptions() {
                try {
                    const movies = await fetchData('/admin/getMovies');
                    const theaters = await fetchData('/theater/theaterList');
                    const screens = await fetchData('/admin/getScreens');

                    populateSelect(document.getElementById('movieModify'), movies);
                    populateSelect(document.getElementById('theaterModify'), theaters);
                    populateSelect(document.getElementById('screenModify'), screens);
                } catch (error) {
                    console.error("오류 발생:", error);
                }
            }

            loadOptions();

            // 시간을 조정하여 시작 시간과 끝시간을 설정
            let startDateTime = new Date(schedule.timeStart);
            let endDateTime = new Date(schedule.timeEnd);

            startDateTime.setHours(startDateTime.getHours() - 3);
            endDateTime.setHours(endDateTime.getHours() - 3);

            // DATE값을 "YYYY-MM-DDTHH:mm:ss" 형식으로 필드안에 넣음
            const formattedStartDateTime = startDateTime.toISOString().slice(0, -5);
            const formattedEndDateTime = endDateTime.toISOString().slice(0, -5);

            document.querySelector('input[name="startDate"]').value = formattedStartDateTime.slice(0, 10);
            document.querySelector('input[name="startTime"]').value = formattedStartDateTime.slice(11);
            document.querySelector('input[name="endDate"]').value = formattedEndDateTime.slice(0, 10);
            document.querySelector('input[name="endTime"]').value = formattedEndDateTime.slice(11);

            //커버, 폼, 컨테이너 보이게
            modifyForm.classList.add('visible');
            modifyCover.classList.add('visible');
            modifyFormContainer.classList.add('visible');
        });
    });

    // 뒷 배경을 눌렀을 때도 커버랑 수정 창이 사라지게
    modifyCover.addEventListener('click', () => {
        modifyCover.classList.remove('visible');
        modifyFormContainer.classList.remove('visible');
    });
    //취소버튼 작동
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        modifyCover.classList.remove('visible');
        modifyForm.classList.remove('visible');
        modifyFormContainer.classList.remove('visible');
    });

    //수정하기 버튼을 눌렀을 때 이벤트
    modifyFormContainer.querySelector("#modifyForm").addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = e.target;

        //날짜, 시간을 가져옴
        const startDate = form['startDate'].value;
        const startTime = form['startTime'].value;
        const endDate = form['endDate'].value;
        const endTime = form['endTime'].value;

        // 시작 날짜와 시간을 합쳐서 Date 객체를 만듬
        let startDateTime = new Date(`${startDate}T${startTime}`);
        // 종료 날짜와 시간을 합쳐서 Date 객체를 만듬
        let endDateTime = new Date
        (`${endDate}T${endTime}`);
        // 시작 시간을 설정
        startDateTime.setHours(startDateTime.getHours());
        // 종료 시간을 설정
        endDateTime.setHours(endDateTime.getHours());

        const data = {
            index: form['index'].value,
            movieIndex: form['movieModify'].value,      // 'movieSelect'를 'movieModify'로 변경
            theaterIndex: form['theaterModify'].value,  // 'theaterSelect'를 'theaterModify'로 변경
            screenIndex: form['screenModify'].value,    // 'screenSelect'를 'screenModify'로 변경
            timeStart: startDateTime.toISOString(), // 시작 시간을 ISO 형식의 문자열로 변환
            timeEnd: endDateTime.toISOString(), // 종료 시간을 ISO 형식의 문자열로 변환
        };

        try {
            const response = await fetch(`/admin/updateSchedule`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('스케쥴 수정 실패');
            }

            const updatedSchedule = await response.json();
            console.log('스케쥴 수정', updatedSchedule);

            modifyForm.reset();
            modifyCover.classList.remove('visible');
            modifyForm.classList.remove('visible');
            modifyFormContainer.classList.remove('visible');

            window.location.href = "/admin/manageSchedule";

        } catch (error) {
            console.error(error);
        }

    });
    modifyCover.addEventListener('click', (event) => {
        // 바깥쪽을 클릭해도 수정창이 사라지게
        if (event.target === modifyCover) {
            modifyCover.classList.remove('visible');
            modifyForm.classList.remove('visible');
        }
    });

}

//페이지 바뀌는 스크립트
function changePage(page) {
    if (page >= 1 && page <= Math.ceil(schedules.length / ITEMS_PER_PAGE)) {
        currentPage = page;
        renderSchedules();
    }
}

//페이지 번호 버튼
const PAGES_PER_VIEW = 10; // 한 번에 보여주는 페이지 개수
let startPage = 1;
let endPage = PAGES_PER_VIEW;

// 페이지 번호 버튼
function renderPagination() {
    const paginationDiv = document.querySelector('#pagination');
    const totalPages = Math.ceil(schedules.length / ITEMS_PER_PAGE);

    // << 버튼 (startPage가 1보다 클 때만 표시)
    let paginationHtml = startPage > 1 ? '<button onclick="movePageRange(-1)"> << </button>' : '';

    // 페이지 번호
    for (let page = startPage; page <= Math.min(endPage, totalPages); page++) {
        paginationHtml += `<button onclick="changePage(${page})" ${page === currentPage ? 'disabled' : ''}> ${page}</button>`;
    }

    // >> 버튼 (endPage가 totalPages보다 작을 때만 표시)
    paginationHtml += endPage < totalPages ? '<button onclick="movePageRange(1)"> >> </button>' : '';

    paginationDiv.innerHTML = paginationHtml;
}

// 페이지 범위 이동
function movePageRange(direction) {
    startPage += direction * PAGES_PER_VIEW;
    endPage += direction * PAGES_PER_VIEW;
    renderPagination();
}

window.onload = () => {
    fetchSchedules();
};





