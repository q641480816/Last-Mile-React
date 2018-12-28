package com.lastmileapp.Controller;

import com.lastmileapp.Model.Station;
import com.lastmileapp.Service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/stations")
public class StationController {

    @Autowired
    StationService stationService;

    @CrossOrigin(origins = {"http://35.247.175.250:8080", "http://localhost:4200"})
    @RequestMapping(value = "all", method= RequestMethod.GET)
    public List<Station> getAll() {
        return stationService.getAll();
    }


}
