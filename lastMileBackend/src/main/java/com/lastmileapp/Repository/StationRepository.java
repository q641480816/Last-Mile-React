package com.lastmileapp.Repository;

import com.lastmileapp.Model.Station;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StationRepository extends JpaRepository<Station, Integer> {
    Station getStationById(int stationId);

}
