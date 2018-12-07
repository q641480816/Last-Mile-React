package com.lastmileapp.Utility;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

import com.lastmileapp.Controller.SocketController;
import com.lastmileapp.Model.Driver;
import com.lastmileapp.Service.DriverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Autowired
    DriverService driverService;

    @Scheduled(fixedRate = 60000)
    public void ScheduleDrivers() {
        Date currentDate = new Date(System.currentTimeMillis());
        List<Driver> drivers = driverService.getAllWaitingDrivers();
        for (Driver d: drivers){
            if(d.getNumOfOnboard()>0){
                long diffInMillies = Math.abs(currentDate.getTime() - d.getLastTimeReturn().getTime());
                long diff = TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS);
                if(diff>3){
                    List<String> dispatchList= SocketController.dispatchList;
                    synchronized(dispatchList) {
                        dispatchList.add(d.getPlateNum());
                    }

                }

            }

        }

    }



}
