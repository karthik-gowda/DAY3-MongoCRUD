const updateButton = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');

updateButton.addEventListener('click', () => {
    console.log('update button clicked')
        //Hit the update end point
    const payload = {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Karthik'
        })
    }

    fetch('/updateEmployee', payload)
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true);
        })
        .catch(error => { console.log('Error') })

})

deleteButton.addEventListener('click', () => {
    console.log('Delete button clicked')
        //Hit the delete end point

    const payload = {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Karthik',
        })
    }
    fetch('/deleteEmployee', payload)
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'delete operation failed') {
                console.log('Delete operation failed')
            }
        })
        .catch(error => { console.log('Error') })
})





// fetch('/deleteEmployee', {
//         method: 'delete',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Karthik'
//         })
//     }
//     .then(res => {
//         if (res.ok) return res.json()
//     })
//     .then(response => {
//         window.location.reload(true);
//     })

// )