import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/authorization/decorators/roles.decorator';
import { UserRoles } from './enums/user-roles.enum';

@Roles(UserRoles.Super)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
