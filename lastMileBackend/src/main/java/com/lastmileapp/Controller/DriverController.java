package com.lastmileapp.Controller;

import com.lastmileapp.Model.Driver;
import com.lastmileapp.Service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;



@RestController
@RequestMapping(value = "/lastMileApp/drivers")
public class DriverController {

    @Autowired
    DriverService driverService;

    @RequestMapping(value = "waiting", method=RequestMethod.GET)
    public List<Driver> getWaitingDriverBystation(@RequestParam("stationId") int stationId) {

        return driverService.getWaitingDriverByStation(stationId);

    }

    @RequestMapping(value="request", method=RequestMethod.POST)
    public HashMap<String,String> request(@RequestParam("stationId") int stationId, @RequestParam("nodeId") int nodeId, @RequestParam("contact") int contact) {
        HashMap<String, String> result = new HashMap<>();
        result.put("plateNum",driverService.request(stationId,nodeId,contact));
        return result;
    }

    @RequestMapping(value = "onboard", method=RequestMethod.POST)
    public HashMap<String, Boolean> onboard(@RequestParam("plateNum") String plateNum) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status", driverService.onboard(plateNum));
        if(driverService.readToDispatch(plateNum)){
            List<String> dispatchList= DispatchController.dispatchList;
            synchronized(dispatchList) {
                dispatchList.add(plateNum);
            }

        }
        return result;
    }


    @RequestMapping(value = "dispatch", method=RequestMethod.POST)
    public HashMap<String, Boolean> dispatch(@RequestParam("plateNum") String plateNum) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status", driverService.disPatch(plateNum));
        List<String> dispatchList= DispatchController.dispatchList;
        synchronized(dispatchList) {
            dispatchList.removeAll(Arrays.asList(plateNum));
        }

        return result;

    }

    @RequestMapping(value = "return", method=RequestMethod.POST)
    public HashMap<String, Boolean>  returnToStation(@RequestParam("plateNum") String plateNum) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status", driverService.returnToStation(plateNum));
        return result;

    }








}

