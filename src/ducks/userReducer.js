const initialState = {
    username: '',
    password: '',
    currentUser: {
        id: -1,
        username: '',
        profilePic: ''
    }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const CLEAR_LOGING_INFO = 'CLEAR_LOGING_INFO';
const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

function userReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USERNAME:
            return Object.assign({}, state, {username: action.payLoad});
        case UPDATE_PASSWORD:
            return Object.assign({}, state, {password: action.payLoad});
        case UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: {
                    id: action.payLoad.id,
                    profilePic: action.payLoad.profilePic,
                    username: action.payLoad.username
                }
            }
        case CLEAR_LOGING_INFO:
            return Object.assign({}, state, {username: '', password:''})
        case CLEAR_USER_INFO:
            return Object.assign({}, state, {currentUser: {id: -1, username: '', profilePic: ''}})
        default:
            return state;
    }
}


export function updateUsername(username) {
    return {
        type: UPDATE_USERNAME,
        payLoad: username
    }
}

export function updatePassword(password) {
    return {
        type: UPDATE_PASSWORD,
        payLoad: password
    }
}

export function updateCurrentUser(user) {
    return {
        type: UPDATE_CURRENT_USER,
        payLoad: {
            id: user.id,
            username: user.username,
            profilePic: user.profile_pic
        }
    }
}

export function clearLoginInfo() {
    return {
        type: CLEAR_LOGING_INFO,
    }
}

export function clearUserInfo() {
    return {
        type: CLEAR_USER_INFO
    }
}

export default userReducer;