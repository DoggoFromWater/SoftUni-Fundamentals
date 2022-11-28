function one(arr) {
    let [key, ...instructions] = arr

    let instruction = instructions.shift()
    while (instruction!="Generate") {
        let [name, ...values] = instruction.split(">>>")

        switch (name) {
            case "Contains":
                if (key.includes(values)) {
                    console.log(`${key} contains ${values}`)
                }
                else {
                    console.log("Substring not found!")
                }
                break
            case "Flip":
                let Case = values.shift()
                let start = values.shift()
                let end = values.shift()
                let change = key.substring(start,end)
                let newChange = Case == "Upper" ? change.toUpperCase() : change.toLowerCase()
                key = key.replace(change, newChange)
                console.log(key)
                break
            case "Slice":
                let Newstart = values.shift()
                let Newend = values.shift()
                let Change = key.substring(Newstart,Newend)
                key = key.replace(Change, "")
                console.log(key)
                break
        }
        instruction = instructions.shift()
    }
    console.log(`Your activation key is: ${key}`)
}


function two(input) {
    let text = input.shift()
    let coolthreshold = 1;
    let numpattern = /\d/g
    let emojipattern = /([:*]){2}[A-Z][a-z]{2,}\1{2}/g
    let ValidEmojis = []
    let coolemojis = []

    let nums = text.matchAll(numpattern)
    for (const num of nums) {
        coolthreshold = coolthreshold * parseFloat(num[0])
    }

    let emojis = text.matchAll(emojipattern)
    for (const emoji of emojis) {
        ValidEmojis.push(emoji[0])
    }
    
    for (const emoji of ValidEmojis) {
        let coolness = 0
        let i=2
        while (i<emoji.length-2) {
            coolness = coolness + emoji.charCodeAt(i)
            i++
        }
        if (coolness>coolthreshold) [
            coolemojis.push(emoji)
        ]
    }
    console.log(`Cool threshold: ${coolthreshold}`)
    console.log(`${ValidEmojis.length} emojis found in the text. The cool ones are:`)
    for (const emoji of coolemojis) {
        console.log(emoji)
    }
};

function three(input) {
    let [count, ...other] = input
    let plants = {};

    for (let i=0;i<count;i++) {
        let plant = other.shift()
        let [PlantName, PlantRarity] = plant.split("<->")

        // if (PlantName in plants) {
        //     plants.PlantName.rarity = Number(PlantRarity);
        // }
        // else {
        //     plants[PlantName] = {};
        //     plants[PlantName].ratings = []
        //     plants[PlantName].rarity = Number(PlantRarity);
        // }

        plants[PlantName] = {
            rarity: PlantRarity,
            ratings: []
        }
    }

    let regex = /(?<type>Rate|Update|Reset): (?<name>[A-Za-z]+)( - (?<val>\d{1,2}))?/
    let instruction = other.shift()
    while (instruction.includes("Exhibition") != true) {
        let NewInstruction = instruction.match(regex)
        let Command = NewInstruction[1];
        let Name = NewInstruction[2]
        
        if (String(Name) in plants != true) {
            console.log("error")
            instruction = other.shift()
            continue
        }

        switch(Command) {
            case "Rate":
                plants[Name].ratings.push(NewInstruction.groups.val)
                break
            case "Update":
                plants[Name].rarity = NewInstruction.groups.val
                break
            case "Reset":
                plants[Name].ratings = []
                break
        }
        instruction = other.shift()
    }
    function rate(key) {
        let rated = 0
        for (const rating of plants[key].ratings) {
            rated+= Number(rating)
        }
        rated = plants[key].ratings.length ? rated/ plants[key].ratings.length : 0
        return rated
    }
    console.log(`Plants for the exhibition:`)
    for (const key of Object.keys(plants)) {
        console.log(`- ${key}; Rarity: ${plants[key].rarity}; Rating: ${rate(key).toFixed(2)}`)
    }
}

three(["3",

"Arnoldii<->4",

"Woodii<->7",

"Welwitschia<->2",

"Rate: Woodii - 10",

"Rate: Welwitschia - 7",

"Rate: Arnoldii - 3",

"Rate: Woodii - 5",

"Update: Woodii - 5",

"Reset: Arnoldii",

"Exhibition"])
