/**
 * @jest-environment node
 */
import { GET } from '../[id]/route';
import { POST, GET as GET_ALL } from '../route';
import { Db, MongoClient } from 'mongodb';
import { NextRequest } from 'next/server';

// Mocking mongodb
jest.mock('@/lib/mongodb', () => {
  const mockClient = {
    db: jest.fn(),
    close: jest.fn(),
  };
  return Promise.resolve(mockClient);
});

describe('Users API', () => {
  let client: MongoClient;
  let db: Db;

  beforeAll(async () => {
    client = await require('@/lib/mongodb');
    db = {
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      insertOne: jest.fn(),
      limit: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
    } as unknown as Db;
    (client.db as jest.Mock).mockReturnValue(db);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users/{id}', () => {
    it('should return a user if found', async () => {
      const mockUser = { _id: '60d0fe4f5311236168a109ca', name: 'John Doe', email: 'john.doe@example.com' };
      (db.collection('users').findOne as jest.Mock).mockResolvedValue(mockUser);

      const request = {} as NextRequest;
      const context = { params: { id: '60d0fe4f5311236168a109ca' } };
      const response = await GET(request, context);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual(mockUser);
    });

    it('should return 404 if user not found', async () => {
      (db.collection('users').findOne as jest.Mock).mockResolvedValue(null);

      const request = {} as NextRequest;
      const context = { params: { id: '60d0fe4f5311236168a109cb' } };
      const response = await GET(request, context);
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.error).toBe('User not found');
    });

    it('should return 400 for invalid ID format', async () => {
        const request = {} as NextRequest;
        const context = { params: { id: 'invalid-id' } };
        const response = await GET(request, context);
        const body = await response.json();
  
        expect(response.status).toBe(400);
        expect(body.error).toBe('Invalid user ID format');
      });
  });
});
