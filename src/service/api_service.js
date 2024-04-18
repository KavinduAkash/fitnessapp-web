import axios from "axios"
import * as base_url from './public_url'
import {ACCESS_TOKEN} from "../utils/const.js";

let result; // request variable
export const callApi = async (apiObject) => {
    const promise = new Promise((resolve) => {
        // =========== define request header ===========

        let headers = {};
        if(apiObject.state === "form") {
            // Manage request header for multipart form data
            headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        } else if(apiObject.state === "json") {
            // Manage request header for json body data with auth
            headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        } else if(apiObject.state === "no-body-auth") {
            // Manage request header for json body data with auth
            headers = {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        } else {
            // Manage request header for json body data without auth
            headers = {
                'Content-Type': 'application/json',
            }
        }

        // =============================================

        // ============= define axios call =============

        axios[apiObject.method](`${apiObject.customUrl ? apiObject.customUrl : `${base_url.FULL_BASE_URL}${apiObject.endPoint}`}`, apiObject.method !== 'get' && apiObject.method !== 'delete' ? apiObject.body : {headers: headers}, {headers: headers})
            .then(async response => {
                if (response.data.errorCode) {
                    result = await {data: response.data, message: response.data.errorContent, status: 0, success: false}
                } else {
                    result = await {data: response.data, status: 1, success: true}
                }

                resolve(result)
            }).catch(async error => {
                if (error !== undefined) {
                    if (error.response === undefined) {
                        result = await {
                            success: false,
                            status: 0,
                            message: "Your connection was interrupted",
                            data: {
                                title: "Your connection was interrupted",
                                detail: ""
                            }
                        }
                    } else if (error.response.status === 401) {
                        if (apiObject.state === "renewToken") {
                            result = await {
                                success: false,
                                status: 2,
                                message: error.response.data.message,
                                data: error.response.data
                            }
                        } else if (apiObject.state === "login") {
                            result = await {
                                success: false,
                                status: 0,
                                message: error.response.data.message,
                                data: error.response.data
                            }
                        } else {
                            result = await {
                                success: false,
                                status: 0,
                                message: error.response.data.error_description,
                                data: error.response.data
                            }
                            // await renewTokenHandler(apiObject)
                        }

                    } else if (error.response.status === 403) {
                        result = await {
                            success: false,
                            status: 2,
                            message: "Access is denied.",
                            data: {
                                title: "Access is denied.",
                                detail: ""
                            }
                        }
                    } else if (error.response.status === 417 || error.response.status === 404) {
                        result = await {
                            success: false,
                            status: 0,
                            message: "Oops! Something went wrong.",
                            data: {
                                title: "Oops! Something went wrong.",
                                detail: ""
                            }
                        }
                    } else {
                        result = await {
                            success: false,
                            status: 2,
                            message: "Sorry, something went wrong.",
                            data: {
                                title: "Sorry, something went wrong.",
                                detail: ""
                            }
                        }
                    }
                } else {
                    result = await {
                        success: false,
                        status: 2,
                        message: "Your connection was interrupted!",
                        data: {
                            title: "Your connection was interrupted!",
                            detail: ""
                        }
                    }
                }
                resolve(result)
            })

        // =============================================
    })
    return await promise;
}