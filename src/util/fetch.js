export default (url , params) => {
    return fetch(url, {
        method:'post',
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then((data)=>{
        return data;
    })
    .catch(error => console.log('error is', error));;
};
