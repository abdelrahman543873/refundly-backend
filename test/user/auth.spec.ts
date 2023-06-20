import { AUTH } from '../endpoints/user.endpoints';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { buildUserParams, userFactory } from '../user/user.factory';

describe('auth user suite case', () => {
  it('should authenticate user successfully', async () => {
    const userParams = buildUserParams();
    const user = await userFactory(userParams);
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: AUTH,
      variables: {
        email: user.email,
        password: userParams.password,
      },
    });
    expect(res.body.email).toBe(user.email);
    expect(res.body).toHaveProperty('token');
  });
});
