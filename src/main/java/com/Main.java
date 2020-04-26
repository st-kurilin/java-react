package com;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import static spark.Spark.*;

public class Main {
    Logger logger = LoggerFactory.getLogger(Main.class);
    boolean devEnv = true;
    Gson gson = new Gson();
    TasksService tasks = new TasksService();

    public void run(int port){
        if (devEnv) {
            staticFiles.externalLocation("src/main/resources/static");
        } else {
            staticFiles.location("/static");
            staticFiles.expireTime(100000);
        }

        port(port);

        before((request, response) -> response.type("application/json"));
        path("/tasks", () -> {
            get("", (req, res) -> tasks.loadAll(), gson::toJson);
            put("", (req, res) -> {
                Map requestBody = gson.fromJson(req.body(), Map.class);
                if (requestBody != null && requestBody.containsKey("title")) {
                    return tasks.create(requestBody.get("title").toString());
                }
                return "";
            }, gson::toJson);
            post("/:id/mark-as-done", (req, res) -> {
                tasks.markAsDone(req.params(":id"));
                return "";
            });
            delete("/:id", (req, res) -> {
                tasks.delete(req.params(":id"));
                return "";
            });
        });

        internalServerError((req, res) -> {
            res.type("application/json");
            return gson.toJson(Map.of("message", "Something went wrong"));
        });
    }

    public static void main(String[] args) {
        new Main().run(8080);
    }
}
