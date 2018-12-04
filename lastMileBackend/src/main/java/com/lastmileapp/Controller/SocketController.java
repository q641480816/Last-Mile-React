package com.lastmileapp.Controller;

import com.lastmileapp.Model.Driver;
import com.lastmileapp.Repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


import java.util.*;

@Controller
public class SocketController {

    @Autowired
    DriverRepository driverRepository;

    public static List<String> dispatchList =
            Collections.synchronizedList(new ArrayList<>());

    public static Map<Integer,String> assignedDriver = new HashMap<>();


    @MessageMapping("/dispatch")
    @SendTo("/topic/dispatch")
    public List<String> dispatch() throws Exception {
        Thread.sleep(1000); // simulated delay 1 second
        return dispatchList;
    }


    @MessageMapping("/location")
    @SendTo("/topic/location")
    public List<Driver> retrieveLocation() throws Exception {
        Thread.sleep(1000); // simulated delay 1 second
        return driverRepository.findAll();


    }

    @MessageMapping("/passenger")
    @SendTo("/topic/passenger")
    public Map<Integer, String> retrieveAssignedDriver() throws Exception{
        Thread.sleep(1000); // simulated delay 1 second
        return assignedDriver;

    }

}