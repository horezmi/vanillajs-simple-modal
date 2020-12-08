$.confirm = options => {
    const ANIMATION_SPEED = 200
    return new Promise((resolve, reject) => {
        const deleteModal = $.modal({
            title: options.title,
            width: '500px',
            closable: false,
            content: options.content,
            onClose() {
                deleteModal.destroy()
                console.log('close')
            },
            footerButtons: [
                {text: 'Cancel', type: 'secondary', handler() {
                    deleteModal.close()
                    reject()
                }},
                {text: 'Delete', type: 'danger', handler() {
                    deleteModal.close()
                    resolve()
                }}
            ],
        })
        setTimeout(() => deleteModal.open(), ANIMATION_SPEED)
    })
}


