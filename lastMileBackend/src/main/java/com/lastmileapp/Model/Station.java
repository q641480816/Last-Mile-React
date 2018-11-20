package com.lastmileapp.Model;

import javax.persistence.*;
import java.util.List;


@Entity
public class Station {
    @Id
    @Column(name = "ID")
    private int id;
    @Column(name = "NAME")
    private String name;
    @Column(name = "FLEETSIZE")
    private int  fleetSize;
    @Column(name = "LONGITUDE")
    private double longitude;
    @Column(name = "LATITUDE")
    private double latitude;


    public Station(int id, String name, int fleetSize, double longtitude, double latitude){
        this.id=id;
        this.name=name;
        this.fleetSize=fleetSize;
        this.longitude=longtitude;
        this.latitude=latitude;
    }

    public Station(){
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

    public int getFleetSize() {
        return fleetSize;
    }

    public void setFleetSize(int fleetSize) {
        this.fleetSize = fleetSize;
    }




    @Override
    public String toString() {
        return "Station [id=" + id + ", name=" + name + ", fleet size=" + fleetSize + "]";
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
}
