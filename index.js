const arr = [
    { name: 'Julius', age: 25 },
    { name: 'Chris', age: 31 },
    { name: 'Gregui', age: 22 },
    { name: 'Jill', age: 19 },
    { name: 'James', age: 27 },
    { name: 'Tiozin', age: 27 },
    { name: 'Tiozinhoverso', age: 27 },
    { name: 'Gutoboss', age: 27 },
    { name: 'Oreia', age: 27 },
    { name: 'Dan do MKT', age: 27 }, 
]

const listItens = (items, page, limit) => {
    return items.slice((page - 1) * limit, page * limit);
}

/**
   * Iterate over data
   * @generator
   * @function getAllPersons
   * @yields {array} list of persons
   */
async function *getAllPersons() {
    let lastPage = 0; // initialize with min value
    let done = false; // indicates end of iteration
    const limit = 3; // indicates the number of persons to be returned per batch
    while (!done) {
        const result = await listItens(arr, lastPage + 1, limit);
        lastPage++;
        if (result.length < limit) {
            done = true;
        }
        yield result;
    }
}

const exec = async () => {
    const iterator = getAllPersons();
    for await (const persons of iterator) {
        // This for loop behaves synchronously.
        // Next iteration will begin after execution of code inside this loop
        console.log(persons.length, persons[0]);
        // await Promise.all(PROCESSAMENTO AQUI)
    }
}

exec()