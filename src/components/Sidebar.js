import {
    PlaylistAddRounded,
    SearchRounded,
    DashboardRounded
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import React, { Component } from "react";



class Sidebar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="sidebar">
                <h1 style={{ fontSize: 30 }}>Squigg <br /> Control Panel</h1>
                <Link to="" style={{ textDecoration: 'none' }}>
                    <button className="l-button">
                        <DashboardRounded style={{ fontSize: 40, margin: "0 10px" }} />
                        Dashboard
                    </button>
                </Link>
                <Link to="/playlist" style={{ textDecoration: 'none' }}>
                    <button className="l-button">
                        <PlaylistAddRounded style={{ fontSize: 40, margin: "0 10px" }} />
                        Playlist
                    </button>
                </Link>
                <Link to="/search" style={{ textDecoration: 'none' }}>
                    <button className="l-button">
                        <SearchRounded style={{ fontSize: 40, margin: "0 10px" }} />
                        Search
                    </button>
                </Link>
            </div>
        )
    }
}

export default Sidebar;