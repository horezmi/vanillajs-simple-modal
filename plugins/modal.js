const noop = () => {}

const _createModalFooter = (buttons = []) => {
    if (buttons.length === 0)
        return document.createElement('div')
    const footerWrap = document.createElement('div')
    footerWrap.classList.add('modal-footer')
    buttons.forEach(button => {
        const $button = document.createElement('button')
        $button.textContent = button.text
        $button.classList.add('btn')
        $button.classList.add(`btn-${button.type || 'secondary'}`)
        $button.onclick = button.handler ||  noop
        footerWrap.appendChild($button)
    })
    return footerWrap
}

const _createModal = options => {
    const DEFAULT_WIDTH = '600px'
    const DEFAULT_TITLE = 'Modal'
    const DEFAULT_NONE = ''
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <div class="modal-header">
                <span class="modal-title">${options.title || DEFAULT_TITLE}</span>
                ${options.closable ? '<span class="modal-close" data-close="true">&times;</span>' : ''}
            </div>
            <div class="modal-body" data-content>
                ${options.content || DEFAULT_NONE}
            </div>
        </div>
    </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    modal.querySelector('.modal-body').after(footer)
    document.body.appendChild(modal)
    return modal
}

$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closed = true
    let destroyed = false
    const modal = {
        open() {
            if (destroyed)
                return console.log("Modal is destroyed")
            closed && $modal.classList.add('open')
            closed = false
            if (typeof options.onOpen === 'function') {
                options.onOpen()
            }
        },
        close() {
            if (destroyed)
                return console.log("Modal is destroyed")
            if (!closed)
            {   
                $modal.classList.remove('open')
                $modal.classList.add('hide')
                setTimeout(() => {
                    $modal.classList.remove('hide')
                    closed = true
                    if (typeof options.onClose === 'function') {
                        options.onClose()
                    }
                }, ANIMATION_SPEED)
            }
        },
    }
    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }
    $modal.addEventListener('click', listener)
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('clcik', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content').innerHTML = html
        },
    })
}