export const Reducer_app = (state = [], action) => {
    switch (action.type) {
        case 'Action_app':
            return [
               action.data
            ]

        default:
            return [
                ...state
            ]
    }
}