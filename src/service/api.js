import * as Api from "./api_service";
const _prepareApiObj = (method, endpoint, body, state, customUrl) => {
    const apiObject = {}
    apiObject.method = method
    apiObject.endPoint = endpoint
    apiObject.body = body
    apiObject.state = state
    apiObject.customUrl = customUrl
    return apiObject
}

export async function login(data) {
    let body = {
            "email": data.email,
            "password": data.password
    };

    return await Api.callApi(
        _prepareApiObj('post', `/auth/signin`, body, "", '')
    )
}

export async function register(data) {
    let body = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email,
        "dob": data.dob,
        "gender": data.gender,
        "password": data.password
    };

    return await Api.callApi(
        _prepareApiObj('post', `/auth/signup`, body, "", '')
    )
}

export async function getMyProfileDetails() {
    return await Api.callApi(
        _prepareApiObj('get', `/user/my`, null, "no-body-auth", '')
    )
}