package com.lastmileapp.Service;

import com.lastmileapp.Model.Node;
import com.lastmileapp.Model.Station;
import com.lastmileapp.Repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;

@Service
public class StationService {
    @Autowired
    StationRepository stationRepository;
    @Autowired
    StationRepository nodeRepository;



    public List<Station> getAll() {
        return stationRepository.findAll();
    }





}
