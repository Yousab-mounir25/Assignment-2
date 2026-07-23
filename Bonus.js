var findKthPositive = function(arr, k) {
     let current = 1;
    let i = 0;

    while (k > 0) {
        if (i < arr.length && arr[i] === current) {
            i++; 
        } else {
            k--; 
            if (k === 0) return current;
        }
        current++;
    }
};
let result = findKthPositive([2,3,4,7,11], 5)
console.log(`the 5th missing number is ${result}`);

let result2 = findKthPositive([1,2,3,4] , 2)
console.log(`the 2nd missing number is ${result2}`)