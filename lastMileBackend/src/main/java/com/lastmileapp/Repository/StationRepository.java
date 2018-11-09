package com.lastmileapp.Repository;

import com.lastmileapp.Model.Station;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StationRepository extends JpaRepository<Station, Integer> {
    public Station getStationById(int stationId);

}
