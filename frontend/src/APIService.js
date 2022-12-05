export default class APIService {
    static LoginUser(body) {
        const api = process.env.REACT_APP_BACKEND_URL.concat('auth/');
        return fetch(api, {
            'method': 'POST', 
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
            
        }).then(resp => resp.json())
    }

    static RegisterUser(body) {
        const api = process.env.REACT_APP_BACKEND_URL.concat('register/');
        return fetch(api, {
            'method': 'POST', 
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
            
        }).then(resp => resp.json())
    }

    // static ValidateCredentials(body) {
        
    //     // const data = new FormData()
    //     // data.append('username', username)
    //     // data.append('password', password)
    //     // console.log(data)
    //     // console.log('test')
    //     return fetch('http://127.0.0.1:8000/api/validate/', {
    //         'method': 'POST', 
    //         headers : {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(body)
            
    //     }).then(resp => resp.json())
    // }

    // static GetMyProfileInfo(body, token) {
    //     return fetch('http://127.0.0.1:8000/api/myprofile/', {
    //         'method': 'GET', 
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Token ${token['mytoken']}`
    //         },
    //         body: JSON.stringify(body)
            
    //     }).then(resp => resp.json())
    // }
}