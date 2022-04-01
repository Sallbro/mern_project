export const initialState = false;
export const Reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload;
    }
    return state;
}
export const Reducer1 = (state, action) => {
    if (action.type === "addtocards") {
        console.log("action.payload ", action.payload);
        // state=action.payload;
        return action.payload;
    }

    return state;
}
