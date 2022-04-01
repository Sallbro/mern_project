export const Reducer_addshop = (state = [], action) => {
    switch (action.type) {
        case 'Action_addshop':
            return [
                action.data
            ]

        default:
            return [
                ...state
            ]
    }
}