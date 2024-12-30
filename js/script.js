const cards = document.getElementById('cards')
const timeFrames = document.querySelectorAll('.timeframes')

function renderData(data, time) {
    let label;

    switch(time)
    {
        case 'daily':
            label = 'Yesterday'
            break;
        case 'weekly':
            label = 'Last Week'
            break;
        case 'monthly':
            label = 'Last Month'
            break;
        default:
            label = ''
    }

    cards.innerHTML = ''

    data.forEach(item => 
    {
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.innerHTML = `<div class="top ${item.title.toLowerCase()}"></div>
                    <div class="card-info">
                        <div class="ctgr">
                            <h6>${item.title}</h6>
                            <img src="./assets/icon-ellipsis.svg" alt="">
                        </div>
                        <div class="date">
                            <p class="current">${item.timeframes[time].current}hrs</p>
                            <span class="previous">${label} - ${item.timeframes[time].previous}hrs</span>
                        </div>
                    </div>`
        cards.appendChild(card)
        
    }
    )


}

async function getData(time) {
    const res = await fetch('/data.json')
    if(!res.ok) { throw new Error('Failed to fetch data')}
    const data = await res.json()
    renderData(data, time)
}


timeFrames.forEach(time => {
    time.addEventListener('click', () => {
        timeFrames.forEach(timeframe => {
            timeframe.classList.remove('active')
        })
        time.classList.add('active')
    } )
})





