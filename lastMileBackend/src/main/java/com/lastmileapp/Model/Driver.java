package com.lastmileapp.Model;


import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

@Entity
public class Driver {

    @Id
    @Column(name = "PLATENUM")
    private String plateNum;

    @Column(name = "STATION_ID")
    private int stationID;


    @Column(name="STATUS")
    private String status;

    @Column(name="capacity")
    private int capacity;

    @Column(name="numOfAssign")
    private int numOfAssign;

    @Column(name="numOfOnboard")
    private int numOfOnboard;

    @Column(name="lastTimeReturn")
    private Date lastTimeReturn;

    @ElementCollection
    private Map<Integer,ArrayList<Integer>> assignedPassengers;


    public Driver(){

    }

    public Driver(String plateNum, int stationID, int capacity){
        this.plateNum = plateNum;
        this.stationID=stationID;
        this.status=status;
        this.numOfOnboard=0;
        this.capacity=capacity;
        this.numOfAssign= 0;
        this.status="waiting";
        this.assignedPassengers= new LinkedHashMap<>();
        this.setLastTimeReturn(null);

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


    public Map<Integer, ArrayList<Integer>> getAssignedPassengers() {
        return assignedPassengers;
    }

    public void setAssignedPassengers(Map<Integer, ArrayList<Integer>> assignedPassengers) {
        this.assignedPassengers = assignedPassengers;
    }


    public int getNumOfAssign() {
        return numOfAssign;
    }

    public void setNumOfAssign(int numOfAssign) {
        this.numOfAssign = numOfAssign;
    }


    public Date getLastTimeReturn() {
        return lastTimeReturn;
    }

    public void setLastTimeReturn(Date lastTimeReturn) {
        this.lastTimeReturn = lastTimeReturn;
    }
}

