import { INIT_STATE } from '../../constant';
import { getType, login, register, logout } from '../actions';

export default function authReducers(state = INIT_STATE.auth, action) {
    switch (action.type) {
        case getType(login.loginSuccess):
            return {
                ...state,
                data: {...state.data, isLogined: true, userName: action.payload.userName, id: action.payload._id},
            };
        case getType(register.registerSuccess):
            return {
                ...state,
                data: {...state.data, isLogined: true, userName: action.payload.userName, id: action.payload._id},
            };
        case getType(logout.logoutSuccess):
            return INIT_STATE.auth;
        default:
            return state;
    }
}