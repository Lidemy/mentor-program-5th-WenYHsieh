function reverse(str) {
    let result = [];
    for (let i=str.length-1; i>=0; i--){
        // 依序叫號: 長度-1開始, >=0符合的話，每一輪印出來後減1 
        result.push(str[i]);
    }
    result = result.join('');
    console.log(result);
    return 
}


