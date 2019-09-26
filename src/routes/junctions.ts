import * as express from 'express';
import { query } from '../db';
import { JunctionObject } from '../model';
import log from '../log';
import { URLSearchParams } from 'url';
const junctionsRoute = express.Router();

junctionsRoute.get('/', async (req, res) => {
  //const result = await query<JunctionObject>('SELECT * FROM junction_info INNER JOIN junction_status_evals08 ON junction_info.id = junction_status_evals08.junction_id');

  log.debug('blah debug');
  const innerJoinResult = await query<{}>(
    'SELECT junction_info.*, junction_status_evals08.*  FROM junction_info  INNER JOIN junction_status_evals08 ON junction_info.id = junction_status_evals08.junction_id;'
  );

  //const innerJoinResult = await query<{}>('SELECT * FROM junction_status_evals08;');

  res.json(innerJoinResult.rows);
});

junctionsRoute.get('/:junctionId', async (req, res) => {
  const innerJoinResult = await query<{}>(
    'select * from junction_info where junction_info.id = ' +
      req.params.junctionId +
      ' and junction_info.id in (select junction_id from junction_status_evals08 where junction_id = ' +
      req.params.junctionId +
      ' ORDER BY timestamp DESC LIMIT 1)'
  );
  log.debug('inner join result ', innerJoinResult.rowCount);
  res.json(innerJoinResult.rows);
});

export default junctionsRoute;
