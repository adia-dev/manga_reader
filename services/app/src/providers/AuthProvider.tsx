import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { User } from "@firebase/auth";

type Props = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                console.log(firebaseUser);
                setUser(firebaseUser);
            } else {
                console.log('No user is signed in.');
                setUser(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};