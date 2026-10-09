import fs from 'fs';
import path from 'path';
import { expect } from '@playwright/test';
import { trelloTestData } from '../test-data/trello.data';
 // this loads the env file to get the api key and token
function loadEnvFile() {
  const envFilePath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envFilePath)) {
    return;
  }
 // this reads the env file and gets the api key and token from it so i can use it in the test
  const fileText = fs.readFileSync(envFilePath, 'utf8');
  for (const line of fileText.split(/\r?\n/)) {
    const cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith('#')) {
      continue;
    }

    const equalsIndex = cleanLine.indexOf('=');
    if (equalsIndex === -1) {
      continue;
    }

    const envName = cleanLine.slice(0, equalsIndex).trim();
    const envValue = cleanLine.slice(equalsIndex + 1).trim();
    if (!process.env[envName]) {
      process.env[envName] = envValue;
    }
  }
}

// this gets the api key and token from the env file
function keyAndToken() {
  loadEnvFile();

  const key = process.env.TRELLO_API_KEY;
  const token = process.env.TRELLO_TOKEN;
  if (!key || !token) {
    throw new Error('Add TRELLO_API_KEY and TRELLO_TOKEN in API Challenge/.env');
  }

  return { key, token };
}

// this sends one trello call i keep the status the answer and how many ms it took 
// this is the main function that sends the call to the trello api
export async function callTrello(request, method, urlPath, query = {}) {
  const startedAt = Date.now();
  const response = await request[method](urlPath, {
    params: {
      ...keyAndToken(),
      ...query,
    },
  });
  // this gets the time it took to send the call
  const timeMs = Date.now() - startedAt;
  const text = await response.text();

  
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  // this returns the response the answer and the time it took to send the call
  return { response, body, timeMs };
}


// this is the main function that checks the call worked and was fast enough if not the test will fail
// assumptions the max time for the response 8 seconds if its more than 8 seconds the test will fail
// the time assumptions it could be changed based on the functional 

export function checkCall(result, callName) {
  expect(result.response.ok(), `${callName} status ${result.response.status()}`).toBeTruthy();
  expect(result.timeMs, `${callName} took ${result.timeMs} ms`).toBeLessThan(trelloTestData.maxResponseTimeMs);
}
