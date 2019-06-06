import { ServerConfig } from '../server-config.model';
import express from 'express';

export interface RefractGraphQLContext {
  serverConfig: ServerConfig;
  req: express.Request;
  userId?: string;
}
