import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { User } from "@firebase/auth";

type Props = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};