import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { User } from "@firebase/auth";
import axios from "axios";

type Props = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const getAllUsers = async (path: string) => {
        const response = await axios.get(`http://localhost:5172${path}`);
        return response.data;
      };
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                console.log(firebaseUser);
                setUser(firebaseUser);

                // Ajouter un user a la base de donnée si il existe pas
                const fetchMangaList = async () => {
                    const url = `/users/list`;
                    const users = await getAllUsers(url);

                    let isThere = 0;

                    for(let i = 0; i < Object.keys(users).length; i++){
                        if (users[i].firebase_id == firebaseUser.uid){
                            isThere = 1
                        }
                    }

                    if(!isThere){
                        await axios.post(`http://localhost:5172/users/new`, {
                            "firebase_id": firebaseUser.uid,
                            "email": firebaseUser.email,
                            "gender": "Male"
                        });
                    }
                    
                };
                fetchMangaList();

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