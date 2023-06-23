import 'jest';
import AuthService from './../../../src/services/auth';
import LoggerInstance from '../../../src/loaders/logger';

// import database
const userCredentialModel = require('./../../../src/models/user_credentials');
const userModel = require('./../../../src/models/users');

// Mock the database models
jest.mock('./../../../src/models/user_credentials');
jest.mock('./../../../src/models/users');

describe('Sign Up', () => {
  beforeEach(() => {
    // Reset the mock implementation and clear mock calls
    userCredentialModel.services.findOne.mockReset();
    userCredentialModel.services.create.mockReset();
    userModel.services.create.mockReset();
  });

  it('should sign up a new user when email does not exist', async () => {
    // Mock the database to return no user record (email does not exist)
    userCredentialModel.services.findOne.mockResolvedValue(null);
    userCredentialModel.services.create.mockResolvedValue({});

    // Mock the userModel's create function
    userModel.services.create.mockResolvedValue({});

    // Set up the input data
    const userInputDTO = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@example.com',
      password: 'password123',
    };

    // Call the SignUp function
    const authServiceInstance = new AuthService(userCredentialModel, userModel, LoggerInstance);
    const result = await authServiceInstance.SignUp(userInputDTO);

    expect(result).toHaveProperty('response');
    expect(result).toHaveProperty('response.returncode', '200');
    expect(result).toHaveProperty('response.message', 'Signed up successfully.');
    expect(result).toHaveProperty('response.data');
    expect(result).toHaveProperty('response.data.token');
    expect(result).toHaveProperty('response.data.userid');
  });

  it('should throw an error when user with same email already exists', async () => {
    // Mock the database to return a user record (email already exists)
    userCredentialModel.services.findOne.mockResolvedValue({});

    // Set up the input data
    const userInputDTO = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'existing@example.com',
      password: 'password123',
    };

    // Call the SignUp function and expect it to throw an error
    const authServiceInstance = new AuthService(userCredentialModel, userModel, LoggerInstance);
    await expect(authServiceInstance.SignUp(userInputDTO)).rejects.toThrow('User already exists.');
  });
});

describe('Sign In', () => {
  beforeEach(() => {
    // Reset the mock implementation and clear mock calls
    userCredentialModel.services.findAll.mockReset();
  });

  it('should sign in if user is registered and password is correct.', async () => {
    // Mock the database to return a user
    userCredentialModel.services.findAll.mockResolvedValue([
      {
        userid: 'testid',
        email: 'test@example.com',
        password: '$2b$10$HdW7.vJqAFdyGGLqV8zFhOgupAjgISiFO3F1cGZTMW7KVnZ5C/vf.',
      },
    ]);

    // Set up the input data
    const userInputDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    // Call the Sign function
    const authServiceInstance = new AuthService(userCredentialModel, userModel, LoggerInstance);
    const result = await authServiceInstance.SignIn(userInputDTO.email, userInputDTO.password);

    // Expect the response object
    expect(result).toHaveProperty('response');
    expect(result).toHaveProperty('response.returncode', '200');
    expect(result).toHaveProperty('response.message', 'Signed in successfully.');
    expect(result).toHaveProperty('response.data');
    expect(result).toHaveProperty('response.data.token');
    expect(result).toHaveProperty('response.data.userid');
  });

  it('should throw an error when user is not registered', async () => {
    // Mock the database to return empty list (no user found)
    userCredentialModel.services.findAll.mockResolvedValue([]);

    // Set up the input data
    const userInputDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    // Call the SignIn function and expect it to throw an error
    const authServiceInstance = new AuthService(userCredentialModel, userModel, LoggerInstance);
    await expect(authServiceInstance.SignIn(userInputDTO.email, userInputDTO.password)).rejects.toThrow(
      'User not registered.',
    );
  });

  it('should throw an error when password is incorrect', async () => {
    // Mock the database to return a user with same email
    userCredentialModel.services.findAll.mockResolvedValue([
        {
          userid: 'testid',
          email: 'test@example.com',
          password: '$2b$10$HdW7.vJqAFdyGGLqV8zFhOgupAjgISiFO3F1cGZTMW7KVnZ5C/vf.',
        },
      ]);
  
      // Set up the input data
      const userInputDTO = {
        email: 'test@example.com',
        password: 'password1234',
      };

    // Call the SignIn function and expect it to throw an error
    const authServiceInstance = new AuthService(userCredentialModel, userModel, LoggerInstance);
    await expect(authServiceInstance.SignIn(userInputDTO.email, userInputDTO.password)).rejects.toThrow(
      'Invalid Password.',
    );
  });
});
