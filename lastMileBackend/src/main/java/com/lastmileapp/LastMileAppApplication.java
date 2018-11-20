package com.lastmileapp;

import com.lastmileapp.Repository.StationRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LastMileAppApplication {


	private StationRepository stationRepository;
	public static void main(String[] args) {
		SpringApplication.run(LastMileAppApplication.class, args);
	}
}
