exports.checkProperties = (obj, keys) => {
    if (obj === undefined) return false;
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

exports.filterProperties = (obj, filter) => {
    if (obj === undefined) return {};
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
