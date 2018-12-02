package com.lastmileapp.Utility;

import com.lastmileapp.Model.Driver;
import com.lastmileapp.Model.Node;
import com.lastmileapp.Model.Station;
import com.lastmileapp.Repository.DriverRepository;
import com.lastmileapp.Repository.NodeRepository;
import com.lastmileapp.Repository.StationRepository;
import org.springframework.stereotype.Component;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;


@Component
public class DataLoader {
    private StationRepository stationRepository;
    private NodeRepository nodeRepository;
    private DriverRepository driverRepository;

    public DataLoader(StationRepository stationRepository, NodeRepository nodeRepository, DriverRepository driverRepository) {
        this.stationRepository = stationRepository;
        this.nodeRepository=nodeRepository;
        this.driverRepository = driverRepository;
        LoadNodeData();
        LoadStationData();
        LoadDriverData();

    }

    private void LoadStationData() {

        File file = new File("src/main/resources/input/station.csv");
        String csvFile = file.getAbsolutePath();
        String line = "";
        String cvsSplitBy = ",";

            try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            br.readLine();
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] station = line.split(cvsSplitBy);

                int id = Integer.parseInt(station[0]);
                String name = station[1];
                int fleetSize = Integer.parseInt(station[2]);
                double longtitude = Double.parseDouble(station[3]);
                double latitude = Double.parseDouble(station[4]);
                stationRepository.save(new Station(id, name, fleetSize,longtitude,latitude));

            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void LoadNodeData() {
        File file = new File("src/main/resources/input/node.csv");
        String csvFile = file.getAbsolutePath();
        String line = "";
        String cvsSplitBy = ",";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            br.readLine();
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] node = line.split(cvsSplitBy);

                int id = Integer.parseInt(node[0]);
                String name = node[1];
                double longtitude = Double.parseDouble(node[2]);
                double latitude = Double.parseDouble(node[3]);
                int stationId= Integer.parseInt(node[4]);
                nodeRepository.save(new Node(id, name, longtitude, latitude, stationId));

            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void LoadDriverData() {
        File file = new File("src/main/resources/input/driver.csv");
        String csvFile = file.getAbsolutePath();
        String line = "";
        String cvsSplitBy = ",";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            br.readLine();
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] driver = line.split(cvsSplitBy);

                String plateNum = driver[0];
                int stationId = Integer.parseInt(driver[1]);
                int capacity = Integer.parseInt(driver[3]);
                Station s=stationRepository.getStationById(stationId);
                double longitude=s.getLongitude();
                double latitude= s.getLatitude();
                driverRepository.save(new Driver(plateNum,stationId,capacity,longitude,latitude));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }











}

