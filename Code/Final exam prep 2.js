function one(input) {
    let [code, ...commands] = input

    let command = commands.shift()

    while (command!="Decode") {
        let [Action, ...Val] = command.split("|")

        switch (Action) {
            case "Move":
                let part = code.split("")
                for (let i=0;i<Val;i++) {
                    let letter = part.shift()
                    part.push(letter)
                }
                code = part.join("")
                break
            case "Insert":
                let change = code.slice(Val[0],Val[0]+1)
                let float = parseFloat(Val[0])
                if (float > code.length) {
                    break
                }
                else if (float === 0) {
                    code = Val[1] + code
                }
                else if (float === code.length) {
                    code = code + Val[1]
                }
                else {
                    code = code.replace(change, Val[1] + change)
                }
                break
            case "ChangeAll":
                code = code.split(Val[0]).join(Val[1])
                break
        }
        command = commands.shift()
    }
    console.log(`The decrypted message is: ${code}`)
}

function two(input) {
    let text = input.shift()
    let foodpattern = /([|#)])(?<type>[A-Za-z ]+)\1(?<date>\d{2}\/\d{2}\/\d{2})\1(?<nutrition>[0-9]+)\1/g
    let daysfood = 0
    let Allfood = []
    
    let ValidFoods = text.matchAll(foodpattern)
    let totalnutrition = 0
    for (const food of ValidFoods) {
        totalnutrition += Number(food.groups.nutrition)
        Allfood.push(food)
    }
    daysfood = Math.floor(totalnutrition/2000)
    console.log(`You have food to last you for: ${daysfood} days!`)
    for (const foods of Allfood) {
        console.log(`Item: ${foods.groups.type}, Best before: ${foods.groups.date}, Nutrition: ${foods.groups.nutrition}`)
    }
};

function three(input) {
    let cities = {};

    let city = input.shift().split("||")
    while (city[0]!="Sail") {
        let [TownName, People, Gold] = city;

        if (cities[TownName]) {
            cities[TownName].TotalPeople += Number(People);
            cities[TownName].TotalGold += Number(Gold);
        }
        else {
            cities[TownName] = {
                TotalPeople: Number(People),
                TotalGold: Number(Gold)
            }
        }
        city = input.shift().split("||");
    }

    let command = input.shift().split("=>");
    while (command[0]!="End") {
        let [Type, town, ... other] = command;

        switch(Type) {
            case "Plunder":
                cities[town].TotalPeople -= Number(other[0]);
                cities[town].TotalGold -= Number(other[1]);
                console.log(`${town} plundered! ${other[1]} gold stolen, ${other[0]} citizens killed.`);
                if (cities[town].TotalPeople == 0 || cities[town].TotalGold == 0) {
                    delete cities[town];
                    console.log(`${town} has been wiped off the map!`);
                }
                break
            case "Prosper":
                if (Number(other[0])<0) {
                    console.log("Gold added cannot be a negative number!");
                    break
                }
                cities[town].TotalGold += Number(other[0])
                console.log(`${other[0]} gold added to the city treasury. ${town} now has ${cities[town].TotalGold} gold.`);
                break
        }
        command = input.shift().split("=>");
    }
    
    if (Object.keys(cities).length > 0) {
        console.log(`Ahoy, Captain! There are ${Object.keys(cities).length} wealthy settlements to go to:`)
        for (const key of Object.keys(cities)) {
            console.log(`${key} -> Population: ${cities[key].TotalPeople} citizens, Gold: ${cities[key].TotalGold} kg`)
        }
    }
    else {
        console.log("Ahoy, Captain! All targets have been plundered and destroyed!");
    }
}

three(["Tortuga||345000||1250",

"Santo Domingo||240000||630",

"Havana||410000||1100",

"Sail",

"Plunder=>Tortuga=>75000=>380",

"Prosper=>Santo Domingo=>180",

"End"])