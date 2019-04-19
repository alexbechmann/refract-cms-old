import React from "react";
import ReactDOM from "react-dom";
import { Dashboard } from "@refract-cms/dashboard";
import config from "./refract-cms/refract.config";

ReactDOM.render(
  <Dashboard config={config} rootPath="/" serverUrl="/cms" />,
  document.getElementById("root")
);
