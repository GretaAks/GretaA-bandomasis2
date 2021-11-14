const baseURL= 'http://localhost:3000';

class API {
    static fetchToys = (success,failure) => {
        fetch(`${baseURL}/toys`)
        .then (res=> res.json())
        .then (success)
        .catch(failure)
    }
    static deleteToys= (id,success, failure) => {
        fetch (`${baseURL}/toys/${id}`, {method:'DELETE'})
        .then (res => res.ok? success() : failure(res.statusText))
        .catch(failure)
    }
}

//API.getToys(
//    console.log,
//    console.error
//)

//API.deleteToys(
//    "2",
//    () => console.log('Ištrinta'),
//    console.error
//)