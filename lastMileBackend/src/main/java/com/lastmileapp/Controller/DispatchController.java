package com.lastmileapp.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
public class DispatchController {

    public static List<String> dispatchList =
            Collections.synchronizedList(new ArrayList<>());


    @MessageMapping("/dispatch")
    @SendTo("/topic/dispatch")
    public List<String> dispatch() throws Exception {
        Thread.sleep(1000); // simulated delay 1 second
        return dispatchList;
    }



}