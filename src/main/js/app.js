import React from "react";
import ReactDOM from "react-dom";
import TasksContainer from "./TasksContainer";
import Layout from "./Layout";

ReactDOM.render(<Layout><TasksContainer/></Layout>, document.getElementById('app'));