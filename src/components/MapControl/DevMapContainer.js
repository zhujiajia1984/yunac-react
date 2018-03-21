import React from 'react';
import BMap from 'BMap';
import BMapLib from 'BMapLib'

//
export default class DevMapContainer extends React.Component {
    //
    constructor(props) {
        super(props);
    }

    //
    componentDidMount() {
        this.map = new BMap.Map("allmap");
        this.map.centerAndZoom(new BMap.Point(112.499467, 27.90731), 15);
        // this.map.addOverlay(new BMap.Marker(new BMap.Point(116.404, 39.915)));
        this.map.enableScrollWheelZoom(true);

        // 热力图
        let points = [
            { "lng": 112.481911, "lat": 27.917119, "count": 60 },
            { "lng": 112.481192, "lat": 27.91597, "count": 29 },
            { "lng": 112.483348, "lat": 27.916736, "count": 41 },
            { "lng": 112.481336, "lat": 27.915076, "count": 39 },
            { "lng": 112.478317, "lat": 27.913544, "count": 93 },
            { "lng": 112.482198, "lat": 27.911501, "count": 58 },
            { "lng": 112.476305, "lat": 27.912139, "count": 64 },
            { "lng": 112.482198, "lat": 27.911756, "count": 22 },
            { "lng": 112.480617, "lat": 27.912906, "count": 29 },
            { "lng": 112.475012, "lat": 27.909075, "count": 31 },
            { "lng": 112.481623, "lat": 27.910735, "count": 12 },
            { "lng": 112.481623, "lat": 27.910735, "count": 46 },
            { "lng": 112.476449, "lat": 27.909713, "count": 62 },
            { "lng": 112.482773, "lat": 27.90767, "count": 13 },
            { "lng": 112.482773, "lat": 27.90767, "count": 19 },
            { "lng": 112.481048, "lat": 27.907415, "count": 68 },
            { "lng": 112.477527, "lat": 27.902419, "count": 47 },
            { "lng": 112.478856, "lat": 27.902515, "count": 9 },
            { "lng": 112.474904, "lat": 27.897535, "count": 74 },
            { "lng": 112.472389, "lat": 27.896481, "count": 77 },
            { "lng": 112.47149, "lat": 27.895683, "count": 4 },
            { "lng": 112.489852, "lat": 27.909442, "count": 71 },
            { "lng": 112.490498, "lat": 27.910655, "count": 10 },
            { "lng": 112.48518, "lat": 27.906441, "count": 51 },
            { "lng": 112.490427, "lat": 27.905867, "count": 9 },
            { "lng": 112.487839, "lat": 27.904335, "count": 73 },
            { "lng": 112.483743, "lat": 27.900248, "count": 13 },
            { "lng": 112.487624, "lat": 27.898844, "count": 38 },
            { "lng": 112.490427, "lat": 27.899865, "count": 66 },
            { "lng": 112.495457, "lat": 27.909251, "count": 15 },
            { "lng": 112.529305, "lat": 27.905995, "count": 49 },
            { "lng": 112.528802, "lat": 27.903696, "count": 91 },
            { "lng": 112.476269, "lat": 27.921636, "count": 88 },
            { "lng": 112.477132, "lat": 27.92553, "count": 43 },
            { "lng": 112.47706, "lat": 27.923678, "count": 40 },
            { "lng": 112.471886, "lat": 27.92138, "count": 92 },
            { "lng": 112.471886, "lat": 27.92138, "count": 23 },
            { "lng": 112.472029, "lat": 27.923934, "count": 21 },
            { "lng": 112.469945, "lat": 27.923742, "count": 52 },
            { "lng": 112.469227, "lat": 27.926934, "count": 2 },
            { "lng": 112.475694, "lat": 27.92853, "count": 28 },
            { "lng": 112.467142, "lat": 27.925721, "count": 84 },
            { "lng": 112.517232, "lat": 27.914103, "count": 59 },
            { "lng": 112.521185, "lat": 27.911804, "count": 76 },
            { "lng": 112.503434, "lat": 27.907718, "count": 84 },
        ];
        let heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
        this.map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({ data: points, max: 100 });
        heatmapOverlay.show();
    }

    //
    render() {
        return (
            <div id="allmap" style={{marginTop: 24, flex:1}}></div>
        );
    }
}