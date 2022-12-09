const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (e) => {
    const type = e.target.dataset.type
    if(type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i'
        ? e.target
        : e.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy'){
        copyClickBoard(e.target.textContent)
        
    }
})

function copyClickBoard (text) {
    return navigator.clipboard.writeText(text)
}

function generateRandomColor() {
    const hexcodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexcodes[Math.floor(Math.random() * hexcodes.length)]
    }
    return '#' + color
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        // const color = generateRandomColor()

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
         ? colors[index]
         ? colors[index]
         : generateRandomColor()
         : generateRandomColor()

        if(!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background = color
    })
    updateColorsHash(colors)
}

function updateColorsHash (colors = []) {
    document.location.hash = colors.map(col => col.substring(1)).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map((color => '#' + color))
    }
    return []
}

setRandomColors(true)