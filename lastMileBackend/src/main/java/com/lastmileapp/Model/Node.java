package com.lastmileapp.Model;

import javax.persistence.*;

@Entity
public class Node {
    @Id
    @Column(name = "ID")
    private int id;
    @Column(name = "NAME")
    private String name;
    @Column(name = "LONGITUDE")
    private double longitude;
    @Column(name = "LATITUDE")
    private double latitude;
    @Column(name = "STATION_ID")
    private int stationID;




    public Node(){

    }

    public Node(int id, String name, double longitude, double latitude, int stationID){
        this.id=id;
        this.name=name;
        this.longitude=longitude;
        this.latitude=latitude;
        this.setStationID(stationID);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }


    public int getStationID() {
        return stationID;
    }

    public void setStationID(int stationID) {
        this.stationID = stationID;
    }
}

