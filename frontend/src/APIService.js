export default class APIService {
    static LoginUser(body) {
        return fetch('http://backend:8000/auth/', {
            'method': 'POST', 
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
            
        }).then(resp => resp.json())
    }
}