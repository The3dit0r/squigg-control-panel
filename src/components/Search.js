import React, { Component } from "react";
import axios from "axios";

import {
    SearchRounded,
    CloseRounded,
    PlayArrowRounded as PlayIcon,
    ArrowUpwardRounded as ToTopIcon,
    AddRounded as AddIcon,
} from "@material-ui/icons";

function rng(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min) + min);
}

var timeout = false;
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            result: [],
            searchTerm: this.props.oldST,
            result: this.props.oldRS
        }
    }

    handleSearchBox = (e) => {
        this.setState({
            searchTerm: e.target.value,
        });
    }

    handleSearchSubmit = () => {
        if (timeout) return;
        const sr = document.getElementById("search-result");
        sr.innerText = "";
        timeout = true;

        this.props.OST("");
        this.props.ORS([]);
        this.setState({ result: [null, null, null, null] });

        var options = {
            method: 'POST',
            url: 'https://youtubesearchexpress.the3dit0r.repl.co/search',
            headers: { 'Content-Type': 'application/json' },
            data: { search_term: this.state.searchTerm, token: 't3578y3wnv785y38w7tn7q37ft7mi57r1i896', all: true }
        };

        axios.request(options).then((response) => {
            console.log(response.data);
            this.setState({
                result: response.data
            });
            this.props.OST(this.state.searchTerm);
            this.props.ORS(response.data);
            sr.innerText = this.state.result.length ? `Fetched ${this.state.result.length} results` : "Cannot find any result";
            timeout = false;
        }).catch((error) => {
            console.error(error);
            this.setState({ result: [] });
            sr.innerText = "Cannot find any result";
            timeout = false;
        });
    }

    deleteSearchTerm = () => {
        document.getElementById("input-box").value = "";
        this.setState({
            searchTerm: ""
        });
    }

    checkKeyEvent = (event) => {
        if (event.keyCode === 13) {
            //console.log(event.keyCode);
            this.handleSearchSubmit();
        }
    }

    handleFocus = () => { document.getElementById("input-container").classList.add("active") }
    handleBlur = () => { document.getElementById("input-container").classList.remove("active") }

    componentDidMount = () => {
        document.addEventListener("keydown", this.checkKeyEvent, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.checkKeyEvent, false);
    }

    render() {

        return (
            <div className="main" style={{
                padding: 20,
                height: "calc(100vh - 130px)",
                width: "calc(100% - 360px)",
            }}>
                <div className="search-input" id="input-container">
                    <SearchRounded />
                    <input
                        onFocus={this.handleFocus} onBlur={this.handleBlur}
                        value={this.state.searchTerm}
                        spellCheck="false"
                        autoComplete="off"
                        id="input-box"
                        type="text"
                        placeholder="Type to search"
                        onChange={(e) => this.handleSearchBox(e)}
                    />
                    <CloseRounded
                        style={{
                            display: this.state.searchTerm.length > 0 ? "initial" : "none",
                            cursor: "pointer"
                        }}
                        onClick={this.deleteSearchTerm}
                    />
                </div>
                <h3 id="search-result"></h3>
                <div className="queue-content" style={{ height: "calc(100% - 10px)" }}>
                    {
                        this.state.result.map((item, index) => (
                            <ResultItem
                                height={75}
                                key={`${index}$${item ? item.id : "loading"}`}
                                song={item}
                                playSong={this.props.playSong}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

class ResultItem extends Component {
    constructor() {
        super();
    }

    seconds_to_ms = (d) => {
        d = Number(d);
        var m = Math.floor(d / 60);
        var s = d - (m * 60);

        var mDisplay = ((m < 10 ? "0" + m : m));
        var sDisplay = ((s < 10 ? "0" + s : s));

        return mDisplay + ":" + sDisplay;
    }

    createPlaySong = () => {
        //this.props.removeSong(this.props.index);
        this.props.playSong(this.props.song, "pn");
    }

    unshiftSong = () => {
        //this.props.removeSong(this.props.index);
        this.props.playSong(this.props.song, "top");
    }


    pushSong = () => {
        this.props.playSong(this.props.song, "play");
    }

    render() {
        if (!this.props.song) {
            return (
                <LoadingResult />
            )
        }
        return (
            <div className="queue-item" style={{ height: this.props.height }}>
                {this.props.height === 75 ? <img alt="" draggable="false" src={this.props.song.thumbnail} /> : ""}
                <a style={{ fontSize: '80%' }}>{this.props.song.title}</a>
                <a style={{ fontWeight: "bold", float: "right", fontSize: "80%" }}>{this.seconds_to_ms(this.props.song.length)}</a>
                <br />
                <div style={{ float: 'right' }}>

                    <AddIcon style={{ marginLeft: 5, cursor: "pointer" }}
                        onClick={(e) => { this.pushSong }} />

                    <PlayIcon style={{ marginLeft: 5, cursor: "pointer" }}
                        onClick={this.createPlaySong} />

                    <ToTopIcon style={{ marginLeft: 5, cursor: "pointer" }}
                        onClick={this.unshiftSong} />

                </div>
                <a style={{ fontSize: '80%' }}>{this.props.song.author}</a> <br />
                <br />
            </div>
        )
    }
}

class LoadingResult extends Component {

    constructor() {
        super();
        this.state = {
            lt: rng(55, 65) + "%",
            la: rng(20, 25) + "%",
            ld: rng(50, 60) + "px",
            lr: rng(17, 22) + "%",
        }
    }

    render() {
        return (
            <div className="loading-result">
                <div id="cover"></div>
                <a style={{ width: this.state.lt, }}></a>
                <a style={{ width: this.state.ld, float: "right" }}></a>
                <a style={{ width: this.state.la, }}></a><br />
                <a style={{ width: this.state.lr, }}></a>
            </div>
        )
    }
}

export default Search;
