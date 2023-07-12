import { USER } from '../endpoints/user.endpoints';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { buildUserParams, userFactory } from '../user/user.factory';

describe('update user suite case', () => {
  it('should update user successfully', async () => {
    const userParams = buildUserParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: USER,
      variables: {
        email: userParams.email,
        password: userParams.password,
        name: userParams.name,
      },
      fileParam: 'avatar',
      filePath,
      token: user.token,
    });
    expect(res.body).toHaveProperty('avatar');
    expect(res.body.email).toBe(userParams.email.toLowerCase());
    expect(res.body.name).toBe(userParams.name);
  });
});
