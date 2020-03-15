import { API_URL } from '../config';
import { baseService } from './base.service';

function myInfo() {
    const requestOptions = {
        method: 'GET',
        headers: { ...baseService.authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(API_URL + "/myInfo", requestOptions).then(baseService.handleResponse, baseService.handleError);
}

export const userService = {
    myInfo
};
