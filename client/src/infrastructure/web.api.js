'use strict';

import request from 'superagent';
import dispatcher from './dispatcher';
import store from 'marcuswestin/store.js';

export default class WebAPI {
    constructor() {
        this.baseUrl = '/api/v1';
    }

    _parseResponse(response) {
        let result = response;
        switch (response.statusCode) {
            case 200:
            case 201:
                dispatcher.dispatch({
                    res: result,
                    action: 'api:response'
                });
                break;
            case 400:
                result.hasErrors = true;
                console.log('Request validation has failed: ' + result.text);
                dispatcher.dispatch({
                    res: response.body,
                    action: 'api:validation'
                });
                break;
            default:
                console.log('Request has failed: ' + response.text);
                dispatcher.dispatch({
                    res: result,
                    action: 'api:error'
                });
                break;
        }

        return result;
    }

    _makeRequest(request, options) {
        request.set('Authorization', `Bearer ${store.get('token')}`);

        return new Promise((resolve, reject) => {
             request.end((error, response) =>  !response ? reject(error) : resolve(response));
        })
        .then(response => this._parseResponse(response))
        .catch(error => this._parseResponse(error));
    }

    _appendQueryParams(url, params = {}) {
        let query = '?';

        for (let key in params) {
            // if param is boolean => paste him into url
            let value = typeof params[key] === 'boolean' ? params[key] : params[key] || '';
            query = `${query}${key}=${value}&`;
        }
        return url + query.slice(0, query.length - 1);
    }

    //getFile(url, params = {}) {
    //    let _url = url;
    //    params.authorization = `Bearer ${this.config.token}`;
    //    _url = `${this.config.baseUrl}${_url}`;
    //    _url = this._appendQueryParams(_url, params);
    //    window.open(_url, '_blank');
    //}

    get(url, params) {
        url = this._appendQueryParams(url, params);
        return this._makeRequest(request.get(url), {});
    }

    post(url, data, options) {
        data || (data = {});
        return this._makeRequest(request.post(url).send(data), options);
    }

    put(url, data, options) {
        data || (data = {});
        return this._makeRequest(request.put(url).send(data), options);
    }

}

export default new WebAPI();