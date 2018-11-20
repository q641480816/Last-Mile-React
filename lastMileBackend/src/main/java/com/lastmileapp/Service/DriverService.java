package com.lastmileapp.Service;

import com.lastmileapp.Model.Driver;
import com.lastmileapp.Repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;



@Service
public class DriverService {
    @Autowired
    DriverRepository driverRepository;


    public List<Driver> getWaitingDriverByStationNode(int stationId, int nodeId) {
        ArrayList<Driver> waitingDrivers = new ArrayList<>();
        List<Driver> drivers = driverRepository.findByStationIdAndNodeId(stationId, nodeId);
        for (Driver d : drivers) {
            if (d.getStatus().equals("waiting")) {
                waitingDrivers.add(d);
            }
        }
        System.out.println(waitingDrivers);
        return waitingDrivers;

    }

    public boolean bookDriver(String plateNum){
        Driver d= driverRepository.findByPlateNum(plateNum);
        if (d!=null && d.getStatus().equals("waiting")) {
            int numOfBook =d.getNumOfBooking()+1;
            d.setNumOfBooking(numOfBook);
            driverRepository.save(d);
            return true;
        }

        return false;
    }


    public boolean onboard(String plateNum){
        Driver d= driverRepository.findByPlateNum(plateNum);
        if(d!=null) {
            int numOfOnboard = d.getNumOfOnboard()+1;
            d.setNumOfOnboard(numOfOnboard);
            driverRepository.save(d);

            return true;
        }

        return false;


    }

    public boolean disPatch(String plateNum){
        Driver d= driverRepository.findByPlateNum(plateNum);
        if(d!=null) {
            d.setStatus("driving");
            driverRepository.save(d);
            return true;
        }

        return false;


    }

    public boolean returnToStation(String plateNum){
        Driver d= driverRepository.findByPlateNum(plateNum);
        if(d!=null) {
            d.setStatus("waiting");
            d.setNumOfOnboard(0);
            d.setNumOfBooking(0);
            driverRepository.save(d);
            return true;
        }

        return false;

    }


}
