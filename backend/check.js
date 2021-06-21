const checkProperties = (obj, keys) => {

    let correct = true;
    for (let i = 0; i < keys.length; i++){
        if (keys[i] in obj){
            continue;
        } else {
            correct = false;
            break;
        }
    }
    return correct;
}

const user = {
    name: "Elek",
    age: 23
}

const filterProperties = (obj, filter) => {
    let cp = {...obj };
    let newObj = {}
    Object.keys(cp).map( 
        key => {
        if (filter.indexOf(key) != -1 ) {
            newObj[key] = cp[key];
        }
        });
    return newObj;
}

console.log ( checkProperties(user, ["name", "age"]) );
console.log ( filterProperties(user, ["name"]) );