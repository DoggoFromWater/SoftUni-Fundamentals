let one = (arr) => {
    let sum = 0
    let sum2 = 0
    for (let i=0;i<arr.length;i++) {
        sum = sum + arr[i]
        if (arr[i] % 2==0) {
            arr[i] = arr[i] + i
        }
        else {
            arr[i] = arr[i] - i
        };
        sum2 = sum2 + arr[i]
    };
    console.log(arr)
    console.log(`before ${sum}`)
    console.log(`after ${sum2}`)
};

let two = (arr,arr2) => {
    for (let i=0;i<arr.length;i++) {
        for (let y=0;y<arr2.length;y++) {
            if (arr[i] === arr2[y]) {
                console.log(arr[y])
            };
        };
    };
};

