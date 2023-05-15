import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem("name")) !== null);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
