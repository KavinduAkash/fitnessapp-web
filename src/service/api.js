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

    console.log("asdasdasdasdasd")

    return await Api.callApi(
        _prepareApiObj('post', `/auth/signin`, body, "", '')
    )
}