
const INITIAL_STATE = {
    catagory:[],
    question:{results:[]},
    id:[]
}

export default (state= INITIAL_STATE,{type,catg,ques,id})=>{
    switch (type) {
        case 'CATAGORY':
            return({
                ...state,
                catagory:catg,
            })
            case 'QUESTION':
                return({
                    ...state,
                    question:ques,
                })
                case 'ID':
                return({
                    ...state,
                    id:id,
                })
        
        default:
            return state;
    }
}