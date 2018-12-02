package com.lastmileapp.Service;

import com.lastmileapp.Model.Driver;
import com.lastmileapp.Model.Station;
import com.lastmileapp.Repository.DriverRepository;
import com.lastmileapp.Repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class DriverService {
    @Autowired
    DriverRepository driverRepository;

    @Autowired
    StationRepository stationRepository;

    @Autowired
    DriverService driverService;

    @Autowired
    StationService stationService;
    public List<Driver> getWaitingDriverByStation(int stationId) {
        ArrayList<Driver> waitingDrivers = new ArrayList<>();
        List<Driver> drivers = driverRepository.findByStationID(stationId);
        for (Driver d : drivers) {
            if (d.getStatus().equals("waiting")) {
                waitingDrivers.add(d);
            }
        }
        return waitingDrivers;
    }

    public List<Driver> getAllWaitingDrivers(){
        ArrayList<Driver> waitingDrivers = new ArrayList<>();
        List<Driver> drivers = driverRepository.findAll();
        for (Driver d : drivers) {
            if (d.getStatus().equals("waiting")) {
                waitingDrivers.add(d);
            }
        }
        return waitingDrivers;

    }


    public String request(int stationId, int nodeId, int contact){
        Station s=stationRepository.getStationById(stationId);
        if (s!=null) {
            Map<Integer, LinkedList<Integer>>  queues = s.getQueues();
            LinkedList<Integer> passengers = new LinkedList<>();
            if (queues.containsKey(nodeId)) {
                passengers = queues.get(nodeId);

            }
            passengers.add(contact);
            queues.put(nodeId, passengers);

            s.setQueues(queues);
            stationRepository.save(s);
            Driver d=assignDriver(stationId);
            return d.getPlateNum();

        }

        return null;
    }

    public Driver assignDriver(int stationId){
        Station s = stationRepository.getStationById(stationId);
        Map<Integer, LinkedList<Integer>> stationQueues= s.getQueues();
        List<Driver> drivers = driverService.getWaitingDriverByStation(stationId);
        Driver d = drivers.get(0);
        Map<Integer, ArrayList<Integer>> assignedQueue = d.getAssignedPassengers();
        int numOfPass = countWaitingPass(stationId);
        int count = 0;
        if (d.getCapacity() <= numOfPass) {
            while (d.getNumOfAssign() < d.getCapacity() && count < numOfPass) {
                int nodeId = (Integer) stationQueues.keySet().toArray()[0];
                LinkedList<Integer> nodePass = stationQueues.get(nodeId).size() == 1 ? stationQueues.remove(nodeId) : stationQueues.get(nodeId);
                Integer pContact = nodePass.pop();
                if (!d.getAssignedPassengers().containsKey(nodeId)) {
                    Map<Integer, ArrayList<Integer>> nodes = d.getAssignedPassengers();
                    ArrayList<Integer> node = new ArrayList<>();
                    nodes.put(nodeId, node);
                }

                //Driver assign
                Map<Integer, ArrayList<Integer>> nodes = d.getAssignedPassengers();
                ArrayList<Integer> node = nodes.get(nodeId);
                node.add(pContact);
                nodes.put(nodeId, node);
                d.setAssignedPassengers(nodes);
                count++;
                d.setNumOfAssign(count);
                if (count == d.getCapacity()) {
                    stationQueues.remove(nodeId);
                    if(nodePass.size()>0) {
                        stationQueues.put(nodeId, nodePass);
                    }
                }
            }
        }

        /*if(numOfPass>=d.getCapacity()){  // start to schedule driver when reaches capacity
            for (Map.Entry<Integer, LinkedList<Integer>> entry : stationQueues.entrySet()) {
                int nodeId = entry.getKey();
                LinkedList<Integer> queuedPassengers = entry.getValue();
                Iterator iterator = queuedPassengers.iterator();
                ArrayList<Integer> assignedPassengers= new ArrayList<>();
                if(assignedQueue.containsKey(nodeId)) { // driver alr have queue for this node
                    assignedPassengers = assignedQueue.get(nodeId);
                }
                while (iterator.hasNext()) {
                    Integer contact = (Integer) iterator.next();
                    assignedPassengers.add(contact); // add to driver's queue
                    d.setNumOfRequest(numOfAssign++);
                    queuedPassengers.remove(); // remove from station's queue

                }
                stationQueues.remove(nodeId);
                if(queuedPassengers.size()>0){
                    stationQueues.put(nodeId,queuedPassengers);
                }

            }
        }*/
        driverService.saveDriver(d);
        s.setQueues(stationQueues);
        stationService.saveStation(s);
        return d;
    }

    private int countWaitingPass(int stationId){
        return stationRepository.getStationById(stationId).getQueues().values().stream()
                .parallel()
                .mapToInt(LinkedList::size)
                .sum();
    }


    public boolean onboard(String plateNum){
        Driver d= driverRepository.findByPlateNum(plateNum);
        if(d!=null) {
            int numOfOnboard = d.getNumOfOnboard()+1;
            d.setNumOfOnboard(numOfOnboard);
            driverRepository.save(d);

            return true;
        }

        return false;


    }

    public boolean readToDispatch(String plateNum){
        Driver d= driverRepository.findByPlateNum(plateNum);
        if(d!=null) {
            if (d.getNumOfOnboard()>=d.getCapacity()){
                return true;

            }
        }
        return false;

    }

    public boolean disPatch(String plateNum){
        Driver d= driverRepository.findByPlateNum(plateNum);
        if(d!=null) {
            d.setStatus("driving");
            driverRepository.save(d);
            return true;
        }

        return false;


    }

    public boolean returnToStation(String plateNum){
        Driver d= driverRepository.findByPlateNum(plateNum);
        if(d!=null) {
            d.setStatus("waiting");
            d.setNumOfOnboard(0);
            d.setNumOfAssign(0);
            Date date = new Date(System.currentTimeMillis());
            d.setLastTimeReturn(date);
            driverRepository.save(d);
            return true;
        }

        return false;

    }

    public void saveDriver(Driver d){
        driverRepository.save(d);
    }


}
