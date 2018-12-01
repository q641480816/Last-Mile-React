package com.lastmileapp.Controller;

import com.lastmileapp.Model.Driver;
import com.lastmileapp.Service.DriverService;
import com.lastmileapp.Service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;



@RestController
@RequestMapping(value = "/lastMileApp/drivers")
public class DriverController {

    @Autowired
    DriverService driverService;


    @RequestMapping(value = "waiting", method=RequestMethod.GET)
    public List<Driver> getDriverBystation(@RequestParam("stationId") int stationId) {

        return driverService.getWaitingDriverByStationNode(stationId);

    }


    @RequestMapping(value = "book", method=RequestMethod.POST)
    public HashMap<String, Boolean> book(@RequestParam("plateNum") String plateNum) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status", driverService.bookDriver(plateNum));
        return result;
    }

    @RequestMapping(value = "onboard", method=RequestMethod.POST)
    public HashMap<String, Boolean> onboard(@RequestParam("plateNum") String plateNum) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status", driverService.onboard(plateNum));
        return result;
    }


    @RequestMapping(value = "dispatch", method=RequestMethod.POST)
    public HashMap<String, Boolean> dispatch(@RequestParam("plateNum") String plateNum) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status", driverService.disPatch(plateNum));
        return result;

    }

    @RequestMapping(value = "return", method=RequestMethod.POST)
    public HashMap<String, Boolean>  returnToStation(@RequestParam("plateNum") String plateNum) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status", driverService.returnToStation(plateNum));
        return result;

    }








}

