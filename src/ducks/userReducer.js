var initialState = {
    username: '',
    id: -1,
    profilePic: ''
}


const UPDATE_USER = 'UPDATE_USER';

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER: 
            return {
                username: action.payLoad.username,
                id: action.payLoad.id,
                profilePic: action.payLoad.profilePic,
            }
        default: 
            return state;
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payLoad: user
    }
}