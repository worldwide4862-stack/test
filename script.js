// 저녁 메뉴 데이터베이스 (이모지, 메뉴명, 설명)
const menuList = [
  { name: '김치찌개', emoji: '🥘', desc: '칼칼하고 얼큰한 한국인의 영혼의 닭고기 스프!' },
  { name: '삼겹살', emoji: '🥓', desc: '오늘 하루 수고한 나에게 주는 노릇노릇한 고기 선물' },
  { name: '치킨', emoji: '🍗', desc: '바삭바삭한 치킨에 시원한 맥주나 음료 한 잔!' },
  { name: '피자', emoji: '🍕', desc: '쭈욱 늘어나는 치즈와 듬뿍 올려진 토핑의 조화' },
  { name: '초밥', emoji: '🍣', desc: '깔끔하고 정갈한 일식이 땡길 때는 싱싱한 초밥' },
  { name: '떡볶이', emoji: '🍡', desc: '매콤달콤한 양념에 쫀득한 떡과 튀김의 환상 조합' },
  { name: '짜장면', emoji: '🍜', desc: '달콤 짭짤한 춘장 소스에 쫄깃한 면발' },
  { name: '파스타', emoji: '🍝', desc: '부드러운 크림이나 상큼한 토마토 소스의 풍미' },
  { name: '햄버거', emoji: '🍔', desc: '두툼한 패티와 프렌치 프라이의 완벽한 쾌락' },
  { name: '족발&보쌈', emoji: '🍖', desc: '야들야들하고 쫀득한 고기와 쌈의 조합' },
  { name: '마라탕', emoji: '🍲', desc: '얼얼하고 매콤해서 스트레스가 싹 풀리는 맛' },
  { name: '돈가스', emoji: '🥩', desc: '겉은 바삭속은 촉촉, 남녀노소 좋아하는 메뉴' }
];

// DOM 요소 가져오기
const emojiDisplay = document.getElementById('emoji-display');
const menuDisplay = document.getElementById('menu-display');
const descDisplay = document.getElementById('desc-display');
const recommendBtn = document.getElementById('recommend-btn');
const actionButtons = document.getElementById('action-buttons');
const retryBtn = document.getElementById('retry-btn');
const searchLink = document.getElementById('search-link');

// 메뉴 추천 로직 함수
function getRandomMenu() {
  // 버튼 비활성화 (연속 클릭 방지)
  recommendBtn.disabled = true;
  emojiDisplay.classList.add('spin');
  
  let counter = 0;
  // 슬롯머신처럼 빠르게 바뀌는 효과
  const interval = setInterval(() => {
    const tempMenu = menuList[Math.floor(Math.random() * menuList.length)];
    emojiDisplay.textContent = tempMenu.emoji;
    menuDisplay.textContent = tempMenu.name;
    counter++;

    // 1.5초(15번) 정도 롤링 후 최종 결정
    if (counter > 15) {
      clearInterval(interval);
      emojiDisplay.classList.remove('spin');
      
      // 최종 메뉴 랜덤 선택
      const finalMenu = menuList[Math.floor(Math.random() * menuList.length)];
      
      // 화면에 표시
      emojiDisplay.textContent = finalMenu.emoji;
      menuDisplay.textContent = finalMenu.name;
      descDisplay.textContent = finalMenu.desc;

      // 네이버 지도 검색 링크 연동
      searchLink.href = `https://map.naver.com/v5/search/${encodeURIComponent(finalMenu.name)}`;

      // 버튼 상태 변경
      recommendBtn.classList.add('hidden');
      actionButtons.classList.remove('hidden');
      recommendBtn.disabled = false;
    }
  }, 100);
}

// 초기화 후 다시 뽑기 함수
function resetMenu() {
  actionButtons.classList.add('hidden');
  recommendBtn.classList.remove('hidden');
  getRandomMenu();
}

// 이벤트 리스너 등록
recommendBtn.addEventListener('click', getRandomMenu);
retryBtn.addEventListener('click', resetMenu);