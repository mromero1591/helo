const initialState = {
    posts: [],
    searchInput: '',
    myPost: true,
}

const UPDATE_POSTS = 'UPDATE_POSTS';
const UPDATE_SEARCH_INPUT = 'UPDATE_SEARCH_INPUT';
const UPDATE_MY_POST = 'UPDATE_MY_POST';

function postReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_POSTS:
            return {
                ...state,
                posts: [...action.payLoad]
        }
        case UPDATE_SEARCH_INPUT:
            return {
                ...state,
                searchInput: action.payLoad
            }
        case UPDATE_MY_POST:
            return {
                ...state,
                myPost: action.payLoad
        }
        default:
            return state
    }
}

export function updatePost(posts) {
    return {
        type: UPDATE_POSTS,
        payLoad: posts
    }
}

export function updateSearchInput(searchInput) {
    return {
        type: UPDATE_SEARCH_INPUT,
        payLoad: searchInput
    }
}

export function updateMyPost(myPost) {
    return {
        type: UPDATE_MY_POST,
        payLoad: myPost
    }
}

export default postReducer;