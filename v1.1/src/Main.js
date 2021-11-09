import React, { Component } from "react";
import { io } from "socket.io-client";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Playlist from "./components/Playlist";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";

const socket = io("https://Squigg.blueg15.repl.co");


class Main extends Component {
    constructor() {
        super();
        this.state = {
            currentPlaylist: [],
            is_playing: false,
            queue_loop: false,
            single_loop: false
        }
    }

    removeSong = (index) => {
        if (index > this.state.currentPlaylist) return;

        var cP = this.state.currentPlaylist;
        cP.splice(index, 1);

        this.setState({
            currentPlaylist: cP,
            currentTimestamp: 0,
        });
    }

    skipSong = () => {
        socket.emit("skip", "769373256917975080");
    }

    playPauseSong = () => {
        socket.emit("play-pause", "769373256917975080");
    }

    componentDidMount = () => {
        //this.skipSong();
        setInterval(function () {
            socket.emit("playlist", "769373256917975080");
        }, 1000);

        setInterval(function () {
            socket.emit("status", "769373256917975080");
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
                queue_loop: status.queue_loop,
                single_loop: status.single_loop,
            })
        });
    }

    render() {
        return (
            <Router>
                <Sidebar />
                <Switch>
                    <Route path="/">
                        <Playlist
                            currentPlaylist={this.state.currentPlaylist}
                            removeSong={this.removeSong}
                        />
                    </Route>
                </Switch>
                <Player
                    cs={this.state.currentPlaylist[0]}
                    ns={this.state.currentPlaylist[1]}
                    ct={this.state.currentTimestamp}
                    is_playing={this.state.is_playing}
                    queue_loop={this.state.queue_loop}
                    single_loop={this.state.single_loop}
                    skipSong={this.skipSong}
                    plpsSong={this.playPauseSong}
                />
            </Router>
        );
    }
}

export default Main;