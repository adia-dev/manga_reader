import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import HelpBox from './HelpBox'
import Searchbar from './Searchbar'
import { Outlet } from 'react-router-dom'
import axios from "axios";

type Props = {};


const Manga = (props: Props) => {
    return (
        <div className="bg-dark-primary w-screen relative overflow-hidden" id="app" data-testid="app">
            <Searchbar />
            <Header />
            <Outlet />
            <HelpBox />
            {/* <Debug /> */}
        </div>
    )
};

export default Manga;
