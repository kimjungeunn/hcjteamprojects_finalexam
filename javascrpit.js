// ----------------------------------------------------
// SecureWeb Project: Integrated JavaScript logic
// Includes: Category Filter, Accordion, Mobile Menu, and System Clock
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. 실시간 시스템 시계 (PPT 15, 16장 개념 활용)
  // ----------------------------------------------------
  const navContainer = document.querySelector('.navbar .container')
  const clockElement = document.createElement('div')

  // 시계 스타일링 (JS로 직접 구현)
  clockElement.style.color = '#03ff40' // 테마 컬러 (초록)
  clockElement.style.fontSize = '14px'
  clockElement.style.fontWeight = 'bold'
  clockElement.style.fontFamily = 'monospace'
  clockElement.style.marginLeft = '20px'
  clockElement.style.padding = '5px 10px'
  clockElement.style.border = '1px solid #03ff40'
  clockElement.style.borderRadius = '4px'
  clockElement.style.backgroundColor = 'rgba(3, 255, 64, 0.1)'

  // 로고 옆에 시계 삽입
  const logo = document.querySelector('.logo')
  logo.after(clockElement)

  function updateClock() {
    const now = new Date() // PPT 16-1: Date 객체 인스턴스 생성

    // PPT 14-1: 변수와 자료형 활용
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    // PPT 17-2: innerText를 사용한 DOM 요소 내용 수정
    clockElement.innerText = `[SYSTEM ACTIVE] ${hours}:${minutes}:${seconds}`
  }

  // 1초마다 시계 업데이트 (PPT 15-1: 이벤트와 타이머 개념)
  setInterval(updateClock, 1000)
  updateClock() // 즉시 실행

  // ----------------------------------------------------
  // 2. 카테고리 필터링 (맞춤형 호버 색상)
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
  filterContainer.style.gap = '15px'
  filterContainer.style.margin = '20px 0 40px 50px'

  boxContainer.parentNode.insertBefore(filterContainer, boxContainer)

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

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open')
  })

  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open')
    }
  })
})
