package com.lastmileapp.Model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Driver {

    @Id
    @Column(name = "PLATENUM")
    private String plateNum;

    @Column(name = "STATION_ID")
    private int stationID;

    @Column(name = "NODE_ID")
    private int nodeID;

    @Column(name="STATUS")
    private String status;

    @Column(name="capacity")
    private int capacity;

    @Column(name="numOfBooking")
    private int numOfBooking;

    @Column(name="numOfOnboard")
    private int numOfOnboard;





    public Driver(){

    }

    public Driver(String plateNum, int stationID, int nodeID, String status, int capacity, int numOfBooking, int numOfOnboard){
        this.plateNum = plateNum;
        this.stationID=stationID;
        this.nodeID=nodeID;
        this.status=status;
        this.numOfBooking=numOfBooking;
        this.numOfOnboard=numOfOnboard;
        this.capacity=capacity;
    }


    public String getPlateNum() {
        return plateNum;
    }

    public void setPlateNum(String plateNum) {
        this.plateNum = plateNum;
    }


    public int getStationID() {
        return stationID;
    }

    public void setStationID(int stationID) {
        this.stationID = stationID;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public int getNodeID() {
        return nodeID;
    }

    public void setNodeID(int nodeID) {
        this.nodeID = nodeID;
    }

    public int getNumOfBooking() {
        return numOfBooking;
    }

    public void setNumOfBooking(int numOfBooking) {
        this.numOfBooking = numOfBooking;
    }

    public int getNumOfOnboard() {
        return numOfOnboard;
    }

    public void setNumOfOnboard(int numOfOnboard) {
        this.numOfOnboard = numOfOnboard;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}

