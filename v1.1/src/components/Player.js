import React, { Component } from "react";

import {
    PlayCircleFilledRounded as Play,
    PauseCircleFilledRounded as Pause,
    SkipNextRounded,
    SkipPreviousRounded,
    RepeatRounded as Rall,
    RepeatOneRounded as Rone,
    ShuffleRounded,
} from "@material-ui/icons"

class Player extends Component {
    constructor() {
        super();
        this.state = {}
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
        const ct = Math.round((this.props.ct ? this.props.ct : 0) / 1000);
        const cl = this.props.cs ? this.props.cs.length : 0;
        return (
            <div className="player">
                <div className="cs-info">
                    {this.props.cs ? <img alt="" src={this.props.cs.thumbnail} /> : ""}
                    <div>
                        <a style={{ fontSize: 12 }}>{this.props.cs ? this.props.cs.title : ""}</a>
                        <br /><a style={{ fontSize: 13 }}>{this.props.cs ? this.props.cs.author : ""}</a>
                    </div>
                </div>

                <div className="cs-progress">
                    <div className="len" id="current">{this.seconds_to_ms(ct)}</div>
                    <div className="bar">
                        <div className="mov" id="main-prog" style={{ "--width": (ct / cl) * 100 }}></div>
                    </div>
                    <div className="len" id="total">{this.seconds_to_ms(cl)}</div>
                </div>

                <div className="ns-info">
                    <div>
                        <a style={{ fontSize: 12 }}>{this.props.ns ? this.props.ns.title : ""}</a>
                        <br /><a style={{ fontSize: 13 }}>{this.props.ns ? this.props.ns.author : ""}</a>
                    </div>
                    {this.props.ns ? <img alt="" src={this.props.ns.thumbnail} /> : ""}
                </div>

                <div className="cs-button">
                    <a style={{ margin: "0px 10px", cursor: "pointer" }}>
                        <ShuffleRounded style={{ fontSize: 30 }} />
                    </a>
                    <a style={{ margin: "0px 10px", cursor: "pointer" }}>
                        <SkipPreviousRounded style={{ fontSize: 30 }} />
                    </a>
                    <a
                        style={{ margin: "0px 10px", cursor: "pointer" }}
                        onClick={this.props.plpsSong}
                    >
                        {!this.props.is_playing ? <Play style={{ fontSize: 40 }} /> : <Pause style={{ fontSize: 40 }} />}
                    </a>
                    <SkipNextRounded
                        style={{ fontSize: 30, margin: "0px 10px", cursor: "pointer" }}
                        onClick={this.props.skipSong}
                    />
                    <a
                        style={{
                            margin: "0px 10px",
                            cursor: "pointer",
                            color: (this.props.single_loop || this.props.queue_loop) ? "#32cd32" : "#fff"
                        }}
                    >
                        {(this.props.single_loop ? <Rone style={{ fontSize: 30 }} /> : <Rall style={{ fontSize: 30 }} />)}
                    </a>
                </div>
            </div >
        )
    }
}


export default Player;