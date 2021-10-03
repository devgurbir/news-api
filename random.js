let arr1 = [1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
})

console.log(arr1)

let arr2 = [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });

  console.log(arr2)
