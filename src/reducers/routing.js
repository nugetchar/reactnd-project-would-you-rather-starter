import { NEXT_URL } from "../actions/routing";


export function routing(routing = {}, action) {
    switch(action.type) {
        case NEXT_URL:
            return {
                ...routing,
                nextUrl: action.url
            }
        default:
            return routing;
    }
}