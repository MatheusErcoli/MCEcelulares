import { NextFunction, Request, Response } from "express";

export type MockRequest = Partial<Request>;

export const mockRequest = (overrides: MockRequest = {}): Request =>
  overrides as Request;

export const mockResponse = (): Response => {
  const res = {} as Partial<Response>;

  res.status = jest.fn().mockReturnValue(res as Response);
  res.json = jest.fn().mockReturnValue(res as Response);
  res.send = jest.fn().mockReturnValue(res as Response);
  res.end = jest.fn().mockReturnValue(res as Response);

  return res as Response;
};

export const mockNext = (): jest.MockedFunction<NextFunction> => jest.fn();
