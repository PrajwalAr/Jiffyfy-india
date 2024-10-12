import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./prisma";

// To-do: fix the below type
type validateRouteHandler = (
  // eslint-disable-next-line no-unused-vars
  req: NextRequest,
  // eslint-disable-next-line no-unused-vars
  userModel: User
) => NextResponse;

export function validateRoute(handler: validateRouteHandler): any {
  return async function GET(request: NextRequest) {
    const token = request.cookies.get("JIFFYFY_ACCESS_TOKEN");

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token.value, "hello") as { id: number };

        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!user) {
          throw new Error("Not a real User");
        }
      } catch (error) {
        NextResponse.json(
          {
            error: "User Not Authorizied",
          },
          {
            status: 401,
          }
        );
      }

      return handler(request, user!);
    }

    NextResponse.json(
      {
        error: "User Not Authorizied",
      },
      {
        status: 401,
      }
    );
  };
}

export function validateToken(token: any): { [key: string]: any } {
  const user = jwt.verify(token, "hello");
  return user as { [key: string]: any };
}
