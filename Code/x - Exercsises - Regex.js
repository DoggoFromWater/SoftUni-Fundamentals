let one = (input) => { 
    let pattern = /\b[A-Z]{1}[a-z]{2,} [A-Z][a-z]{2,}\b/g
    let names = [];
    while ((ValidName = pattern.exec(input)) !== null) {
        names.push(ValidName[0])
    }
    console.log(names.join(" - "))
}

let two = (input) => {
    let pattern = /\+359(- )2\1\d{3}\1\d{4}/g
    let numbers = []
    
    while ((ValidNumber = pattern.exec(input)) !== null) {
        numbers.push(ValidNumber[0])
    }
    console.log(numbers.join(", "))
}

let three = (input) => {
    let pattern = /\b(?<day>\d{1,2})(\.?-?\/?)(?<month>[A-Z][a-z]{2})\2(?<year>\d{4})\b/g

    let ValidYear = pattern.exec(input)
    while (ValidYear) {
        let day = ValidYear.groups.day
        let month = ValidYear.groups.month
        let year = ValidYear.groups.year
        console.log(`Day: ${day}, Month: ${month}, Year: ${year}`)
        ValidYear = pattern.exec(input)
    }
}

three(['13/Jul/1928, 10-Nov-1934, , 01/Jan-1951,f 25.Dec.1937 23/09/1973, 1/Feb/2016'])

let arr = []

arr.push()