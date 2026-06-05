// ----------------------------------------------------
// SecureWeb Project: Integrated JavaScript logic
// Includes: Category Filter, Summary Modal, Accordion, Mobile Menu, and System Clock
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. 실시간 시스템 시계
  // ----------------------------------------------------
  const clockElement = document.createElement('div')
  clockElement.style.color = '#03ff40'
  clockElement.style.fontSize = '22px'
  clockElement.style.fontWeight = 'bold'
  clockElement.style.fontFamily = 'monospace'
  clockElement.style.padding = '12px 24px'
  clockElement.style.border = '2px solid #03ff40'
  clockElement.style.borderRadius = '8px'
  clockElement.style.backgroundColor = 'rgba(3, 255, 64, 0.1)'
  clockElement.style.letterSpacing = '1px'

  const clockContainer = document.createElement('div')
  clockContainer.style.display = 'flex'
  clockContainer.style.justifyContent = 'center'
  clockContainer.style.width = '100%'
  clockContainer.style.flexBasis = '100%'
  clockContainer.style.marginTop = '40px'
  clockContainer.style.marginBottom = '40px'

  clockContainer.appendChild(clockElement)

  function updateClock() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    clockElement.innerText = `[SYSTEM ACTIVE] ${hours}:${minutes}:${seconds}`
  }

  setInterval(updateClock, 1000)
  updateClock()

  // ----------------------------------------------------
  // 2. 카테고리 필터링 및 '요약' 팝업 기능
  // ----------------------------------------------------
  const categories = ['전체', '웹', '앱', '네트워크']
  const boxContainer = document.querySelector('.box-container')

  if (boxContainer) {
    const filterContainer = document.createElement('div')
    filterContainer.style.display = 'flex'
    filterContainer.style.justifyContent = 'flex-start'
    filterContainer.style.alignItems = 'center'
    filterContainer.style.gap = '15px'
    filterContainer.style.width = '100%'
    filterContainer.style.flexBasis = '100%'
    filterContainer.style.margin = '0 50px 20px 50px'

    const allBoxes = document.querySelectorAll('.box')

    // 기본 카테고리 버튼들 추가
    categories.forEach((category) => {
      const btn = document.createElement('button')
      btn.innerText = category
      btn.style.padding = '8px 20px'
      btn.style.cursor = 'pointer'
      btn.style.border = '1px solid #444'
      btn.style.borderRadius = '20px'
      btn.style.backgroundColor = '#1e1e2f'
      btn.style.color = '#fff'
      btn.style.fontWeight = 'bold'
      btn.style.transition = '0.3s'

      let hoverColor = '#ffffff'
      if (category === '웹') hoverColor = '#03ff40'
      if (category === '앱') hoverColor = '#038eff'
      if (category === '네트워크') hoverColor = '#ff0303'

      btn.addEventListener('mouseenter', () => {
        btn.style.borderColor = hoverColor
        btn.style.color = hoverColor
      })

      btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = '#444'
        btn.style.color = '#fff'
      })

      btn.addEventListener('click', () => {
        allBoxes.forEach((box) => {
          const span = box.querySelector('.box-top span')
          const cardCategory = span ? span.innerText.trim() : ''
          if (category === '전체' || cardCategory === category) {
            box.style.display = ''
          } else {
            box.style.display = 'none'
          }
        })
      })

      filterContainer.appendChild(btn)
    })

    // 🌟 '요약' 버튼 추가
    const summaryBtn = document.createElement('button')
    summaryBtn.innerText = '요약'
    summaryBtn.style.padding = '8px 20px'
    summaryBtn.style.cursor = 'pointer'
    summaryBtn.style.border = '1px solid #ff0303' // 강조를 위해 빨간 테두리
    summaryBtn.style.borderRadius = '20px'
    summaryBtn.style.backgroundColor = '#1e1e2f'
    summaryBtn.style.color = '#ff0303'
    summaryBtn.style.fontWeight = 'bold'
    summaryBtn.style.transition = '0.3s'
    summaryBtn.style.marginLeft = '10px' // 다른 버튼들과 살짝 띄우기

    summaryBtn.addEventListener('mouseenter', () => {
      summaryBtn.style.backgroundColor = '#ff0303'
      summaryBtn.style.color = '#fff'
    })
    summaryBtn.addEventListener('mouseleave', () => {
      summaryBtn.style.backgroundColor = '#1e1e2f'
      summaryBtn.style.color = '#ff0303'
    })

    filterContainer.appendChild(summaryBtn)

    // 🌟 모달(팝업창) 생성 및 로직
    const modalOverlay = document.createElement('div')
    modalOverlay.style.display = 'none'
    modalOverlay.style.position = 'fixed'
    modalOverlay.style.top = '0'
    modalOverlay.style.left = '0'
    modalOverlay.style.width = '100%'
    modalOverlay.style.height = '100%'
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'
    modalOverlay.style.zIndex = '1000'
    modalOverlay.style.justifyContent = 'center'
    modalOverlay.style.alignItems = 'center'
    modalOverlay.style.flexDirection = 'column'

    const summaryImage = document.createElement('img')
    // ⚠️ 아래 두 줄의 파일명을 실제 준비하신 이미지 파일 이름으로 바꿔주세요!
    const defaultImg = 'summary1.jpg' // 기본 사진
    const hoverImg = 'summary2.jpg' // 바뀌는 사진

    // (테스트용 임시 이미지 - 실제 파일 연결 전까지 화면에 보입니다)
    summaryImage.src =
      'https://via.placeholder.com/800x500/1a1a2e/03ff40?text=Hover+or+Touch+Me!'

    summaryImage.style.maxWidth = '90%'
    summaryImage.style.maxHeight = '80%'
    summaryImage.style.borderRadius = '12px'
    summaryImage.style.boxShadow = '0 0 30px rgba(3, 255, 64, 0.3)'
    summaryImage.style.cursor = 'pointer'
    summaryImage.style.transition = '0.3s'

    // 모바일 터치 사용자를 위한 안내 문구
    const hintText = document.createElement('p')
    hintText.innerText = 'PC: 마우스 오버 / 모바일: 터치'
    hintText.style.color = '#fff'
    hintText.style.marginTop = '20px'

    modalOverlay.appendChild(summaryImage)
    modalOverlay.appendChild(hintText)
    document.body.appendChild(modalOverlay)

    // 요약 버튼 누르면 모달 띄우기
    summaryBtn.addEventListener('click', () => {
      // 실제 이미지 경로로 설정하고 싶으시면 아래 주석(//)을 지워주세요!
      // summaryImage.src = defaultImg;
      modalOverlay.style.display = 'flex'
    })

    // 배경 누르면 모달 닫기
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none'
      }
    })

    // PC: 마우스 올리면 이미지 변경
    summaryImage.addEventListener('mouseenter', () => {
      // summaryImage.src = hoverImg; // 실제 경로 사용 시 주석 해제
      summaryImage.src =
        'https://via.placeholder.com/800x500/1a1a2e/ff0303?text=Image+Changed!'
    })
    summaryImage.addEventListener('mouseleave', () => {
      // summaryImage.src = defaultImg; // 실제 경로 사용 시 주석 해제
      summaryImage.src =
        'https://via.placeholder.com/800x500/1a1a2e/03ff40?text=Hover+or+Touch+Me!'
    })

    // 모바일: 터치(클릭)하면 이미지 변경 (토글 기능)
    let isToggled = false
    summaryImage.addEventListener('click', () => {
      isToggled = !isToggled
      // 실제 경로 사용 시 아래 줄 활용
      // summaryImage.src = isToggled ? hoverImg : defaultImg;
      summaryImage.src = isToggled
        ? 'https://via.placeholder.com/800x500/1a1a2e/ff0303?text=Image+Changed!'
        : 'https://via.placeholder.com/800x500/1a1a2e/03ff40?text=Hover+or+Touch+Me!'
    })

    // 필터 버튼들을 화면에 배치
    const firstBox = boxContainer.querySelector('.box')
    if (firstBox) {
      firstBox.before(filterContainer)
    }

    // 하단 시계 배치
    const bottomSection = boxContainer.querySelector('.bottom')
    if (bottomSection) {
      bottomSection.before(clockContainer)
    }
  }

  // ----------------------------------------------------
  // 3. 자세히 보기 아코디언 토글
  // ----------------------------------------------------
  document.querySelectorAll('.desc').forEach((desc) => {
    desc.style.display = 'none'
  })

  document.querySelectorAll('.toggle').forEach((btn) => {
    btn.addEventListener('click', function () {
      const box = this.closest('.box')
      const desc = box.querySelector('.desc')
      const isHidden = desc.style.display === 'none'

      document.querySelectorAll('.box').forEach((otherBox) => {
        otherBox.querySelector('.desc').style.display = 'none'
        otherBox.querySelector('.toggle').textContent = '자세히 보기 ▾'
      })

      if (isHidden) {
        desc.style.display = 'block'
        this.textContent = '접기 ▴'
      }
    })
  })

  // ----------------------------------------------------
  // 4. 모바일 메뉴
  // ----------------------------------------------------
  const menuBtn = document.getElementById('menuBtn')
  const menu = document.getElementById('mobileMenu')

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('open')
    })

    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open')
      }
    })
  }
})
