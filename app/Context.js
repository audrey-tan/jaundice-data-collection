import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'change_server_url':
            return {...state, server_url: action.newValue};
        case 'change_page':
                return {...state, page: action.newValue};
        case 'change_date':
            return {...state, dateOfBirth: action.newValue};
        case 'change_time':
            return {...state, timeOfBirth: action.newValue};
        case 'change_bw':
            return {...state, birthWeight: action.newValue};
        case 'change_gender':
            return {...state, gender: action.newValue};
        case 'change_fSkinTone':
            return {...state, fSkinTone: action.newValue};
        case 'change_mSkinTone':
            return {...state, mSkinTone: action.newValue};
        case 'change_kramer':
            return {...state, kramer: action.newValue};
        case 'add_forehead':
            return {...state, foreheads: [action.newValue, ...state.foreheads]};
        case 'clear_foreheads':
            return {...state, foreheads: []};
        case 'change_jaundice':
            return {...state, jaundice: action.newValue};
        case 'change_bilirubin':
            return {...state, bilirubin: action.newValue};
    }
}

const AppProvider = ({children}) => {
    // const [page, setPage] = useState(0);

    const [state, dispatch] = useReducer(
        reducer,
        {
            page: 0,
            pageRoutes: ['/', '/nd', '/fd', '/md', '/kramer', '/camera', '/expected', '/upload', '/success'],
            dateOfBirth: "",
            timeOfBirth: "",
            birthWeight: 0,
            gender: 0, // 0 female, 1 male
            fSkinTone: 1,
            mSkinTone: 1,
            kramer: 0,
            foreheads: [],
            jaundice: 0, // 0: no, 1: yes
            bilirubin: 0
        }
    )

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export {AppContext, AppProvider}