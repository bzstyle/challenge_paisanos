import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function AuthRole(...roles: string[]) {
  return applyDecorators(SetMetadata('roles', roles), ApiBearerAuth());
}
