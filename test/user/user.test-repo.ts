import { UserRepository } from '../../src/user/user.repository';

export const userRepo = (): UserRepository => global.userRepository;
