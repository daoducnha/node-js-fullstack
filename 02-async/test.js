const seconds = [5,2]
seconds.forEach(s => {
    setTimeout(()=> console.log(`Waited ${s} seconds`), 1000 * s)
})

console.log('done!')