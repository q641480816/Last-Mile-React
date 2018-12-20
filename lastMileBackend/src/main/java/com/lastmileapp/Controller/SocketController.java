package com.lastmileapp.Controller;

import com.lastmileapp.Model.Driver;
import com.lastmileapp.Repository.DriverRepository;
import com.lastmileapp.Service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;


import java.util.*;

@EnableScheduling
@Controller
public class SocketController {

    @Autowired
    DriverRepository driverRepository;

    @Autowired
    DriverService driverService;

    @Autowired
    private SimpMessagingTemplate template;


    public static List<String> dispatchList =
            Collections.synchronizedList(new ArrayList<>());

    public static Map<Integer,String> assignedDriver = new HashMap<>();


    @Scheduled(fixedRate = 500)
    public void dispatch() throws Exception {
        ArrayList<Driver> result = new ArrayList<>();
        synchronized (dispatchList) {
            for (String plateNum : dispatchList) {
                result.add(driverService.getDriverByPlateNum(plateNum));
            }
        }
        this.template.convertAndSend("/topic/dispatch", result);
    }

    @Scheduled(fixedRate = 500)
    public void retrieveLocation() throws Exception {
        this.template.convertAndSend("/topic/location", driverRepository.findAll());
    }

    @Scheduled(fixedRate = 500)
    public void retrieveAssignedDriver() throws Exception{
        Map<Integer,Driver> result = new HashMap<>();
        for (Integer key: assignedDriver.keySet()){
            result.put(key, driverService.getDriverByPlateNum(assignedDriver.get(key)));
        }
        this.template.convertAndSend("/topic/passenger", result);
    }

}