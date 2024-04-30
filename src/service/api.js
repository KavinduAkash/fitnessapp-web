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

export async function getProfileDetails(id) {
    return await Api.callApi(
        _prepareApiObj('get', `/user/id/${id}`, null, "no-body-auth", '')
    )
}


export async function updateMyProfilePic(data) {
    let form = new FormData();
    form.append("file", data)

    return await Api.callApi(
        _prepareApiObj('patch', `/user/my-pic`, form, "form", '')
    )
}

export async function updateMyProfileDetails(data) {
    let body = {
        "id": data.id,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "dob": data.dob,
        "email": data.email,
        "password": null,
        "gender": data.gender,
        "role": "USER",
        "visibility": data.visibility,
        "status": data.status,
        "profilePic": null
    }

    return await Api.callApi(
        _prepareApiObj('put', `/user/my`, body, "json", '')
    )
}

export async function resetPassword(newPassword) {
    let body = {
        "password": newPassword
    }

    return await Api.callApi(
        _prepareApiObj('post', `/auth/reset`, body, "json", '')
    )
}

export async function getUsers(search) {
    return await Api.callApi(
        _prepareApiObj('get', `/user?search=${search}`, null, "no-body-auth", '')
    )
}


export async function followUser(id, follow) {
    let body = {
        "followerId": id,
        "follower": follow
    }
    return await Api.callApi(
        _prepareApiObj('patch', `/user/follow`, body, "json", '')
    )
}

export async function deleteAccount() {
    return await Api.callApi(
        _prepareApiObj('delete', `/user/my`, null, "no-body-auth", '')
    )
}