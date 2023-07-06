const query = {
    get(element) {
        return document.querySelector(element)
    }
}

// Typing
const title = query.get('.typing')
const titleArr = title.innerHTML.split('')
//Dark Theme
const html = query.get('html')
const check = query.get('#chk')
//Menu Mobile
const menu = query.get('#menu')
const menuItems = query.get('#menu-mobile')

const hexagonArea = query.get('#hexagon-area')
const cardContainer = query.get('#card-container')
const searchInput = query.get('#search')
const menuLinks = document.querySelectorAll('#menu-mobile a, .nav-desktop a')
const body = query.get('body')

const allProjects = [
    {
        img: './img/perfil.png',
        title: 'Card',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, nesciunt consequuntur iure nam quia deleniti eaque officia in eos at odit laudantium quisquam modi autem. Ipsam quas earum dolor soluta.',
        linkLive: '',
        linkCode: ''
    },
    {
        img: './img/perfil.png',
        title: 'Section',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, nesciunt consequuntur iure nam quia deleniti eaque officia in eos at odit laudantium quisquam modi autem. Ipsam quas earum dolor soluta.',
        linkLive: '',
        linkCode: ''
    },
    {
        img: './img/perfil.png',
        title: 'Search',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, nesciunt consequuntur iure nam quia deleniti eaque officia in eos at odit laudantium quisquam modi autem. Ipsam quas earum dolor soluta.',
        linkLive: 'https://www.google.com/',
        linkCode: 'https://www.google.com/'
    },
    {
        img: './img/perfil.png',
        title: '1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, nesciunt consequuntur iure nam quia deleniti eaque officia in eos at odit laudantium quisquam modi autem. Ipsam quas earum dolor soluta.',
        linkLive: '',
        linkCode: ''
    },
    {
        img: './img/perfil.png',
        title: '2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, nesciunt consequuntur iure nam quia deleniti eaque officia in eos at odit laudantium quisquam modi autem. Ipsam quas earum dolor soluta.',
        linkLive: '',
        linkCode: ''
    },
    {
        img: './img/perfil.png',
        title: '3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, nesciunt consequuntur iure nam quia deleniti eaque officia in eos at odit laudantium quisquam modi autem. Ipsam quas earum dolor soluta.',
        linkLive: 'https://www.google.com/',
        linkCode: 'https://www.google.com/'
    }
]

let itemsPerPage = 3

const state = {
    page: 1,
    itemsPerPage,
    totalPage: Math.ceil(allProjects.length / itemsPerPage),
    maxVisibleButtons: 3
}

const controls = {
    next() {
        state.page++

        const lastPage = state.page > state.totalPage
        if (lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--

        if (state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1
        }

        state.page = +page

        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners() {
        query.get("#first").addEventListener('click', () => {
            controls.goTo(1)
            filterSearch()
        })

        query.get("#last").addEventListener('click', () => {
            controls.goTo(state.totalPage)
            filterSearch()
        })

        query.get("#next").addEventListener('click', () => {
            controls.next()
            filterSearch()
        })

        query.get("#prev").addEventListener('click', () => {
            controls.prev()
            filterSearch()
        })
    }
}

const buttons = {
    element: query.get('#list'),
    create(number) {
        const button = document.createElement('div')

        button.innerHTML = number

        button.classList.add("paginate-item")

        if (state.page == number) {
            button.classList.add('mark')
        }

        button.addEventListener('click', event => {
            const page = event.target.innerText
            controls.goTo(page)
            filterSearch()
        })

        buttons.element.appendChild(button)
    },
    update() {
        buttons.element.innerHTML = ''

        const { maxLeft, maxRight } = buttons.calculateMaxVisible()

        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    calculateMaxVisible() {
        const { maxVisibleButtons } = state

        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }

        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage
        }

        if (maxLeft < 1) maxLeft = 1

        return { maxLeft, maxRight }
    }
}

const init = () => {
    titleTyping(titleArr)
    renderHexagons()
    filterSearch()
    controls.createListeners()
}

const getStyle = (element, style) =>
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

const initialColors = {
    bg: getStyle(html, "--bg"),
    textColor: getStyle(html, '--text-color'),
    bgCards: getStyle(html, '--bg-cards'),
    iconsText: getStyle(html, '--icons-text')
}

const darkMode = {
    bg: getStyle(html, '--dark'),
    textColor: getStyle(html, '--white'),
    bgCards: '#212121',
    iconsText: '#212121'
}

const transformKey = key =>
    '--' + key.replace(/([A-Z])/, '-$1').toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key => {
        html.style.setProperty(transformKey(key), colors[key])
    })
}

const titleTyping = (titleArray) => {
    title.innerHTML = ''

    titleArray.map((item, i) => {
        setTimeout(() => {
            title.innerHTML += item
        }, 100 * i);
    })
}

