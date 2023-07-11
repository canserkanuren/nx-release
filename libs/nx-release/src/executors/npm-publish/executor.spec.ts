import * as child_process from "child_process";

import * as projectHelpers from "../helpers/projects.helpers";

import executor from './executor';

describe('NpmPublish Executor', () => {

  it('should execSync with a default libPath if no libPath was provided', async () => {
    const mockRoot = 'libs/my-domain/foo';
    const context = {
    } as any;

    /* eslint-disable */
    jest.spyOn(child_process, 'execSync').mockImplementation((() => {}) as any);
    /* eslint-disable */
    jest.spyOn(projectHelpers, 'getRoot').mockReturnValue(mockRoot);

    const expectedCommand = `cd ./dist/${mockRoot} && echo '//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}' > .npmrc && npm publish`
    const output = await executor({}, context);

    expect(child_process.execSync).toHaveBeenCalledWith(expectedCommand)
    expect(output.success).toBe(true);
  });
});
