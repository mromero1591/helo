const initialState = {
    username: '',
    password: '',
    currentUser: {
        username: '',
        profilePic: ''
    }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const CLEAR_LOGING_INFO = 'CLEAR_LOGING_INFO';


function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USERNAME:
            return Object.assign({}, state, {username: action.payLoad});
        case UPDATE_PASSWORD:
            return Object.assign({}, state, {password: action.payLoad});
        case UPDATE_CURRENT_USER:
            return Object.assign({}, state, {currentUser: {username: action.payLoad.username, profilePic: action.payLoad.profilePic}});
        case CLEAR_LOGING_INFO:
            return Object.assign({}, state, {username: '', password:''})
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
            username: user.username,
            profilePic: user.profilePic
        }
    }
}

export function clearLoginInfo() {
    return {
        type: CLEAR_LOGING_INFO,
    }
}
export default reducer;