package com.lastmileapp.Utility;
import java.text.SimpleDateFormat;
import java.util.*;
import com.lastmileapp.Model.Driver;
import com.lastmileapp.Model.Station;
import com.lastmileapp.Service.DriverService;
import com.lastmileapp.Service.StationService;
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

    @Autowired
    StationService stationService;


    @Scheduled(fixedRate = 6000000)
    public void ScheduleDrivers() {





    }
}
