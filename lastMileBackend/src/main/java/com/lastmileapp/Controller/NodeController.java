package com.lastmileapp.Controller;

import com.lastmileapp.Model.Node;
import com.lastmileapp.Service.NodeService;
import com.lastmileapp.Service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/nodes")
public class NodeController {

    @Autowired
    NodeService nodeService;

    @RequestMapping(value = "all", method=RequestMethod.GET)
    public List<Node> getNodeBystation(@RequestParam("stationId") int stationId) {
        return nodeService.getNodeByStation(stationId);
    }


    @RequestMapping(method=RequestMethod.GET)
    public Node getNodeById(@RequestParam("id") int nodeId) {
        return nodeService.getNodeById(nodeId);
    }


}
