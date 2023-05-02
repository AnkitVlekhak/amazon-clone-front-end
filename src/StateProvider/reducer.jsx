export const initialState = {
    basket: [],
    itemCount: {},
    user: null,
    updated: false
};
export const localState = JSON.parse(localStorage.getItem("info"));
console.log(localState);
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            const k = Object.keys(state.itemCount);
            const ind = action.item.id;
            if (k.includes(`${action.item.id}`) && state.itemCount[ind] != 0) {
                console.log("HELLO");
                return {
                    ...state, basket: [...state.basket], itemCount: { ...state.itemCount, [ind]: state.itemCount[ind] + 1 }
                }
            } else {
                return {
                    ...state, basket: [...state.basket, action.item], itemCount: { ...state.itemCount, [action.item.id]: 1 }
                }
            }
        case 'REMOVE_ITEM':
            let t = action.item.time;
            if (state.itemCount[action.item.id] == 1) {
                return {
                    ...state, basket: [...state.basket.filter((e) => {
                        return (e.id !== action.item.id && t > 0) ? t : --t;
                    })], itemCount: { ...state.itemCount, [action.item.id]: 0 }
                }
            } else {
                const ind = action.item.id;
                return {
                    ...state, itemCount: { ...state.itemCount, [action.item.id]: state.itemCount[ind] - 1 }
                }
            }

        case "EMPTY_BASKET":
            return {
                ...state, basket: [], itemCount: {}
            }
        case 'SET_USER':
            // console.log(action.user);
            return {
                ...state, user: action.user
            }
        case 'UPDATED':
            // console.log(action.user);
            return {
                ...state, updated: action.updated
            }
        default:
            return state;
    }
}
export default reducer;