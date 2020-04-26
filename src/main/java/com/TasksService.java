package com;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TasksService {
    private final LinkedHashMap<String, Task> todo = new LinkedHashMap<>();
    private final LinkedList<Task> done = new LinkedList<>();

    {
        create("do dishes");
        String code = create("code app");
        create("do cleaning");

        markAsDone(code);
    }

    public String create(String title) {
        String id = UUID.randomUUID().toString();
        Task task = new Task(id, title);
        todo.put(id, task);
        return id;
    }

    public Collection<Task> loadAll() {
        return Stream.of(todo.values(), done)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }

    public void markAsDone(String id) {
        Task removed = todo.remove(id);
        if (removed == null) return;
        removed.isDone = true;
        done.add(removed);
    }

    public void delete(String id) {
        todo.remove(id);
        done.removeIf(t -> Objects.equals(t.id, id));
    }
}
