export const postsState$ = (state) => state.posts.data; 

export const modalState$ = (state) => state.modal;

export const authState$ = (state) => {
    return !state.auth.data.isLogined && window.localStorage.getItem('USER') ?
        { userName: window.localStorage.getItem('USER'), isLogined: !!window.localStorage.getItem('USER') } : state.auth.data;
};

export const authorState$ = (state) => state.auth.data._id;