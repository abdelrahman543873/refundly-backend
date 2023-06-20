import { REGISTER } from '../endpoints/user.endpoints';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { buildUserParams } from '../user/user.factory';

describe('register user suite case', () => {
  it('should register user successfully', async () => {
    const userParams = buildUserParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER,
      variables: {
        email: userParams.email,
        password: userParams.password,
      },
    });
    expect(res.body.email).toBe(userParams.email.toLowerCase());
  });
});
