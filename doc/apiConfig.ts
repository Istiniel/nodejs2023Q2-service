import { OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'api.yaml';

export default () => {
  console.log(join(__dirname, YAML_CONFIG_FILENAME))
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as OpenAPIObject;
};