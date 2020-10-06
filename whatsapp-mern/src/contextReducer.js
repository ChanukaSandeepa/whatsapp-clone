export const ADD_TOKEN = "ADD_TOKEN"
export const SET_CONTEXT = "SET_CONTEXT"

export const initialState = {
    token: undefined
}

console.log("Reducer loading")
export default (state, action) => {
    console.log("reduer token is ", state.token)
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_CONTEXT:
            return action.payload
        default:
            return state
    }
}