import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
            itemHeight: 75
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
        return (
            <div className="main" style={{
                padding: 20,
                height: "calc(100vh - 110px)",
                width: "calc(100% - 360px)",
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2> Current queue: {this.props.currentPlaylist.length} songs</h2>

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

                <div className="queue-content">
                    {
                        this.props.currentPlaylist.map((item, index) =>
                            <QueueItem
                                height={this.state.itemHeight}
                                index={index + 1}
                                song={item}
                                removeSong={this.props.removeSong}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

class QueueItem extends Component {
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

    openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    render() {
        return (
            <div className="queue-item" style={{ height: this.props.height }}>
                {this.props.height === 75 ? <img draggable="false" src={this.props.song.thumbnail} style={{ cursor: "move" }} /> : ""}
                <a style={{ fontSize: '80%' }}>{this.props.index}/ {this.props.song.title}</a>
                <a style={{ fontWeight: "bold", float: "right", fontSize: "80%" }}>{this.seconds_to_ms(this.props.song.length)}</a>
                <br />
                <div style={{ float: 'right' }}>
                    <CrossIcon style={{ marginLeft: 5, cursor: "pointer" }} />
                    <PlayIcon style={{ marginLeft: 5, cursor: "pointer" }} />
                    <ToTopIcon style={{ marginLeft: 5, cursor: "pointer" }} />
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