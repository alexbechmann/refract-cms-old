import express from 'express';
import {} from '@refract-cms/server';
import { Config, EntitySchema } from '@refract-cms/core';
import merge from 'lodash/merge';

interface Events {
  onSave?: () => void;
}

interface ServerOptions {
  schemas?: EntitySchema[];
  events?: Events;
  resolverPlugins?: any[];
  addExpressRouter?: () => express.Router;
}

interface ServerConfig {
  schemas?: EntitySchema[];
  resolverPlugins?: any[];
  events: Events[];
  routers: express.Router[];
}

interface PluginManifest {}

interface ServerPlugin extends ServerOptions {}

interface DashboardConfig {
  config: Config;
  components: {
    login: React.ComponentType<any>;
  };
}

interface DashboardPlugin {
  configure: (serverConfig: DashboardConfig) => void;
}

const ActiveDirectoryServerPlugin: ServerPlugin = {
  schemas: [],
  events: {
    onSave: console.log
  }
};

const ActiveDirectoryDashboardPlugin: DashboardPlugin = {
  configure: c => {
    c.config;
  }
};

const serverOptions: ServerOptions = {
  schemas: []
};

function buildServerConfig(...serverOptionsConfigs: ServerOptions[]): ServerConfig {
  const { resolverPlugins, schemas }: ServerOptions = serverOptionsConfigs.reduce((acc, s) => {
    return merge(acc, s);
  }, {});
  return {
    resolverPlugins,
    schemas,
    events: serverOptionsConfigs.map(o => o.events),
    routers: serverOptionsConfigs.map(o => o.addExpressRouter())
  };
}

buildServerConfig(serverOptions, ActiveDirectoryServerPlugin);
