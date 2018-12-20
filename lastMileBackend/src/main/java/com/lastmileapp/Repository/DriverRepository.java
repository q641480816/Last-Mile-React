package com.lastmileapp.Repository;

import com.lastmileapp.Model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DriverRepository extends JpaRepository<Driver,String>{
//    @Query("select d from Driver d where d.stationID = :stationID and d.nodeID = :nodeID")
//    List<Driver> findByStationIdAndNodeId(@Param("stationID")int stationID, @Param("nodeID") int nodeID);

    List<Driver> findByStationID(int stationID);

    Driver findByPlateNum(String plateNum);


    List<Driver> findAll();



}
