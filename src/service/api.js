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

export async function createPost(data) {
    let form = new FormData();
    let file = data.files;
    form.append(`file1`, file[0]?file[0]:null)
    form.append(`file2`, file[1]?file[1]:null)
    form.append(`file3`, file[2]?file[2]:null)
    form.append(`file4`, file[3]?file[3]:null)
    form.append("note", data.note);

    return await Api.callApi(
        _prepareApiObj('post', `/post`, form, "form", '')
    )
}

export async function getPosts() {
    return await Api.callApi(
        _prepareApiObj('get', `/post/feed`, null, "no-body-auth", '')
    )
}

export async function getMyPosts() {
    return await Api.callApi(
        _prepareApiObj('get', `/post/my`, null, "no-body-auth", '')
    )
}

export async function likePost(id) {
    return await Api.callApi(
        _prepareApiObj('patch', `/post/like/${id}`, null, "no-body-auth", '')
    )
}

export async function addComment(id, comment) {
    let body = {
        "postId": id,
        "comment": comment
    }
    return await Api.callApi(
        _prepareApiObj('post', `/post/comment`, body, "json", '')
    )
}

export async function getPostComments(postId) {
    return await Api.callApi(
        _prepareApiObj('get', `/post/comment/post/${postId}`, null, "no-body-auth", '')
    )
}

export async function deleteComment(id) {
    return await Api.callApi(
        _prepareApiObj('delete', `/post/comment/${id}`, null, "no-body-auth", '')
    )
}


export async function createMealPlan(mealName, mealDesc, foods) {
    let body = {
        "title": mealName,
        "description": mealDesc,
        "isCurrent": true,
        "meals": foods
    }
    return await Api.callApi(
        _prepareApiObj('post', `/meal`, body, "json", '')
    )
}

export async function updateMealPlan(id, mealName, mealDesc, foods) {
    let body = {
        "id": id,
        "title": mealName,
        "description": mealDesc,
        "isCurrent": true,
        "meals": foods
    }
    return await Api.callApi(
        _prepareApiObj('put', `/meal`, body, "json", '')
    )
}

export async function getMealPlan() {
    return await Api.callApi(
        _prepareApiObj('get', `/meal`, null, "no-body-auth", '')
    )
}

export async function getMyMealPlan() {
    return await Api.callApi(
        _prepareApiObj('get', `/meal/my`, null, "no-body-auth", '')
    )
}

export async function getUserMealPlan(id) {
    return await Api.callApi(
        _prepareApiObj('get', `/meal/user/${id}`, null, "no-body-auth", '')
    )
}

export async function deleteMealPlan(id) {
    return await Api.callApi(
        _prepareApiObj('delete', `/meal/${id}`, null, "no-body-auth", '')
    )
}

export async function createWorkoutPlan(workoutName, workoutDesc, workouts) {
    let body = {
        "title": workoutName,
        "description": workoutDesc,
        "isCurrent": true,
        "exercises": workouts
    }
    return await Api.callApi(
        _prepareApiObj('post', `/workout`, body, "json", '')
    )
}

export async function updateWorkoutPlan(workoutId, workoutName, workoutDesc, workouts) {
    let body = {
        "id": workoutId,
        "title": workoutName,
        "description": workoutDesc,
        "isCurrent": true,
        "exercises": workouts
    }
    return await Api.callApi(
        _prepareApiObj('post', `/workout`, body, "json", '')
    )
}

export async function getEx() {
    return await Api.callApi(
        _prepareApiObj('get', `/workout/exercise`, null, "no-body-auth", '')
    )
}

export async function getWorkouts() {
    return await Api.callApi(
        _prepareApiObj('get', `/workout`, null, "no-body-auth", '')
    )
}

export async function getMyWorkouts() {
    return await Api.callApi(
        _prepareApiObj('get', `/workout/my`, null, "no-body-auth", '')
    )
}

export async function deleteWorkout(id) {
    return await Api.callApi(
        _prepareApiObj('delete', `/workout/${id}`, null, "no-body-auth", '')
    )
}