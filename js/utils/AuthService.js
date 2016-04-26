import request from 'reqwest';
import when from 'when';

import AccountActions from '../actions/AccountActions'

class AuthService {
    login(email, password) {
        return when(request({
            url: '/api/sessions/create',
            method: 'POST',
            type: 'json',
            data: {
                email, password
            }
        }))
        .then(function(response) {
            var jwt = response.id_token;
            console.log(jwt);
            
            AccountActions.loginUser(jwt);
            return true;
        });
    }
}

export default new AuthService()