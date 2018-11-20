package com.lastmileapp.Repository;

import com.lastmileapp.Model.Node;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NodeRepository extends JpaRepository<Node, Integer> {
    List<Node>getNodeByStationID(int stationID);


}
