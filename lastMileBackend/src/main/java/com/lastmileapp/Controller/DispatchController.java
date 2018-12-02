package com.lastmileapp.Controller;


import com.lastmileapp.Model.Greeting;
import com.lastmileapp.Model.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
public class DispatchController {

    public static List<String> dispatchList =
            Collections.synchronizedList(new ArrayList<>());



//    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    public Greeting greeting(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay 1 second
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }

    @MessageMapping("/driver")
    @SendTo("/topic/dispatch")
    public List<String> dispatch() throws Exception {
        Thread.sleep(1000); // simulated delay 1 second
        return dispatchList;
    }



}