import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserPublic } from './dto/user';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const usersFake: UserPublic[] = [
    {
      id: '4d7279b8-8d0c-4e41-bd03-306dcd2bb11b',
      name: 'Isaac Newton',
      email: 'isaac-newton@email.com',
      roles: [
        'default-roles-myseries-users',
        'offline_access',
        'uma_authorization',
        'user',
      ],
      createdAt: new Date('2022-02-07T08:01:52.963Z'),
    },
    {
      id: '7e07788a-1e1a-4a03-b290-7383d74ab1ea',
      name: 'Albert Einstein',
      email: 'albert-einstein@email.com',
      roles: [
        'default-roles-myseries-users',
        'offline_access',
        'admin',
        'uma_authorization',
        'user',
      ],
      createdAt: new Date('2022-02-07T07:51:29.264Z'),
    },
  ];

  const userRepositoryFake = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryFake,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be able fetch all users', async () => {
    userRepositoryFake.find = jest.fn(() => Promise.resolve(usersFake));

    const users = await service.findAll();
    expect(service).toBeDefined();
    expect(users).toBe(usersFake);
    expect(users).toHaveLength(2);
    expect(users[0].email).toBe('isaac-newton@email.com');
  });

  it('should be able to create a user', async () => {
    //e008a9cd-80c0-4e36-a80c-27f19c877389
    userRepositoryFake.findOne = jest.fn(() => Promise.resolve());
    userRepositoryFake.save = jest.fn(() => Promise.resolve());
    userRepositoryFake.create = jest.fn(() => Promise.resolve(true));

    const newUser = await service.create(usersFake[0]);
    expect(service).toBeDefined();
    expect(newUser).toBe(true);
  });

  it('should return error "User already exists"', async () => {
    //e008a9cd-80c0-4e36-a80c-27f19c877389
    userRepositoryFake.findOne = jest.fn(() => Promise.resolve(usersFake[0]));

    expect(service).toBeDefined();
    try {
      await service.create(usersFake[0]);
    } catch (err) {
      expect(err.message).toBe('User already exists.');
    }
  });
});
