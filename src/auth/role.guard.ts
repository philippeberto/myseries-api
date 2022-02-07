import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get('role', context.getHandler());
    console.log(role);
    if (!role) return false;
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    console.log(req.user.roles);
    const user = req.user;
    return user.roles.includes(role);
  }
}
