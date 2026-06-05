// ----------------------------------------------------
// SecureWeb Project: Integrated JavaScript logic
// Includes: Category Filter, Accordion, Mobile Menu, and System Clock
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. 실시간 시스템 시계 생성 및 업데이트 로직
  // ----------------------------------------------------
  const clockElement = document.createElement('div')

  // 시계 스타일링 (크기 확대)
  clockElement.style.color = '#03ff40'
  clockElement.style.fontSize = '22px' // 기존 14px에서 22px로 확대
  clockElement.style.fontWeight = 'bold'
  clockElement.style.fontFamily = 'monospace'
  clockElement.style.padding = '12px 24px' // 안쪽 여백도 함께 확대
  clockElement.style.border = '2px solid #03ff40' // 테두리 두께 2px로 변경
  clockElement.style.borderRadius = '8px' // 테두리 둥글기 살짝 증가
  clockElement.style.backgroundColor = 'rgba(3, 255, 64, 0.1)'
  clockElement.style.letterSpacing = '1px' // 글자 간격 추가

  // 시계를 가운데 정렬하기 위한 부모 컨테이너 생성
  const clockContainer = document.createElement('div')
  clockContainer.style.display = 'flex'
  clockContainer.style.justifyContent = 'center' // 가로 중앙 정렬
  clockContainer.style.width = '100%'
  clockContainer.style.marginBottom = '30px' // 아래 카드들과의 간격

  clockContainer.appendChild(clockElement)

  function updateClock() {
    const now = new Date()

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    clockElement.innerText = `[SYSTEM ACTIVE] ${hours}:${minutes}:${seconds}`
  }

  // 1초마다 시계 업데이트
  setInterval(updateClock, 1000)
  updateClock() // 즉시 실행

  // ----------------------------------------------------
  // 2. 카테고리 필터링 및 요소 배치
  // ----------------------------------------------------
  const categories = ['전체', '웹', '앱', '네트워크']
  const boxContainer = document.querySelector('.box-container')

  // 박스 정렬 및 Flexbox 설정
  boxContainer.style.display = 'flex'
  boxContainer.style.flexWrap = 'wrap'
  boxContainer.style.justifyContent = 'center'
  boxContainer.style.alignItems = 'flex-start'
  boxContainer.style.gap = '20px'

  const filterContainer = document.createElement('div')
  filterContainer.style.display = 'flex'
  filterContainer.style.justifyContent = 'flex-start'
  filterContainer.style.alignItems = 'center'
  filterContainer.style.gap = '15px'
  filterContainer.style.margin = '20px 50px 20px 50px'

  // 필터 버튼 행을 먼저 카드 박스 위에 삽입
  boxContainer.parentNode.insertBefore(filterContainer, boxContainer)

  // 그 다음 시계 컨테이너를 필터 버튼 행과 카드 박스 사이에 삽입
  boxContainer.parentNode.insertBefore(clockContainer, boxContainer)

  const allBoxes = document.querySelectorAll('.box')

  categories.forEach((category) => {
    const btn = document.createElement('button')
    btn.innerText = category

    // 버튼 기본 디자인
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

    // 필터 컨테이너에 카테고리 버튼 추가
    filterContainer.appendChild(btn)
  })

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
