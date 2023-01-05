/*Requisita versículo da API aleatoriamente*/
let verse = document.getElementById("verso");
let verseRef = document.getElementById("versoRef");
const versions = ['nvi', 'acf'];
const version = getRandom(2) == 0 ? versions[0] : versions[1];
ajax({
    url: `https://www.abibliadigital.com.br/api/verses/${version}/random`,
    method: "get",
    success(response) {
        try {
            const verseBible = JSON.parse(response)
            verse.innerHTML = verseBible.text
            verseRef.innerHTML = `${verseBible.book.name} ${verseBible.chapter}:${verseBible.number} (${verseBible.book.version})`
        } catch (e) {
            errorVerse(e)
        }
    },
    erro(e) {
        errorVerse(e)
    }
})

/*Gera número aleatório*/
function getRandom(numberMax) {
    return Math.floor(Math.random() * numberMax);
}

/*Erro se houver*/
function errorVerse(e) {
    verse.innerHTML = "Desculpe, não foi possível mostrar o versículo!"
    verseRef.innerHTML = e.status === undefined ? `${e}` : `${e.status} - ${e.statusText}`
}

/*Requisição da API e do arquivo JSON*/
function ajax(config) {
    const xhr = new XMLHttpRequest()
    xhr.open(config.method, config.url, true)
    xhr.onload = e => {
        if (xhr.status === 200) {
            config.success(xhr.response)
        } else if (xhr.status >= 400) {
            config.erro({
                status: xhr.status,
                statusText: xhr.statusText
            })
        }
    }
    xhr.send()
}