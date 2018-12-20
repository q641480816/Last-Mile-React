package com.lastmileapp.Controller;

import com.lastmileapp.Model.Driver;
import com.lastmileapp.Service.DriverService;
import com.lastmileapp.Service.NodeService;
import com.lastmileapp.Service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;



@RestController
@RequestMapping(value = "/drivers")
public class DriverController {

    @Autowired
    DriverService driverService;

    @Autowired
    StationService stationService;

    @Autowired
    NodeService nodeService;



    @RequestMapping(value = "waiting", method=RequestMethod.GET)
    public List<Driver> getWaitingDriverBystation(@RequestParam("stationId") int stationId) {
        return driverService.getWaitingDriverByStation(stationId);
    }

    @CrossOrigin(origins="http://localhost:4200")
    @RequestMapping(value="all", method=RequestMethod.GET)
    public List<Driver> getAllDrivers(){
        return driverService.getAllDrivers();
    }

    @RequestMapping(value = "passenger", method=RequestMethod.GET)
    public HashMap<String,Object> getPassenger(@RequestParam("contact") int contact) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("status",driverService.getPassengers(contact));
        result.put("driver",driverService.getDriverByPlateNum(driverService.getAssignedDriver(contact)));
        result.put("station",stationService.getStationById(driverService.getDestStation(contact)));
        result.put("node",nodeService.getNodeById(driverService.getDestNode(contact)));
        return result;
    }

    @RequestMapping(value="update", method=RequestMethod.POST)
    public HashMap<String,Boolean> update(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude, @RequestParam("plateNum") String plateNum) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status",driverService.updateDriverLocation(longitude,latitude,plateNum));
        return result;
    }


    @RequestMapping(value="request", method=RequestMethod.POST)
    public HashMap<String,Boolean> request(@RequestParam("stationId") int stationId, @RequestParam("nodeId") int nodeId, @RequestParam("contact") int contact) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status",driverService.request(stationId,nodeId,contact));
        return result;
    }

    @RequestMapping(value = "onboard", method=RequestMethod.POST)
    public HashMap<String, Boolean> onboard(@RequestParam("plateNum") String plateNum, @RequestParam("contact") int contact) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("status", driverService.onboard(plateNum, contact));
        if(driverService.readToDispatch(plateNum)){
            List<String> dispatchList= SocketController.dispatchList;
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
        List<String> dispatchList= SocketController.dispatchList;
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

