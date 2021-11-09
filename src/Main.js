import React, { Component } from "react";
import { io } from "socket.io-client";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Playlist from "./components/Playlist";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";

const socket = io("https://Squigg.blueg15.repl.co");

const guild_id = process.env["GUILD_ID"];


class Main extends Component {
    constructor() {
        super();
        this.state = {
            currentPlaylist: [],
            is_playing: false,
            loop_mode: 0,
            guild_id: "",
            oldRS: [],
            oldST: "",
        }
    }

    setOST = (term) => { this.setState({ oldST: term }) }
    setORS = (rslt) => { this.setState({ oldRS: rslt }) }

    removeSong = (index) => {
        if (index > this.state.currentPlaylist) return;
        socket.emit("remove", { guild_id: guild_id, pos: index });

        /*var cP = this.state.currentPlaylist;
        cP.splice(index, 1);*/

        /*this.setState({
            currentPlaylist: cP,
            currentTimestamp: 0,
        });*/

    }

    toggleLoop = () => {
        var mode = this.state.loop_mode + 1;
        if (mode === 3) mode = 2;
        //alert(mode);
        socket.emit("loop", { guild_id: guild_id, mode: mode });
    }

    skipSong = () => {
        socket.emit("skip", guild_id);
    }

    playPauseSong = () => {
        socket.emit("play-pause", guild_id);
    }

    shuffleSong = () => {
        socket.emit("shuffle", guild_id);
    }

    playSong = (song, type) => {
        socket.emit("play", { guild_id: guild_id, song: song, type: type });
        //alert("Sending");
    }

    componentDidMount = () => {
        //this.skipSong();
        socket.emit("playlist", guild_id);
        socket.emit("status", guild_id);
        setInterval(function () {
            if (!document.hasFocus()) {
                return;
            }
            socket.emit("playlist", guild_id);
        }, 1500);

        setInterval(function () {
            socket.emit("status", guild_id);
        }, 200);

        socket.on("playlist", (playlist) => {
            //console.log(playlist);
            this.setState({
                currentPlaylist: playlist,
            })
        });

        socket.on("status", (status) => {
            //console.log(status);
            this.setState({
                currentTimestamp: status.timestamp,
                is_playing: status.is_playing,
                loop_mode: status.loop_mode
            })
        });
    }

    render() {
        return (
            <Router>
                <Sidebar />
                <Switch>
                    <Route path="/playlist" exact>
                        <Playlist
                            currentPlaylist={this.state.currentPlaylist}
                            playSong={this.playSong}
                            removeSong={this.removeSong}
                        />
                    </Route>
                    <Route path="/search">
                        <Search playSong={this.playSong}
                            ORS={this.setORS} oldRS={this.state.oldRS}
                            OST={this.setOST} oldST={this.state.oldST}
                        />
                    </Route>
                </Switch>
                <Player
                    cs={this.state.currentPlaylist[0]}
                    ns={this.state.currentPlaylist[1]}
                    ct={this.state.currentTimestamp}
                    is_playing={this.state.is_playing}
                    loop_mode={this.state.loop_mode}
                    toggleLoop={this.toggleLoop}
                    skipSong={this.skipSong}
                    plpsSong={this.playPauseSong}
                    shuffleSong={this.shuffleSong}
                />
            </Router>
        );
    }
}

export default Main;
