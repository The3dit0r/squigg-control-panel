import { PlaylistAddRounded, SearchRounded, Settings } from "@material-ui/icons";
import React, { Component } from "react";



class Sidebar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="sidebar">
                <h1 style={{ fontSize: 30 }}>Squigg <br /> Control Panel</h1>
                <button className="l-button">
                    <PlaylistAddRounded style={{ fontSize: 40, margin: "0 10px" }} />
                    Playlist
                </button>
                <button className="l-button">
                    <SearchRounded style={{ fontSize: 40, margin: "0 10px" }} />
                    Search
                </button>
                <button className="l-button">
                    <Settings style={{ fontSize: 40, margin: "0 10px" }} />
                    Settings
                </button>
            </div>
        )
    }
}

export default Sidebar;