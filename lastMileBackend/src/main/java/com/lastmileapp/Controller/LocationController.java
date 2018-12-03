package com.lastmileapp.Controller;


import com.lastmileapp.Model.Driver;
import com.lastmileapp.Repository.DriverRepository;;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class LocationController {

    @Autowired
    DriverRepository driverRepository;


    @MessageMapping("/location")
    @SendTo("/topic/location")
    public List<Driver> retrieveLocation() throws Exception {
        Thread.sleep(1000); // simulated delay 1 second
        return driverRepository.findAll();


    }
}
