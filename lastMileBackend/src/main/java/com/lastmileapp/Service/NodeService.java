package com.lastmileapp.Service;

import com.lastmileapp.Model.Node;
import com.lastmileapp.Repository.NodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NodeService {
    @Autowired
    NodeRepository nodeRepository;



    public List<Node> getNodeByStation(int stationId) {
        return nodeRepository.getNodeByStationID(stationId);
    }

    public Node getNodeById(int id){
        return nodeRepository.getNodeById(id);
    }



}
