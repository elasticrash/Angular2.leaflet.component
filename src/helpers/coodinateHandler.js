var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input } from '@angular/core';
export class CoordinateHandler {
    constructor() {
    }
    assignCartesianPointToLeafletsLatLngSchema() {
        if (this.x !== undefined) {
            this.lon = this.x;
        }
        if (this.y !== undefined) {
            this.lat = this.y;
        }
    }
    assignCartesianArrayToLeafletsLatLngSchema(arr) {
        if (this.xys !== undefined) {
            if (!arr) {
                arr = this.xys;
            }
            for (var i = 0; i < arr.length; i++) {
                if (typeof (arr[0]) !== "number") {
                    this.assignCartesianArrayToLeafletsLatLngSchema(arr[i]);
                }
                else {
                    arr.reverse();
                }
            }
            this.latlngs = this.xys;
        }
    }
    transformPointCoordinates(crs) {
        if (crs.code && crs.code !== "EPSG:3857") {
            let newlatlng = crs.unproject({ y: this.lat, x: this.lon });
            this.setNewLatLng(newlatlng);
        }
        else {
            let newlatlng = { lat: this.lat, lng: this.lon };
            this.setNewLatLng(newlatlng);
        }
    }
    setNewLatLng(newlatlng) {
        this.lat = newlatlng.lat;
        this.lon = newlatlng.lng;
    }
    transformArrayCoordinates(crs, arr) {
        if (!arr) {
            arr = this.latlngs;
        }
        for (var i = 0; i < arr.length; i++) {
            if (typeof (arr[0]) !== "number") {
                arr[i] = this.transformArrayCoordinates(crs, arr[i]);
            }
            else {
                if (crs.code && crs.code !== "EPSG:3857") {
                    let trasformed = crs.unproject({ x: arr[0], y: arr[1] });
                    arr = { lat: trasformed.lat, lng: trasformed.lng };
                }
                else {
                    arr = { lat: arr[0], lng: arr[1] };
                }
            }
        }
        return arr;
    }
}
__decorate([
    Input(),
    __metadata("design:type", Number)
], CoordinateHandler.prototype, "lat", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CoordinateHandler.prototype, "lon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CoordinateHandler.prototype, "x", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CoordinateHandler.prototype, "y", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CoordinateHandler.prototype, "latlngs", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CoordinateHandler.prototype, "xys", void 0);
//# sourceMappingURL=coodinateHandler.js.map