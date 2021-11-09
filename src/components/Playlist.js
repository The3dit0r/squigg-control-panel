// import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React, { Component } from "react";

import {
    IndeterminateCheckBox,
    SearchRounded,
    ViewAgendaRounded,
    ViewHeadlineRounded,
    PlayArrowRounded as PlayIcon,
    CloseRounded as CrossIcon,
    ArrowUpwardRounded as ToTopIcon,
    OpenInNewRounded as OpenLinkIcon,
} from "@material-ui/icons";


class Playlist extends Component {
    constructor() {
        super();
        this.state = {
            itemHeight: 75,
        }
    }

    handleViewChange = (size) => {
        this.setState({
            itemHeight: size
        });
    }

    onDragEnd = (result) => {

    }

    render() {
        //alert(JSON.stringify(this.props.currentPlaylist[0], null, 4));
        return (
            <div className="main" style={{
                padding: 20,
                height: "calc(100vh - 110px)",
                width: "calc(100% - 360px)",
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2> Current queue: {Math.max(0, this.props.currentPlaylist.length - 1)} songs</h2>

                    <div>
                        <ViewHeadlineRounded
                            style={{
                                fontSize: 35,
                                color: this.state.itemHeight === 45 ? "#00BFFF" : "white",
                                margin: "0 5px"
                            }}
                            onClick={(e) => this.handleViewChange(45)}
                        />
                        <ViewAgendaRounded
                            style={{
                                fontSize: 35,
                                color: this.state.itemHeight === 75 ? "#00BFFF" : "white",
                                margin: "0 5px"
                            }}
                            onClick={(e) => this.handleViewChange(75)}
                        />
                    </div>
                </div>


                <div className="queue-content" style={{ height: `calc(100% - ${85 * this.props.displayMode}px)` }}>
                    {
                        this.props.currentPlaylist.map((item, index) =>
                            <QueueItem
                                height={this.state.itemHeight}
                                index={index}
                                song={item}
                                removeSong={this.props.removeSong}
                                playSong={this.props.playSong}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}
/*
class BigPlayerMode extends Component {
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


    render() {
        if (!this.props.song) return ("");
        const thumbnail = `https://img.youtube.com/vi/${this.props.song.id}/mqdefault.jpg`;
        const title = this.props.song.title;
        const title_fs = "1.2em"//(title.length < 60 ? "1.5em" : "1.2em");
        const ct = Math.round((this.props.ct ? this.props.ct : 0) / 1000);
        const cl = this.props.song.length;
        return (
            <React.Fragment>
                <div className="playerFrame" style={{ backgroundColor: "#353535" }}>
                    <div className="bp-cover" style={{
                        backgroundImage: `linear-gradient(to right, #0000 0%, #353535 80%), url("${thumbnail}")`,
                    }}></div>
                    <div className="bp-info">
                        <p> Now playing: </p>
                        <h2 style={{ margin: "5px 0", fontSize: title_fs }}> {title} </h2>
                        <h4 style={{ margin: "5px 0" }}> {this.props.song.author} </h4>
                    </div>
                    <div className="bp-control">

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
*/
class QueueItem extends Component {
    constructor() {
        super();
    }

    createPlaySong = () => {
        this.props.removeSong(this.props.index);
        this.props.playSong(this.props.song, "pn");
    }

    moveToTop = () => {
        this.props.removeSong(this.props.index);
        this.props.playSong(this.props.song, "top");
    }

    seconds_to_ms = (d) => {
        d = Number(d);
        var m = Math.floor(d / 60);
        var s = d - (m * 60);

        var mDisplay = ((m < 10 ? "0" + m : m));
        var sDisplay = ((s < 10 ? "0" + s : s));

        return mDisplay + ":" + sDisplay;
    }

    render() {
        if (this.props.index === 0) {
            return ("");
        }

        return (
            <div className="queue-item" style={{ height: this.props.height }}>
                {this.props.height === 75 ? <img alt="" draggable="false" src={this.props.song.thumbnail} /> : ""}
                <a style={{ fontSize: '80%' }}>{this.props.index}/ {this.props.song.title}</a>
                <a style={{ fontWeight: "bold", float: "right", fontSize: "80%" }}>{this.seconds_to_ms(this.props.song.length)}</a>
                <br />
                <div style={{ float: 'right' }}>
                    <CrossIcon style={{ marginLeft: 5, cursor: "pointer" }} onClick={(e) => { this.props.removeSong(this.props.index) }} />
                    <PlayIcon style={{ marginLeft: 5, cursor: "pointer" }} onClick={this.createPlaySong} />
                    <ToTopIcon style={{ marginLeft: 5, cursor: "pointer" }} onClick={this.moveToTop} />
                </div>
                <a style={{ fontSize: '80%' }}>{this.props.song.author}</a> <br />
                <a style={{ fontStyle: "italic", fontSize: 13 }}>{this.props.height === 75 ? `Requested by ${this.props.song.requested_by}` : ""}</a>
                <br />
            </div>
        )
    }
}

export default Playlist;

/*
<div style={{
    display: "flex",
    alignItems: "center",
    border: "1px solid #fff",
    borderRadius: 7
}}>
    <SearchRounded style={{
        fontSize: 25,
        marginLeft: 5,
        marginRight: 3
    }} />
    <input id="search-queue" type="text" placeholder="Search songs in queue" />
</div>
*/