const hexagons = [
    {
        elementIcon: '<i class="devicon-html5-plain" style="color: var(--purple);"></i>',
        elementName: '<h3>HTML 5</h3>'
    },
    {
        elementIcon: '<i class="devicon-css3-plain" style="color: var(--purple);"></i>',
        elementName: '<h3>CSS 3</h3>'
    },
    {
        elementIcon: '<i class="devicon-javascript-plain" style="color: var(--purple);"></i>',
        elementName: '<h3>JavaScript</h3>'
    },
    {
        elementIcon: '<i class="devicon-react-original" style="color: var(--purple);"></i>',
        elementName: '<h3>React</h3>'
    },
    {
        elementIcon: '<i class="devicon-redux-original" style="color: var(--purple);"></i>',
        elementName: '<h3>Redux</h3>'
    },
    {
        elementIcon: '<i class="devicon-nodejs-plain" style="color: var(--purple);"></i>',
        elementName: '<h3>Node</h3>'
    },
    {
        elementIcon: '<i class="devicon-express-original" style="color: var(--purple);"></i>',
        elementName: '<h3>Express</h3>'
    },
    {
        elementIcon: '<i class="devicon-sequelize-plain" style="color: var(--purple);"></i>',
        elementName: '<h3>Sequelize</h3>'
    },
    {
        elementIcon: '<i class="devicon-bootstrap-plain" style="color: var(--purple);"></i>',
        elementName: '<h3>Bootstrap</h3>'
    },
]

const renderHexagons = () => {
    hexagons.map(hex => {
        hexagonArea.innerHTML += `
            <div class="hexagon">
                ${hex.elementIcon}
                ${hex.elementName}
            </div>
        `
    })
}

const renderAllProjects = (array) => {
    array.length === 0
        ? cardContainer.innerHTML = "<div class='not-found'>Search not found</div>"
        : ''
    array.map(project => {
        cardContainer.innerHTML += `
            <div class="card">
                <div class="card-img">
                    <img src=${project.img} alt=${project.title}>
                </div>
                <div class="card-body">
                    <h3>${project.title}</h3>
                    <p>${project.text}</p>
                    <div class="card-buttons">
                        <a href='${project.linkLive}' class="live">See live</a>
                        <a href='${project.linkCode}'class="code">Code</a>
                    </div>
                </div>
            </div>
        `
    })
}

const filterSearch = () => {
    const inputValue = searchInput.value.trim().toLowerCase()

    const searchProjects = allProjects.filter(project =>
        project.title
            .trim()
            .toLowerCase()
            .includes(inputValue)
    )

    cardContainer.innerHTML = ''

    state.totalPage = Math.ceil(searchProjects.length / itemsPerPage)

    const list = {
      element: query.get('#card-container'),
      update() {
        list.element.innerHTML = ''

        let page = state.page - 1
        let start = page * state.itemsPerPage
        let end = start + state.itemsPerPage

        const paginatedItems = searchProjects.slice(start, end)
        return paginatedItems
      }
  }

  const update = () => {
    buttons.update()
  }

  update()

    renderAllProjects(list.update())
}

init()

//Events

//Scroll
window.addEventListener('scroll', () => {
    let header = document.querySelector('.main-header')
    if (menu.innerHTML.trim() === 'menu') {
        if (window.scrollY > 0) {
            header.classList.add('roll')
        } else {
            header.classList.remove('roll')
        }
    } else {
        header.style.height = '80px'
    }
})

menuLinks.forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault()

        const element = e.target
        const id = element.getAttribute('href')
        const sectionTop = document.querySelector(id).offsetTop

        if(id === '#projects'){
            menu.innerHTML = 'menu'
            menuItems.style.top = '-100vh'
            body.style.overflowY = 'auto'

            window.scroll({
                top: sectionTop - 70,
                behavior: 'smooth'
            })
        } else {
            menu.innerHTML = 'menu'
            menuItems.style.top = '-100vh'
            body.style.overflowY = 'auto'

            window.scroll({
                top: sectionTop,
                behavior: 'smooth'
            })
        }
    })
})

//Dark Theme
check.addEventListener('change', ({ target }) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

//Menu Toggle
menu.addEventListener('click', () => {
    if (menu.innerHTML.trim() === 'menu') {
        menuItems.style.top = 'calc(0vh + 60px)'
        menu.innerHTML = 'cancel'
        body.style.overflowY = 'hidden'
    } else {
        menu.innerHTML = 'menu'
        menuItems.style.top = '-100vh'
        body.style.overflowY = 'auto'
    }
})

//Search
searchInput.addEventListener('keyup', () => {
    state.page = 1
    filterSearch()
})