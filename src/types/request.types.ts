import { Connection } from "./connection.types";

export interface ConnectionRequest {
  _id: string;
  fromUserId: Connection;
  toUserId: string;
  status: "interested" | "ignored" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface ConnectionRequestResponse {
  message: string;
  data: ConnectionRequest[];
}
