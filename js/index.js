let fruits = [
    {id: 1, title: 'Apple', price: 20, img: 'img/apple.jpg'}, 
    {id: 2, title: 'Orange', price: 30, img: 'img/orange.jpg'},
    {id: 3, title: 'Pineapple', price: 50, img: 'img/pineapple.jpg'},
]

const modal = $.modal({
    title: 'Modal by Horezmi',
    closable: true,
    content: `
        <h2>Modal is working</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, quos.</p>
    `,
    width: '700px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler() {
            modal.close()
        }}
    ],
})

const toHTML = fruit => `
    <div class='col'>
        <div class="card" style="width: 18rem;">
            <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <button class="btn btn-primary" data-type='price' data-id='${fruit.id}''${fruit.id}'>Show price</button>
                <button class="btn btn-danger" data-type='delete' data-id='${fruit.id}''${fruit.id}'>Delete card</button>
            </div>
        </div> 
    </div>
`

const createCards = () => {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}
createCards()

const priceModal = $.modal({
    title: `Price of fruit`,
    closable: true,
    width: '500px',
    footerButtons: [
        {text: 'Ok ', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})

document.addEventListener('click', event => {
    const buttonDataType = event.target.dataset.type
    const buttonDataId = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === buttonDataId)
    if (buttonDataType === 'price')
    {
        priceModal.setContent(`
            <p>Price of <strong>${fruit.title}</strong> is ${fruit.price} cent</p>
        `)
        priceModal.open()
    }
    else if (buttonDataType === 'delete')
    {
        $.confirm({
            title: 'Are you sure you want to delete this fruit?',
            content: `You are deleting: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== buttonDataId)
            createCards()
        }).catch(() => {})
    }
})

